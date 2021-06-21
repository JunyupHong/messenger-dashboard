import { PeriodState_T } from './state';

export enum MutationTypes {
  CHANGE_PERIOD = 'changePeriod',
  CHANGE_USER_COUNTS = 'changeUserCounts',
  ADD_USER_COUNTS = 'addUserCounts',
}

export const mutations = {
  [MutationTypes.CHANGE_PERIOD](state: PeriodState_T, payload) {
    state.selectedPeriod = payload;
  },
  [MutationTypes.CHANGE_USER_COUNTS](state: PeriodState_T, payload) {
    state.userCounts = payload.userCounts;
  },
  [MutationTypes.ADD_USER_COUNTS](state: PeriodState_T, payload) {
    state.userCounts = new Map([...state.userCounts, ...payload.userCounts]);
  },
};
