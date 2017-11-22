
const getBasePath = require('./getBasePath');

const basePath = getBasePath();
module.exports = {
    base: basePath,
    redux: `/redux/modules`,
    components: `/components`,
    container: `/app`,
    models: `/models`,
    constants: `/constants`,
    theme: `/theme`,
    enums: `/enums`,
    api: `/api`,
    util: `/utils`,
    providers: `/providers`,
};