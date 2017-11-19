require('shelljs/global');

module.exports = () => {
    exec('git add .');
    return 'Added new files to git';
};