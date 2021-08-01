import { Module } from 'vuex';
import { RootState } from '@/store/state';
import { State } from './state';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const Recipe: Module<State, RootState> = {
  state: new State(),
  mutations,
  actions,
  getters,
};
