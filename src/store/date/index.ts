import { RootState } from '../';
import { Module } from 'vuex';
import { state, DateState_T } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

const date: Module<DateState_T, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default date;
