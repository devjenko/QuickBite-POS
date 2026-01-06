import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

// Check if key exists and is correct length
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  throw new Error(
    "ENCRYPTION_KEY must be set in .env and be 64 characters (32 bytes in hex)"
  );
}

// Convert hex string to buffer
const KEY = Buffer.from(ENCRYPTION_KEY, "hex");

// IV = Initialization Vector (random starting point for encryption)
// Must be 16 bytes for AES-256-CBC
const IV_LENGTH = 16;

/**
 * Encrypts text using AES-256-CBC
 *
 * @param text - The text to encrypt (like a token or password)
 * @returns Encrypted text in format: "iv:encryptedData" (both in hex)
 *
 * Example:
 *   encrypt("my_secret_token")
 *   → "a1b2c3d4e5f6g7h8:9i0j1k2l3m4n5o6p..."
 */
export function encrypt(text: string): string {
  //  Generate a random IV (different each time for security)
  const iv = crypto.randomBytes(IV_LENGTH);

  //  Create cipher (encryption tool)
  // AES-256-CBC = Advanced Encryption Standard, 256-bit key, Cipher Block Chaining
  const cipher = crypto.createCipheriv("aes-256-cbc", KEY, iv);

  //  Encrypt the text
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  //  Return IV and encrypted data together
  // We need the IV to decrypt later, so we store it with the encrypted data
  // Format: "iv:encryptedData"
  return iv.toString("hex") + ":" + encrypted;
}

/**
 * Decrypts text that was encrypted with the encrypt function
 *
 * @param encryptedText - Text in format "iv:encryptedData"
 * @returns The original plain text
 *
 * Example:
 *   decrypt("a1b2c3d4e5f6g7h8:9i0j1k2l3m4n5o6p...")
 *   → "my_secret_token"
 */
export function decrypt(encryptedText: string): string {
  //  Split the IV and encrypted data
  const parts = encryptedText.split(":");

  if (parts.length !== 2) {
    throw new Error("Invalid encrypted text format");
  }

  const iv = Buffer.from(parts[0], "hex");
  const encrypted = parts[1];

  //  Create decipher (decryption tool)
  const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, iv);

  //  Decrypt the data
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
