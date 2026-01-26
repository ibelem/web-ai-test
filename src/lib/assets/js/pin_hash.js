/**
 * Simple hash function for PIN validation
 * Using a basic hash for client-side validation
 * 
 * Note: This is NOT cryptographically secure, but provides
 * basic obfuscation to prevent casual inspection of PINs
 * 
 * @param {string} str - The string to hash
 * @returns {string} - The hashed string in base36 format
 */
export function hashPin(str) {
  if (!str) return '';
  
  // Normalize input: lowercase and trim
  const normalized = str.toLowerCase().trim();
  
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36);
}

/**
 * Validate a PIN against the list of valid hashed PINs
 * 
 * @param {string} inputPin - The PIN entered by the user
 * @param {string[]} validHashedPins - Array of pre-hashed valid PINs
 * @returns {boolean} - True if the PIN is valid
 */
export function validatePin(inputPin, validHashedPins) {
  if (!inputPin || !validHashedPins || validHashedPins.length === 0) {
    return false;
  }
  
  const hashedInput = hashPin(inputPin);
  return validHashedPins.includes(hashedInput);
}
