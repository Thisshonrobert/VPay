/**
 * Decode payment token to extract userId, amount, and referenceId
 */
export function decodePaymentToken(token: string): {
  userId: number;
  amount: string;
  refId: number;
} {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error('Failed to decode payment token');
  }
}

/**
 * Encode payment data into a token (for reference)
 */
export function encodePaymentToken(data: {
  userId: number;
  amount: string;
  refId: number;
}): string {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}
