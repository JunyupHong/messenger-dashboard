import { MutationTree } from 'vuex';
import type { State_T } from './state';

export enum MutationTypes {
  CHANGE_PERIOD = 'period/changePeriod',
  ADD_USER_COUNTS = 'period/addUserCounts',
}

export const mutations: MutationTree<State_T> = {
  [MutationTypes.CHANGE_PERIOD](state, payload: [Date, Date]) {
    state.selectedPeriod = payload;
  },
  [MutationTypes.ADD_USER_COUNTS](state, payload: Map<string, number>) {
    state.userCounts = new Map([...state.userCounts, ...payload]);
  },
};

export type Mutations_T = typeof mutations;
