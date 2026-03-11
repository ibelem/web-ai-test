/**
 * Pin verification module for non-Intel device access control.
 * 
 * Intel devices can run tests freely.
 * AMD, Qualcomm, Nvidia, and Apple devices require a valid pin code.
 * Pin codes are hashed with SHA-256 for secure comparison.
 * Verified pins are stored in localStorage to persist across sessions.
 * Failed attempts are tracked with a 24-hour lockout after 3 failures.
 */

const STORAGE_KEY_VERIFIED = 'pin_verified_hash';
const STORAGE_KEY_ATTEMPTS = 'pin_failed_attempts';
const STORAGE_KEY_LOCKOUT = 'pin_lockout_until';
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Pre-computed SHA-256 hashes of valid pin codes.
 * Hashes are computed from lowercase trimmed pin strings.
 * Plain-text pins are not stored in source code for security.
 */
const VALID_PIN_HASHES = [
  // @google.com users (can type just their username)
  'e00a055c4059bedbd90a569489e7ef918587a5aa9ddc6a02a29c6ea7b8b0592d',
  '177cfec495f0570a2495498b3558f38868b0e85d8b30d5ce94f6abbbd33ddc31',
  '7362f7558bb7ca0113aa2f9b86aa7cd7ee97219d5c2cd2dc0049cd805eedf995',
  '0bb0881fb00ba75762704a9e8efd2f73db1b86f700b7a87fb19650f5281c5f6f',
  'd7cccb7dccbd880c8ab2131270ee50f35796cbd35bdc235fd62004865a8d824f',
  '5ca42a49b774e02f646ba019079627ef6cc95ab272d8b8f973b7d83931aaa88b',
  'af97205a69ef4e3efbaaccd955410e0663692e103e5f7eaa6e351cebf749910a',
  'b3887531aa198b792cad63b8170b545f53797bbd378330d0383340cfae4ffdae',
  '118ed1ca981aca0531154b7418c26f000ba603bb40be7367b3a267d8a57350d7',
  'afb178cc088578a6a97012281e660d1963d72265799aa55bc1d5e51497ffde67',
  'b2c49dbcd6566dd2c0bb9e4c077cd6b20de9476c44104cd356d3d5dd214255eb',
  'c0306305ae8a282e3b2fb259c5a50b09c5980024feefbf7ac525e14226f9469d',
  '4f36ea7ea6cd3c1f1c4566e0a49c7238d2bc4f5fc107b862cc556e34854f2cbc',
  'd0ddc6c5d3f7a67b0898388d8103dc64c5ae5312453d986479b7affd206326df',
  // @microsoft.com users (can type just their username)
  'db1d015c047f81daed53417b903841709e273055df7946399ed9495c0b807496',
  'f98f905a04a2faf3421441772d35e64b4acd173f1153e79b0ca287b3285fca8c',
  'e6667b4db36e597ef5d9cecd8152f36253cb12da31b9cdef7595417019973704',
  'f30db47329c88a0f080612f289145b9d279cd64fba83bb66917e3539464b746b',
  'ef38b8ccd3cbec7ef248a7229bb37662430e797e41c963fcb94c30c02f30243e',
  // General access codes
  '1620adaf024008e4a67b4815078a9be085d6a835e0141d3f0842c4ac9b92a586',
  'ae2cec177c8f22c91793025bcb5e7d624a9ac68e5a00654e804b17d56e1ffb24',
  '91af9dd71441bbb875b83de7ecf139bd58b954ec8ec617541c9613620916e194',
  '30ceaac7e1faba7a9973eb5bdfe36175320d2598342bfa6b33405d96b285587e'
];

/**
 * Compute SHA-256 hash of a string.
 * @param {string} message
 * @returns {Promise<string>} hex-encoded hash
 */
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Get the list of valid pin hashes.
 * @returns {string[]}
 */
function getValidHashes() {
  return VALID_PIN_HASHES;
}

/**
 * Detect GPU vendor from WebGL renderer string.
 * @returns {'intel' | 'amd' | 'nvidia' | 'qualcomm' | 'apple' | 'unknown'}
 */
export function getGpuVendor() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'unknown';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'unknown';

    const renderer = (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '').toLowerCase();
    const vendor = (gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '').toLowerCase();

    if (renderer.includes('intel') || vendor.includes('intel')) return 'intel';
    if (renderer.includes('amd') || renderer.includes('radeon') || vendor.includes('amd') || vendor.includes('ati')) return 'amd';
    if (renderer.includes('nvidia') || renderer.includes('geforce') || renderer.includes('quadro') || renderer.includes('rtx') || vendor.includes('nvidia')) return 'nvidia';
    if (renderer.includes('qualcomm') || renderer.includes('adreno') || vendor.includes('qualcomm')) return 'qualcomm';
    if (renderer.includes('apple') || vendor.includes('apple')) return 'apple';

    return 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

