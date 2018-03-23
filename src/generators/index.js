#!/usr/bin/env node
const promptDirectory = require('inquirer-select-directory');

const apiGenerator = require('./api');
const componentGenerator = require('./component');
const constantGenerator = require('./constant');
const screenGenerator = require('./screen');
const enumGenerator = require('./enum');
const modelGenerator = require('./model');
const providerGenerator = require('./provider');
const reduxGenerator = require('./redux');
const testGenerator = require('./test');
const styleGenerator = require('./style');
const utilGenerator = require('./util');


module.exports = (plop) => {
    plop.setPrompt('directory', promptDirectory);
    plop.setGenerator('api', apiGenerator);
    plop.setGenerator('component', componentGenerator);
    plop.setGenerator('screen', screenGenerator);
    plop.setGenerator('constant', constantGenerator);
    plop.setGenerator('enum', enumGenerator);
    plop.setGenerator('model', modelGenerator);
    plop.setGenerator('provider', providerGenerator);
    plop.setGenerator('redux', reduxGenerator);
    plop.setGenerator('test', testGenerator);
    plop.setGenerator('style', styleGenerator);
    plop.setGenerator('util', utilGenerator);
};