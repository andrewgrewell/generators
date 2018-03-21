import createAction from '../../util/createAction';
import NAME from './name';


export const ONE = `${NAME}/ONE`;
/**
*
* @returns { Function } - redux action create
*/
export function one() {
    return createAction(ONE, {  });
}


export const TWO = `${NAME}/TWO`;
/**
*
* @returns { Object } - redux action
*/
export function two() {
    return createAction(TWO, {  });
}


export const DO_STUFF = `${NAME}/DO_STUFF`;
/**
*
* @returns { Object } - redux action
*/
export function doStuff() {
    return createAction(DO_STUFF, {  });
}

export const UPDATE_RECIPE = `${NAME}/UPDATE_RECIPE`;
/**
 * update a recipe
 *
 * @param recipe
 * @returns { Function } - redux action creator
 */
export function updateRecipe(recipe) {
    return (dispatch, getState, { fetch }) => {
        // TODO update this to hit the backend
        return dispatch(createAction(successActionType(UPDATE_RECIPE), { recipe }));
    };
}


/*--GENERATOR INSERT ACTION--*/