export enum Compound {
  Annually = "annually",
  SemiAnnually = "semiAnnually",
  Quarterly = "quarterly",
  Monthly = "monthly",
  SemiMonthly = "semiMonthly",
  Biweekly = "biweekly",
  Weekly = "weekly",
  Daily = "daily",
}

export const FrequencyToCompound: Record<number, Compound> = {
  1: Compound.Annually,
  2: Compound.SemiAnnually,
  4: Compound.Quarterly,
  12: Compound.Monthly,
  24: Compound.SemiMonthly,
  26: Compound.Biweekly,
  52: Compound.Weekly,
  365: Compound.Daily,
};