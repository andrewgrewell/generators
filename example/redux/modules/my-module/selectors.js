import { createSelector } from 'reselect';
import { default as name } from './name';


export const getMyModuleState = state => state[name];

