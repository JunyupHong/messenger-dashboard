import { Store, CommitOptions, DispatchOptions } from 'vuex';
import type { PeriodState_T, PeriodMutations_T, PeriodActions_T } from './period/';
import type { DateState_T, DateMutations_T, DateActions_T } from './date/';

export type RootState = {
  date: DateState_T;
  period: PeriodState_T;
};

type MergedMutations_T = PeriodMutations_T & DateMutations_T;
type MergedActions_T = PeriodActions_T & DateActions_T;

type TotalMutations = {
  commit<K extends keyof MergedMutations_T, P extends Parameters<MergedMutations_T[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<MergedMutations_T[K]>;
};

type TotalActions = {
  dispatch<K extends keyof MergedActions_T>(
    key: K,
    payload?: Parameters<MergedActions_T[K]>[1],
    options?: DispatchOptions
  ): ReturnType<MergedActions_T[K]>;
};

export type TotalStore = Omit<Store<RootState>, 'commit' | 'dispatch' | 'getters'> &
  TotalMutations &
  TotalActions;
