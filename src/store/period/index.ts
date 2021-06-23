import { state } from './state';
import type { State_T } from './state';
import { mutations } from './mutations';
import type { Mutations_T } from './mutations';
import { actions } from './actions';
import type { Actions_T } from './actions';
import { Module } from 'vuex';
import { RootState } from '../types';

export type {
  State_T as PeriodState_T,
  Mutations_T as PeriodMutations_T,
  Actions_T as PeriodActions_T,
};

const period: Module<State_T, RootState> = {
  state,
  mutations,
  actions,
};

export default period;
