const getPaths = require('./getPaths');

// TODO make this configurable via package.json
module.exports = {
    base: getPaths().src,
    redux: `/redux/modules`,
    components: `/components`,
    container: `/app`,
    models: `/models`,
    constants: `/constants`,
    styles: `/styles`,
    enums: `/enums`,
    api: `/api`,
    util: `/util`,
    providers: `/providers`,
};