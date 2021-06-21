export const state = {
  firstSelectedDate: new Date(new Date().setFullYear(2020)),
  secondSelectedDate: null,
  firstDate: [],
  secondDate: [],
  firstDateLegends: [],
  secondDateLegends: [],
};

export type DateState_T = typeof state;
