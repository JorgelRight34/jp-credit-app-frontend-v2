export const CollateralConditionMap = {
    HIGH_QUALITY: "highQuality",
    LOW_QUALITY: "lowQuality",
    STABLE: "stable",
    DEPRECIATING: "depreciating",
    LIQUID: "liquid",
    ILLIQUID: "illiquid",
    LOW_RISK: "lowRisk",
    HIGH_RISK: "highRisk",
    EASILY_RECOVERABLE: "easilyRecoverable",
    VOLATILE: "volatile",
    SECURE: "secure",
    UNDERVALUED: "undervalued",
    OVERVALUED: "overvalued",
    APPRECIATING: "appreciating",
    DIVERSIFIED: "diversified",
    CONCENTRATED: "concentrated",
} as const

export type CollateralCondition = typeof CollateralConditionMap[keyof typeof CollateralConditionMap]