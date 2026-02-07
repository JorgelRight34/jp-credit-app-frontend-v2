export const CollateralStatusMap = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    UNDER_REVIEW: "underReview",
    ACTIVE: "active",
    INACTIVE: "inactive",
    SEIZED: "seized",
    RELEASED: "released",
    DEFAULTED: "defaulted",
    EXPIRED: "expired",
    ON_HOLD: "onHold",
    USED_FOR_SETTLEMENT: "usedForSettlement",
} as const

export type CollateralStatus = typeof CollateralStatusMap[keyof typeof CollateralStatusMap]