import { createSelector } from 'reselect';
import { default as name } from './name';


export const getModuleBState = state => state[name];

