#!/usr/bin/env node
require('shelljs/global');
const path = require('path');
const inquirer = require('inquirer');
const cliFormatting = require('../util/cliFormatting');

const masthead = cliFormatting.createMasthead('Generator Selection', 'cyan', 16);
console.log(masthead);

//TODO populate this via FS.readDir
const generators = {
    Redux: {
        entry: path.resolve(__dirname, './redux/index_old.js')
    }
};

inquirer.registerPrompt('directory', require('inquirer-select-directory'));
inquirer.prompt([
    {
        type: 'list',
        name: 'generatorSelection',
        message: 'Select which generator you would like to run. (press ctrl+c to exit)',
        choices: Object.keys(generators)
    }
]).then((res) => {
    try {
        runGenerator(res.generatorSelection);
    }
    catch (err) {
        console.log(cliFormatting.errorMessage('Error:\n' + err));
    }
});

function runGenerator(key) {
    let generator = generators[key];
    require(generator.entry);
}