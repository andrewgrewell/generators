import createAction from '../../util/createAction';
import NAME from './name';


export const LOGIN = `${NAME}/LOGIN`;
/**
* Login a user
*
* @param username
* @param password
* @returns { { user, token } }
*/
export function login(username, password) {
    return (dispatch, getState, { fetch }) => {
        return fetch({
            url: '',
            actionType: LOGIN
        });
    };
}


/*--(DO NOT REMOVE)generate action here(DO NOT REMOVE)--*/