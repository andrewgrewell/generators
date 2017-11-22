import { createSelector } from 'reselect';
import { default as name } from './name';


export const getModuleAState = state => state[name];

