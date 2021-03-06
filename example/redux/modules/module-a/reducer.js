import { handleActions } from 'redux-actions';

import successActionType from '../../util/successActionType'; //eslint-disable-line
import failureActionType from '../../util/failureActionType'; //eslint-disable-line
import ModuleAState from './ModuleAState';
import { ONE, TWO, DO_STUFF } from './actions';
import {
    MODULE_B_ACTION_ONE,
    MODULE_B_ACTION_TWO
} from '../module-b/actions';
/*--GENERATOR INSERT ACTION TYPE--*/


const initialState = new ModuleAState({});


export default handleActions({
    [ONE]: (state, { payload }) => {

    },
    [TWO]: (state, { payload }) => {

    },
    [MODULE_B_ACTION_ONE]: (state, { payload }) => {

    },
    [MODULE_B_ACTION_TWO]: (state, { payload }) => {

    },
    [DO_STUFF]: (state) => {
        return state.setStuff(true);
    },
    [successActionType(ONE)]: (state) => {
        return state;
    },
/*--GENERATOR INSERT REDUCER--*/
}, initialState);