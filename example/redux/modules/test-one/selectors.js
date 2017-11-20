import { createSelector } from 'reselect';
import { default as name } from './name';


export const getTestOneState = state => state[name];