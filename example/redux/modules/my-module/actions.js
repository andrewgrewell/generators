import createAction from '../../util/createAction'; //eslint-disable-line
import NAME from './name'; //eslint-disable-line


export const ACTION_ONE = `${NAME}/ACTION_ONE`;
/**
*
* @returns { Object } - redux action
*/
export function actionOne() {
    return createAction(ACTION_ONE, {  });
}


export const ACTION_TWO = `${NAME}/ACTION_TWO`;
/**
*
* @returns { Object } - redux action
*/
export function actionTwo() {
    return createAction(ACTION_TWO, {  });
}


export const ACTION_THREE = `${NAME}/ACTION_THREE`;
/**
*
* @returns { Object } - redux action
*/
export function actionThree() {
    return createAction(ACTION_THREE, {  });
}


/*--GENERATOR INSERT ACTION--*/