import createAction from '../../util/createAction';
import NAME from './name';


export const TEST_ONE = `${NAME}/TEST_ONE`;
/**
* testing one two three
*
* @param one
* @param two
* @returns { Object } - redux action
*/
export function testOne(one, two) {
    return createAction(TEST_ONE, { one, two });
}


export const TEST_TWO = `${NAME}/TEST_TWO`;
/**
* testing
*
* @returns { Object } - redux action
*/
export function testTwo() {
    return createAction(TEST_TWO, {  });
}


/*--GENERATOR INSERT ACTION--*/