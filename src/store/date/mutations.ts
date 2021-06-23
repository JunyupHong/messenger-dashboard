import { State_T } from './state';
import cloneDeep from 'lodash/cloneDeep';
import { MutationTree } from 'vuex';
import { Legend_T, Server_T } from '@/types';

export enum MutationTypes {
  CHANGE_FIRST_DATE = 'date/changeFirstDate',
  CHANGE_SECOND_DATE = 'date/changeSecondDate',
  CHANGE_FIRST_DATA = 'date/changeFirstData',
  CHANGE_SECOND_DATA = 'date/changeSecondData',
  CHANGE_FIRST_DATE_LEGENDS = 'date/changeFirstDateLegends',
  CHANGE_SECOND_DATE_LEGENDS = 'date/changeSecondDateLegends',
  TOGGLE_FIRST_DATE_LEGENDS = 'date/toggleFirstDateLegend',
  TOGGLE_SECOND_DATE_LEGENDS = 'date/toggleSecondDateLegend',
}

export const mutations: MutationTree<State_T> = {
  [MutationTypes.CHANGE_FIRST_DATE](state, payload: Date) {
    state.firstSelectedDate = payload;
  },

  [MutationTypes.CHANGE_SECOND_DATE](state, payload: Date | undefined) {
    state.secondSelectedDate = payload;
  },

  [MutationTypes.CHANGE_FIRST_DATA](state, payload: Array<Server_T>) {
    state.firstDate = payload;
  },

  [MutationTypes.CHANGE_SECOND_DATA](state, payload: Array<Server_T>) {
    state.secondDate = payload;
  },

  [MutationTypes.CHANGE_FIRST_DATE_LEGENDS](state, payload: Array<Legend_T>) {
    state.firstDateLegends = payload.map((legend: Legend_T, i: number) => ({
      ...legend,
      active: state.firstDateLegends[i] ? state.firstDateLegends[i].active : true,
    }));
  },

  [MutationTypes.CHANGE_SECOND_DATE_LEGENDS](state, payload: Array<Legend_T>) {
    state.secondDateLegends = payload.map((legend: Legend_T, i: number) => ({
      ...legend,
      active: state.secondDateLegends[i] ? state.secondDateLegends[i].active : true,
    }));
  },

  [MutationTypes.TOGGLE_FIRST_DATE_LEGENDS](state, payload: Legend_T) {
    const newLegend = cloneDeep(state.firstDateLegends);
    const idx = state.firstDateLegends.findIndex(legend => legend.name === payload.name);
    newLegend.splice(idx, 1, { ...payload, active: !state.firstDateLegends[idx].active });
    state.firstDateLegends = newLegend;
  },

  [MutationTypes.TOGGLE_SECOND_DATE_LEGENDS](state, payload: Legend_T) {
    const newLegend = cloneDeep(state.secondDateLegends);
    const idx = state.secondDateLegends.findIndex(legend => legend.name === payload.name);
    newLegend.splice(idx, 1, { ...payload, active: !state.secondDateLegends[idx].active });
    state.secondDateLegends = newLegend;
  },
};

export type Mutations_T = typeof mutations;
