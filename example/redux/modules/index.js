/* Export the state modules for the Store to import */
import MyModuleReduxModule from './my-module/index';
/*--GENERATOR INSERT MODULE IMPORT--*/


export { default as persistence } from './persistence';
const reduxModules = {
    MyModuleReduxModule,
/*--GENERATOR INSERT MODULE--*/
};


export default reduxModules;