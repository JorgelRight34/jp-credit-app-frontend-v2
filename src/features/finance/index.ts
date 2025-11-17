// -----------------------------
// Routes
// -----------------------------
export * from "./routes";

// -----------------------------
// Components
// -----------------------------
export { default as FinanceChart } from "./components/FinanceChart";
export { default as FinanceGroupedTable } from "./components/FinanceGroupedTable";
export { default as FinanceQuerySearch } from "./components/FinanceQuerySearch";
export { default as FinanceResultGroupTable } from "./components/FinanceResultGroupTable";
export { default as FinanceStatCard } from "./components/FinanceStatCard";
export { default as Test } from "./components/Test";

// Components → Expenses
export { default as ExpensesDataTable } from "./components/Expenses/ExpensesDataTable";
export { default as ExpensesSection } from "./components/Expenses/ExpensesSection";

// Components → Incomes
export { default as IncomesDataTable } from "./components/Incomes/IncomesDataTable";
export { default as IncomesSection } from "./components/Incomes/IncomesSection";

// Components → Projections
export { default as ProjectionsDataTable } from "./components/Projections/ProjectionsDataTable";
export { default as ProjectionSection } from "./components/Projections/ProjectionSection";
export { default as ProjectionsGroupedDataTable } from "./components/Projections/ProjectionsGroupedDataTable";

// -----------------------------
// Hooks (all named exports)
// -----------------------------
export * from "./hooks/useFinancePeriodNavigator";
export * from "./hooks/useFinancePeriods";
export * from "./hooks/useFinancesSection";
export * from "./hooks/useFinancialReport";
export * from "./hooks/useGroupedFinancialBreakdown";
export * from "./hooks/useGroupedProjections";
export * from "./hooks/useIncomesReport";
export * from "./hooks/useProjectedIncomes";
export * from "./hooks/useProjectedIncomesByPeriod";

// -----------------------------
// Layouts (all components → default)
// -----------------------------
export { default as FinanceChartLayout } from "./layouts/FinanceSectionLayout/FinanceChartLayout";
export { default as FinancePrincipalLayout } from "./layouts/FinanceSectionLayout/FinancePrincipalLayout";
export { default as FinanceSecondaryLayout } from "./layouts/FinanceSectionLayout/FinanceSecondaryLayout";
export { default as FinanceSectionLayout } from "./layouts/FinanceSectionLayout/FinanceSectionLayout";

// -----------------------------
// Lib
// -----------------------------
export * from "./lib/constants";
export * from "./lib/lib";

// -----------------------------
// Models
// -----------------------------
export * from "./models/financeQuery";
export * from "./models/financeReport";
export * from "./models/financeReportDataTableProps";
export * from "./models/financialBreakdown";
export * from "./models/financialComponentType";
export * from "./models/period";
export * from "./models/projection";

// -----------------------------s
// Services
// -----------------------------
export * from "./services/financeClient";
