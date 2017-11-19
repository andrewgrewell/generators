import { handleActions } from 'redux-actions';

import TestOneState from './TestOneState';
import successActionType from '../../util/successActionType';
import { LOGIN } from './actions';


const initialState = new TestOneState({});


export default handleActions({
    [successActionType(LOGIN)]: (state, { payload }) => {
        let { user, token } = payload;
        return state
            .setUser(user)
            .token(token);
    }
}, initialState);