import { MutationTree } from 'vuex';
import { PeriodState_T } from './state';

export enum MutationTypes {
  CHANGE_PERIOD = 'changePeriod',
  ADD_USER_COUNTS = 'addUserCounts',
}

export const mutations: MutationTree<PeriodState_T> = {
  [MutationTypes.CHANGE_PERIOD](state: PeriodState_T, payload: Date[]) {
    state.selectedPeriod = payload;
  },
  [MutationTypes.ADD_USER_COUNTS](
    state: PeriodState_T,
    payload: { type: string; userCounts: Map<string, number> }
  ) {
    state.userCounts = new Map([...state.userCounts, ...payload.userCounts]);
  },
};

export type PeriodMutations_T = typeof mutations;
