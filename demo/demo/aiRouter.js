/* jshint esversion: 6 */

var AiRouter = (function(app) {
    'use strict';

    const validation_messages = {
        path_and_options_requirement: 'AiRouter: Path and Options are required paramethers. (Please see documentation)',
        options_object_requirement: 'AiRouter: Options paramether should be object. (Please see documentation)',
        options_not_match_requestments: 'AiRouter: Options does not match requirements. (Please see documentation)',
        not_roted_paths: 'AiRouter: No Routes Found'
    };

    var _mode = null;
    var _routes;
    var _current_route = null;
    var _not_routed_paths = function() {
        throw new Error(validation_messages.not_roted_paths);
    };



    function AiRouter() {
        _routes = [];
        listener();
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
            beforeAction:options.beforeAction,
            action:options.action,
            afterAction:options.afterAction
        });
    };

    AiRouter.prototype.mode = function (mode) {
        _mode = mode;
    };

    AiRouter.prototype.go = function (path) {
        window.location.href = path;
    };

    function checkForRoute() {
        var current_params = _current_route.split('/');
        var isMatch = false;
        var route = null;

        for (var x = 0; x < _routes.length; x++) {

            var routed_params = _routes[x].path.split('/');

            if (current_params.length === routed_params.length) {
                var isParamsMatch = true;
                for (var i = 0; i < current_params.length; i++) {
                    if (routed_params[i][0] !== ':') {
                        if (routed_params[i] !== current_params[i]) {
                            isParamsMatch = false;
                            break;
                        }
                    }
                }
                if (isParamsMatch) {
                    route = _routes[x];
                    isMatch = true;
                    break;
                }
            }
        }

        if (!isMatch) {
            _not_routed_paths();
        }else{
            exectuteRouteActions(route);
        }
    }

    function exectuteRouteActions(route) {
        route.beforeAction ? route.beforeAction() : {};
        route.action ? route.action('bambi') : {};
        route.afterAction ? route.afterAction() : {};
    }

    function getRoute() {
        var fragment = '';
        if(_mode === 'history') {
            fragment = location.pathname + location.search;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return fragment;
    }

    function listener() {
        var self = {};
        var current = _current_route;
        var fn = function() {
            if(current !== getRoute()) {
                current = getRoute();
                _current_route = getRoute();
                checkForRoute();
            }
        };

        clearInterval(self.interval);
        self.interval = setInterval(fn, 50);

        return current;
    }

    function cheackOptions(options) {
        for(var key in options) {
            if ((key !== 'name') && (key !== 'action') && (key !== 'beforeAction') && (key !== 'afterAction')) {
                throw new Error(validation_messages.options_not_match_requestments);
            }
        }
    }

    return new AiRouter();
}({}));
