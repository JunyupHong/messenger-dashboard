import { RootState } from '../types';
import { Module } from 'vuex';
import { state } from './state';
import type { State_T } from './state';
import { mutations } from './mutations';
import type { Mutations_T } from './mutations';
import { actions } from './actions';
import type { Actions_T } from './actions';

export type { State_T as DateState_T, Mutations_T as DateMutations_T, Actions_T as DateActions_T };

const date: Module<State_T, RootState> = {
  state,
  mutations,
  actions,
};

export default date;
