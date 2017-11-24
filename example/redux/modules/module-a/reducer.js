import { handleActions } from 'redux-actions';

import successActionType from '../../util/successActionType'; //eslint-disable-line
import failureActionType from '../../util/failureActionType'; //eslint-disable-line
import ModuleAState from './ModuleAState';
import { MODULE_B_ACTION_ONE } from '../module-b/actions';
/*--GENERATOR INSERT ACTION TYPE--*/


const initialState = new ModuleAState({});


export default handleActions({
    [successActionType(MODULE_B_ACTION_ONE)]: (state, { payload }) => {
        
    },
/*--GENERATOR INSERT REDUCER--*/
}, initialState);