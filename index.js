'use strict';
const apmConfig = require('../../config/apmConfig.json');
if (apmConfig.serverUrl) {
    const apm = require('elastic-apm-node').start(apmConfig);

    apm.addPatch('egg', require.resolve('./instrumentation/egg'));
    apm.addPatch(
        '@eggjs/router',
        require.resolve('./instrumentation/egg-router')
    );
}
