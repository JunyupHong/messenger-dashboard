export const state = {
  selectedPeriod: [
    new Date(new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate() - 3)),
    new Date(new Date().setFullYear(2020)),
  ],
  userCounts: new Map(),
};

export type PeriodState_T = typeof state;
