/**
 * Normalizes product object keys by consolidating `productId` and `id` keys.
 * This guarantees consistency when handling database records and client-side models.
 * @param {object} p - The product object to normalize.
 * @returns {object} The normalized product object with synchronized `id` and `productId` fields.
 */
export const normalizeProduct = (p) => {
  const normalizedId = p.productId ?? p.id;

  return {
    ...p,
    id: normalizedId,
    productId: normalizedId,
  };
};
