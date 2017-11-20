import createAction from '../../util/createAction';
import NAME from './name';


export const HEY = `${NAME}/HEY`;
/**
*
* @returns { Object } - redux action
*/
export function hey() {
    return createAction(HEY, {  });
}


/*--GENERATOR INSERT ACTION--*/