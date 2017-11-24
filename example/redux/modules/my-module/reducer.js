import { handleActions } from 'redux-actions';

import successActionType from '../../util/successActionType'; //eslint-disable-line
import failureActionType from '../../util/failureActionType'; //eslint-disable-line
import MyModuleState from './MyModuleState';
import { ACTION_THREE } from './actions';
/*--GENERATOR INSERT ACTION TYPE--*/


const initialState = new MyModuleState({});


export default handleActions({
/*--GENERATOR INSERT REDUCER--*/
}, initialState);