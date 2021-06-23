/* eslint-disable prettier/prettier */
import type { State_T } from './state';
import { fetchPeriod } from '@/api';
import { dateToString } from '@/utils/date';
import { MutationTypes } from './mutations';
import type { Mutations_T } from './mutations';
import type { RootState } from '../types';
import { ActionContext } from 'vuex';

export enum ActionTypes {
  FETCH_PERIOD = 'period/fetchPeriod',
}

export const actions = {
  async [ActionTypes.FETCH_PERIOD](context: ActionContext_T) {
    const pervMonth = new Date(new Date().setFullYear(2020, new Date().getMonth() - 1, 1));

    const result: Map<string, number> = new Map(
      (
        await Promise.all([
          fetchPeriod(
            dateToString(
              new Date(
                2 * context.state.selectedPeriod[0].getTime() -
                context.state.selectedPeriod[1].getTime()
              )
            ),
            dateToString(context.state.selectedPeriod[1])
          ),
          fetchPeriod(
            dateToString(pervMonth),
            dateToString(new Date(new Date().setFullYear(2020)))
          ),
        ])
      )
        .reduce((acc: Array<{ date: string; total_count: number }>, cur) => acc.concat(cur), [])
        .map((period: { date: string; total_count: number }) => [period.date, period.total_count])
    );

    context.commit(MutationTypes.ADD_USER_COUNTS, result);
  },
};

export type ActionContext_T = {
  commit<K extends keyof Mutations_T>(
    key: K,
    payload?: Parameters<Mutations_T[K]>[1]
  ): ReturnType<Mutations_T[K]>;
} & Omit<ActionContext<State_T, RootState>, 'commit'>;

export type Actions_T = typeof actions;
