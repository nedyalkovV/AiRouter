/* jshint esversion: 6 */

var AiRouter = (function(app) {

    'use strict';
    var _routes;

    const validation_messages = {
        path_and_options_requirement: 'Path and Options are required paramethers. (Please see documentation)',
        options_object_requirement: 'Options paramether should be object. (Please see documentation)',
        options_not_match_requestments: 'Options does not match requirements. (Please see documentation)'
    };

    function AiRouter() {
        _routes = [];
    }

    AiRouter.prototype.route = function (path, options) {
        if (!path || !options) {
            throw new Error(validation_messages.path_and_options_requirement);
        }

        if (typeof options !== 'object') {
            throw new Error(validation_messages.options_object_requirement);
        }

        cheackOptions(options);

        _routes.push({
            path:path,

        });

    };

    AiRouter.prototype.go = function (path) {
        window.location.href = path;
    };

    function cheackOptions(options) {
        for(var key in options) {
            if ((key !== 'name') && (key !== 'action') && (key !== 'beforeAction') && (key !== 'afterAction')) {
                throw new Error(validation_messages.options_not_match_requestments);
            }
        }
    }

    return new AiRouter();
}({}));
