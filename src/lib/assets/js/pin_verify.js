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
 * Generated from the allowed usernames.
 */
const VALID_PIN_HASHES = [];

/**
 * Initialize valid pin hashes at module load time.
 */
const VALID_PINS = [
  // @google.com users (can type just their username)
  'reillyg', 'tomac', 'kainino', 'scheib', 'nattestad', 'phillis',
  'asully', 'lyjiang', 'chintanparikh', 'dbogadi', 'kenjibaheux',
  'robko', 'ericde', 'etiennenoel',
  // @microsoft.com users (can type just their username)
  'rafeal.cintron', 'dwayner', 'guschmue', 'aditya.rastogi', 'ygu',
  // General access codes
  'intel-wpe', 'intel-ov', 'intel-p2ca', 'webmachinelearning-webnn'
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
 * Pre-compute and cache all valid pin hashes.
 * @returns {Promise<string[]>}
 */
async function getValidHashes() {
  if (VALID_PIN_HASHES.length === 0) {
    for (const pin of VALID_PINS) {
      const hash = await sha256(pin.toLowerCase().trim());
      VALID_PIN_HASHES.push(hash);
    }
  }
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
    if (renderer.includes('apple') || renderer.includes('m1') || renderer.includes('m2') || renderer.includes('m3') || renderer.includes('m4') || vendor.includes('apple')) return 'apple';

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
  const validHashes = await getValidHashes();
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
