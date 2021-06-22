import { MutationTree } from 'vuex';
import { State_T } from './state';

export enum MutationTypes {
  CHANGE_PERIOD = 'changePeriod',
  ADD_USER_COUNTS = 'addUserCounts',
}

export const mutations: MutationTree<State_T> = {
  [MutationTypes.CHANGE_PERIOD](state, payload: [Date, Date]) {
    state.selectedPeriod = payload;
  },
  [MutationTypes.ADD_USER_COUNTS](
    state,
    payload: { type: string; userCounts: Map<string, number> }
  ) {
    state.userCounts = new Map([...state.userCounts, ...payload.userCounts]);
  },
};

export type Mutations_T = typeof mutations;
