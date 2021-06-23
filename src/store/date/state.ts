import { Legend_T, Server_T } from '@/types/';

export type State_T = {
  firstSelectedDate: Date;
  secondSelectedDate?: Date;
  firstDate: Array<Server_T>;
  secondDate: Array<Server_T>;
  firstDateLegends: Array<Legend_T>;
  secondDateLegends: Array<Legend_T>;
};

export const state: State_T = {
  firstSelectedDate: new Date(new Date().setFullYear(2020)),
  secondSelectedDate: undefined,
  firstDate: [],
  secondDate: [],
  firstDateLegends: [],
  secondDateLegends: [],
};
