/**
 * Pin verification module for non-Intel device access control.
 *
 * Intel devices can run tests freely.
 * AMD, Qualcomm, Nvidia, and Apple devices require a valid pin code.
 * Pin codes are verified using salted SHA-256 hashes.
 * Verified pins are stored in localStorage to persist across sessions.
 * Failed attempts are tracked with a 24-hour lockout after 3 failures.
 */

const STORAGE_KEY_VERIFIED = 'pin_verified_hash';
const STORAGE_KEY_ATTEMPTS = 'pin_failed_attempts';
const STORAGE_KEY_LOCKOUT = 'pin_lockout_until';
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const PIN_SALT = 'webaitest2024pin';

/**
 * Salted SHA-256 hashes of valid pin codes (sorted, no grouping info).
 */
const VALID_PIN_HASHES = [
  '1f971e499b62a627bd4179e70aa4b73bdcd17b9bb0622585784c7b375cd9862e',
  '2d2804889c3a4903ce73ac995c7cae49fe5907962c34f9950c6f1fb65746bd8b',
  '332d0c69f1500829e41279632bd96a5bc5404424e0ee21f2355f7d2e9e374547',
  '4064ccfbd02cf13dc3d1dc46aa42e1776c0aedf0d58f12503259227f90ea293c',
  '45f0262bbc69b46db4a59a5d0803749c395c89abefb3a2e27ed601dbc73d4e2b',
  '471e7a6acbe7ccadb4efb39115e151923eb58f2f6270ca895c205141e2d43974',
  '48d9e7faeb4c7e9f6e0d218eb41f93a2a0782ededa26e10cbcb9812fcc8848b2',
  '5a1acab54859e045ebf3db2c45701fd0e384225919daee58924215caf2cb9848',
  '5eef37eb0479a22f2f057453ae17c2f64f6675f239e943885569d1c9cb43406f',
  '742974ff03018f5be2feedecaa55de3837f0dbfb822e1abdc832454abcef2875',
  '777919488578b56c54dfe807e56fcaeafff4c05e19f2e59635f4ff61ef56faf6',
  '7db06c0d68a4cd546c6e2674dd7b8468f172153bb90d16d46407615b91111d5d',
  '88d59e19943b1c4a4670c03662ae5074ab237252dc9da8c20239a1ae3d19ce47',
  '8b3759d46bbc79968b05b595c8a5e18dc5fc3e9bbb3c00873dbd68ecf7d903bc',
  '9a887a50b1bc15d3d497d93dfb6c51f4340f82d76555ad4b6892b36333e07f3d',
  'a49b960068867746c688c7769caa9708c89b959f1159b75fa3a4d98ee30cd825',
  'aaf0c34f14f9fc89aeba5d557d8fd9e5d183ef622502544368323fe56ad3306b',
  'b9144255e9d15c52af0a75d58e8d693c4e9598aaaaf8c63a2468e2845b1bf61f',
  'bf73d85a42863c592ae7b2e7bdc7f5818f203b3eac8cdbe2e00efb4fc785a9a8',
  'da9830ae1d6ff96198653404e7264ea6f38d329a96926a9f652f379d6ec35472',
  'dc532073c112ec9a0327bc9dc19739475864febfee78c613f6dcfa19c5dfb389',
  'e0542471b74cbda343d3e9641edab4d161dccf349f57d1a1021ac3e1fff64fe2',
  'f87881536d0b53073025731efc517cafa320f5e58b1407bc4941ebd8bce88a88'
];

/**
 * Compute salted SHA-256 hash of a pin code.
 * @param {string} message
 * @returns {Promise<string>} hex-encoded hash
 */
async function sha256(message) {
  const salted = PIN_SALT + message;
  const msgBuffer = new TextEncoder().encode(salted);
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

