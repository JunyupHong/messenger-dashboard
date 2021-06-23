export type State_T = {
  selectedPeriod: [Date, Date];
  userCounts: Map<string, number>;
};

export const state: State_T = {
  selectedPeriod: [
    new Date(new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate() - 3)),
    new Date(new Date().setFullYear(2020)),
  ],
  userCounts: new Map<string, number>(),
};
