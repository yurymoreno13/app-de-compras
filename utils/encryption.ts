import CryptoJS from 'crypto-js';
import { AES_SECRET_KEY } from '../constants';

/**
 * Encrypts a password using AES-256-CBC encryption.
 * Matches the backend AES256Util.java implementation:
 * - Key: secret key as UTF-8 bytes
 * - IV: first 16 bytes of the key
 * - Output: Base64 encoded
 */
export function encryptPassword(password: string): string {
  if (!AES_SECRET_KEY) {
    throw new Error('AES_SECRET_KEY is not configured');
  }

  const key = CryptoJS.enc.Utf8.parse(AES_SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(AES_SECRET_KEY.substring(0, 16));

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}