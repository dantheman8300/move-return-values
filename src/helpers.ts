import { BcsReader } from "@mysten/bcs";

/**
 * Converts a base64 encoded string to a bigint using BCS read64
 * @param base64String The base64 encoded string to convert
 * @returns The decoded bigint
 */
export function base64ToNumber(base64String: string): string {
  const binaryString = atob(base64String)
  const uint8Array = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i)
  }
  const reader = new BcsReader(uint8Array)
  return reader.read64()
}