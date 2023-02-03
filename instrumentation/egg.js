'use strict';
module.exports = function (egg, agent, { version, enabled }) {
    if (!enabled) return egg;

    agent.setFramework({ name: 'egg', version, overwrite: true });
    return egg;
};
