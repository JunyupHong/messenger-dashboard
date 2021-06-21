import { DateState_T } from './state';
import cloneDeep from 'lodash/cloneDeep';

export enum MutationTypes {
  CHANGE_FIRST_DATE = 'changeFirstDate',
  CHANGE_SECOND_DATE = 'changeSecondDate',
  CHANGE_FIRST_DATA = 'changeFirstData',
  CHANGE_SECOND_DATA = 'changeSecondData',
  CHANGE_FIRST_DATE_LEGENDS = 'changeFirstDateLegends',
  CHANGE_SECOND_DATE_LEGENDS = 'changeSecondDateLegends',
  TOGGLE_FIRST_DATE_LEGENDS = 'toggleFirstDateLegend',
  TOGGLE_SECOND_DATE_LEGENDS = 'toggleSecondDateLegend',
}

export const mutations = {
  [MutationTypes.CHANGE_FIRST_DATE](state: DateState_T, payload) {
    state.firstSelectedDate = payload;
  },

  [MutationTypes.CHANGE_SECOND_DATE](state: DateState_T, payload) {
    state.secondSelectedDate = payload;
  },

  [MutationTypes.CHANGE_FIRST_DATA](state: DateState_T, payload) {
    state.firstDate = payload.data;
  },

  [MutationTypes.CHANGE_SECOND_DATA](state: DateState_T, payload) {
    state.secondDate = payload.data;
  },

  [MutationTypes.CHANGE_FIRST_DATE_LEGENDS](state: DateState_T, payload) {
    state.firstDateLegends = payload.map((legend, i) => ({
      ...legend,
      active: state.firstDateLegends[i] ? state.firstDateLegends[i].active : true,
    }));
  },

  [MutationTypes.CHANGE_SECOND_DATE_LEGENDS](state: DateState_T, payload) {
    state.secondDateLegends = payload.map((legend, i) => ({
      ...legend,
      active: state.secondDateLegends[i] ? state.secondDateLegends[i].active : true,
    }));
  },

  [MutationTypes.TOGGLE_FIRST_DATE_LEGENDS](state: DateState_T, payload) {
    const newLegend = cloneDeep(state.firstDateLegends);
    const idx = state.firstDateLegends.findIndex(legend => legend.name === payload.legend.name);
    newLegend.splice(idx, 1, { ...payload.legend, active: !state.firstDateLegends[idx].active });
    state.firstDateLegends = newLegend;
  },

  [MutationTypes.TOGGLE_SECOND_DATE_LEGENDS](state: DateState_T, payload) {
    const newLegend = cloneDeep(state.secondDateLegends);
    const idx = state.secondDateLegends.findIndex(legend => legend.name === payload.legend.name);
    newLegend.splice(idx, 1, { ...payload.legend, active: !state.secondDateLegends[idx].active });
    state.secondDateLegends = newLegend;
  },
};

export type Mutations_T = typeof mutations;
