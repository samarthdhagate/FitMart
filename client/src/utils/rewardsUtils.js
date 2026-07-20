/**
 * Tiers configuration for rewards system.
 * @type {Array<{name: string, min: number}>}
 */
export const REWARD_TIERS = [
  { name: "Bronze", min: 0 },
  { name: "Silver", min: 500 },
  { name: "Gold", min: 1500 },
  { name: "Platinum", min: 3000 },
];

/**
 * Determines the current reward tier and the next milestone tier based on user points.
 * @param {number} [points=0] - The user's total rewards points.
 * @returns {{currentTier: {name: string, min: number}, nextTier: {name: string, min: number}|null}} An object containing the current and next tiers.
 */
export const getRewardTier = (points = 0) => {
  let currentTier = REWARD_TIERS[0];
  let nextTier = null;

  for (let i = 0; i < REWARD_TIERS.length; i++) {
    if (points >= REWARD_TIERS[i].min) {
      currentTier = REWARD_TIERS[i];
      nextTier = REWARD_TIERS[i + 1] || null;
    }
  }

  return {
    currentTier,
    nextTier,
  };
};

/**
 * Calculates the progress percentage and points remaining until the next reward tier.
 * @param {number} [points=0] - The user's total rewards points.
 * @returns {{progress: number, pointsToNextTier: number, label: string}} Progress statistics and a display label.
 */
export const getTierProgress = (points = 0) => {
  const { currentTier, nextTier } = getRewardTier(points);

  if (!nextTier) {
    return {
      progress: 100,
      pointsToNextTier: 0,
      label: "You are at the highest tier",
    };
  }

  const currentMin = currentTier.min;
  const nextMin = nextTier.min;
  const progress = ((points - currentMin) / (nextMin - currentMin)) * 100;
  const pointsToNextTier = nextMin - points;

  return {
    progress: Math.min(Math.max(progress, 0), 100),
    pointsToNextTier,
    label: `${pointsToNextTier} points to ${nextTier.name}`,
  };
};

/**
 * Formats a raw timestamp or date string into a relative human-readable format.
 * @param {string|Date|number} dateValue - The date value to evaluate.
 * @returns {string} Relative string such as "Today", "Yesterday", or "N days ago".
 */
export const formatRelativeDate = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  const today = new Date();

  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

/**
 * Resolves a descriptive title/label for a rewards ledger transaction.
 * @param {object} transaction - The transaction object from the ledger.
 * @returns {string} The formatted transaction name.
 */
export const getTransactionLabel = (transaction) => {
  const type = transaction?.sourceType || transaction?.type || "reward";

  if (type === "purchase") return "Purchase reward";
  if (type === "workout") return "Workout reward";
  if (type === "milestone") return "Milestone reward";

  return transaction?.description || "FitRewards points";
};

/**
 * Resolves a representative emoji icon for a rewards ledger transaction type.
 * @param {object} transaction - The transaction object from the ledger.
 * @returns {string} An emoji string representing the transaction source.
 */
export const getTransactionIcon = (transaction) => {
  const type = transaction?.sourceType || transaction?.type || "reward";

  if (type === "purchase") return "🛍️";
  if (type === "workout") return "🏋️";
  if (type === "milestone") return "🏆";

  return "⭐";
};