/**
 * Check if current device requires pin verification.
 * Intel devices are exempt.
 * @returns {boolean}
 */
export function requiresVerification() {
  const vendor = getGpuVendor();
  return vendor !== 'intel';
}

/**
 * Check if the user is currently locked out due to too many failed attempts.
 * @returns {boolean}
 */
export function isLockedOut() {
  try {
    const lockoutUntil = localStorage.getItem(STORAGE_KEY_LOCKOUT);
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil, 10);
      if (Date.now() < lockoutTime) {
        return true;
      } else {
        // Lockout expired, clear it
        localStorage.removeItem(STORAGE_KEY_LOCKOUT);
        localStorage.removeItem(STORAGE_KEY_ATTEMPTS);
        return false;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Get the remaining lockout time in a human-readable format.
 * @returns {string}
 */
export function getLockoutRemainingTime() {
  try {
    const lockoutUntil = localStorage.getItem(STORAGE_KEY_LOCKOUT);
    if (lockoutUntil) {
      const remaining = parseInt(lockoutUntil, 10) - Date.now();
      if (remaining > 0) {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      }
    }
    return '';
  } catch (e) {
    return '';
  }
}

/**
 * Check if pin has already been verified (stored in localStorage).
 * @returns {boolean}
 */
export function isAlreadyVerified() {
  try {
    const storedHash = localStorage.getItem(STORAGE_KEY_VERIFIED);
    return !!storedHash;
  } catch (e) {
    return false;
  }
}

/**
 * Verify a pin code against valid hashes.
 * @param {string} pin - The pin code to verify
 * @returns {Promise<boolean>} true if valid
 */
export async function verifyPin(pin) {
  if (isLockedOut()) return false;

  const inputHash = await sha256(pin.toLowerCase().trim());
  const validHashes = getValidHashes();
  const isValid = validHashes.includes(inputHash);

  if (isValid) {
    // Store verified hash in localStorage
    try {
      localStorage.setItem(STORAGE_KEY_VERIFIED, inputHash);
      // Clear any failed attempts
      localStorage.removeItem(STORAGE_KEY_ATTEMPTS);
      localStorage.removeItem(STORAGE_KEY_LOCKOUT);
    } catch (e) {
      // localStorage might be unavailable
    }
    return true;
  } else {
    // Track failed attempt
    recordFailedAttempt();
    return false;
  }
}

/**
 * Record a failed verification attempt and apply lockout if threshold exceeded.
 */
function recordFailedAttempt() {
  try {
    let attempts = parseInt(localStorage.getItem(STORAGE_KEY_ATTEMPTS) || '0', 10);
    attempts++;
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, attempts.toString());

    if (attempts >= MAX_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      localStorage.setItem(STORAGE_KEY_LOCKOUT, lockoutUntil.toString());
    }
  } catch (e) {
    // localStorage might be unavailable
  }
}

/**
 * Get the number of remaining attempts before lockout.
 * @returns {number}
 */
export function getRemainingAttempts() {
  try {
    const attempts = parseInt(localStorage.getItem(STORAGE_KEY_ATTEMPTS) || '0', 10);
    return Math.max(0, MAX_ATTEMPTS - attempts);
  } catch (e) {
    return MAX_ATTEMPTS;
  }
}

/**
 * Check URL for pin parameter and verify it.
 * @param {URLSearchParams} searchParams
 * @returns {Promise<boolean>}
 */
export async function checkUrlPin(searchParams) {
  const pin = searchParams.get('pin');
  if (pin) {
    return await verifyPin(pin);
  }
  return false;
}

/**
 * Main entry point: determine if user can proceed with tests.
 * Returns true if:
 * - Device is Intel (no verification needed)
 * - Pin was previously verified (in localStorage)
 * - Pin is provided via URL parameter and is valid
 * 
 * @param {URLSearchParams} [searchParams]
 * @returns {Promise<{allowed: boolean, reason: string}>}
 */
export async function canRunTests(searchParams) {
  // Intel devices always allowed
  if (!requiresVerification()) {
    return { allowed: true, reason: 'intel' };
  }

  // Check if locked out
  if (isLockedOut()) {
    return { allowed: false, reason: 'locked_out' };
  }

  // Check if already verified
  if (isAlreadyVerified()) {
    return { allowed: true, reason: 'previously_verified' };
  }

  // Check URL pin parameter
  if (searchParams) {
    const urlVerified = await checkUrlPin(searchParams);
    if (urlVerified) {
      return { allowed: true, reason: 'url_pin' };
    }
  }

  // Need verification
  return { allowed: false, reason: 'needs_verification' };
}
