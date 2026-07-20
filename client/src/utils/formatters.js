// src/utils/formatters.js
/**
 * Formats a numeric value into a currency string formatted for Indian Rupees (INR).
 * @param {number} n - The numeric amount to format.
 * @returns {string} The formatted currency string, with zero decimal places.
 */
export const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);