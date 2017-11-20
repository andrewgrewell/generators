import { handleActions } from 'redux-actions';

import successActionType from '../../util/successActionType';
import failureActionType from '../../util/failureActionType';
import TestOneState from './TestOneState';
import { HEY } from './actions';
/*--GENERATOR INSERT ACTION TYPE--*/

const initialState = new TestOneState({});


export default handleActions({
    [HEY]: (state, { payload }) => {
        return state;
    },
/*--GENERATOR INSERT REDUCER--*/
}, initialState);