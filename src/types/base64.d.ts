declare module "Base64" {
  /**
   * Encodes a string in base64.
   * @param input - The string to be encoded.
   * @returns The base64 encoded string.
   * @throws InvalidCharacterError if the input contains characters outside of the Latin1 range.
   */
  export function btoa(input: string): string;

  /**
   * Decodes a base64 encoded string.
   * @param input - The base64 encoded string.
   * @returns The decoded string.
   * @throws InvalidCharacterError if the input is not correctly encoded.
   */
  export function atob(input: string): string;

  /**
   * Error thrown when an invalid character is encountered during encoding or decoding.
   */
  export class InvalidCharacterError extends Error {
    constructor(message: string);
    name: "InvalidCharacterError";
  }
}
