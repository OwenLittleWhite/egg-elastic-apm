'use strict';
const shimmer = require('elastic-apm-node/lib/instrumentation/shimmer');

module.exports = function(Router, agent, { enabled }) {
    if (!enabled) return Router;
    agent.logger.debug('shimming koa-router prototype.match function');
    shimmer.wrap(Router.prototype, 'match', function(orig) {
        return function(_, method) {
            const matched = orig.apply(this, arguments);

            if (typeof method !== 'string') {
                agent.logger.debug(
                    'unexpected method type in koa-router prototype.match: %s',
                    typeof method
                );
                return matched;
            }

            if (Array.isArray(matched && matched.pathAndMethod)) {
                const layer = matched.pathAndMethod.find(function(layer) {
                    return layer && layer.opts && layer.opts.end === true;
                });

                const path = layer && layer.path;
                if (typeof path === 'string') {
                    const name = method + ' ' + path;
                    agent._instrumentation.setDefaultTransactionName(name);
                } else {
                    agent.logger.debug(
                        'unexpected path type in koa-router prototype.match: %s',
                        typeof path
                    );
                }
            } else {
                agent.logger.debug(
                    'unexpected match result in koa-router prototype.match: %s',
                    typeof matched
                );
            }

            return matched;
        };
    });

    return Router;
};
