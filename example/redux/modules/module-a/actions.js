import createAction from '../../util/createAction';
import NAME from './name';


export const ONE = `${NAME}/ONE`;
/**
*
* @returns { Object } - redux action
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


/*--GENERATOR INSERT ACTION--*/