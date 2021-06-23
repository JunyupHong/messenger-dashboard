import { State_T } from './state';
import { fetchDate } from '@/api';
import { dateToString } from '@/utils/date';
import { Commit, ActionContext } from 'vuex';
import { Mutations_T, MutationTypes } from './mutations';
import { RootState } from '../types';

export enum ActionTypes {
  FETCH_FIRST_DATE = 'date/fetchFirstDate',
  FETCH_SECOND_DATE = 'date/fetchSecondDate',
}

export const actions = {
  async [ActionTypes.FETCH_FIRST_DATE](context: ActionContext_T) {
    const result = await fetchDate(dateToString(context.state.firstSelectedDate));
    context.commit(MutationTypes.CHANGE_FIRST_DATA, result);
  },

  async [ActionTypes.FETCH_SECOND_DATE](context: ActionContext_T) {
    if (!context.state.secondSelectedDate) return;

    const result = await fetchDate(dateToString(context.state.secondSelectedDate));
    context.commit(MutationTypes.CHANGE_SECOND_DATA, result);
  },
};

export type ActionContext_T = {
  commit<K extends keyof Mutations_T>(
    key: K,
    payload?: Parameters<Mutations_T[K]>[1]
  ): ReturnType<Mutations_T[K]>;
} & Omit<ActionContext<State_T, RootState>, 'commit'>;

export type Actions_T = typeof actions;
