/* jshint esversion: 6 */

var AiRouter = (function(app) {
    'use strict';

    const validation_messages = {
        path_and_options_requirement: 'AiRouter: Path and Options are required paramethers. (Please see documentation)',
        prefix_and_options_requirement:'AiRouter: Prefix and Options are required paramethers. (Please see documentation)',
        option_requierment:'AiRouter: Options is required. (Please see documentation)',
        options_object_requirement: 'AiRouter: Options paramether must be Object. (Please see documentation)',
        options_not_match_requestments: 'AiRouter: Options does not match requirements. (Please see documentation)',
        not_roted_paths: 'AiRouter: No Routes Found. (Please see documentation)',
        path_or_prefix_requirement:'AiRouter: Path and Prefix must be Sting. (Please see documentation)'
    };

    var _mode = null;
    var _routes;
    var _current_route = null;
    var _not_routed_paths = {
        action:()=>{
            throw new Error(validation_messages.not_roted_paths);
        }
    };
    var _groups;
    var _current_params;

    function AiRouter(mode) {
        if (mode) {
            _mode = mode;
        }
        _routes = [];
        _groups = [];
        listener();
    }

    AiRouter.prototype.route = function (path, options) {
        //VALIDATIONS
        if (!path || !options) {
            throw new Error(validation_messages.path_and_options_requirement);
        }
        checkPrefixOrPath(path);
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

    AiRouter.prototype.notFound = function (options) {
        cheackOptions(options);
        _not_routed_paths = options;
    };

    AiRouter.prototype.group = function (prefix, options) {
        //VALIDATIONS
        if (!prefix || !options) {
            throw new Error(validation_messages.prefix_and_options_requirement);
        }
        checkPrefixOrPath(prefix);
        cheackOptions(options);

        _groups.push({
            prefix:prefix,
            beforeAction:options.beforeAction,
            action:options.action,
            afterAction:options.afterAction
        });
    };

    //CHECKERS
    function checkForRoute() {
        var isMatch = false;
        var route = null;

        var current_params = _current_route.split('/');

        for (var x = 0; x < _routes.length; x++) {

            var routed_params = _routes[x].path.split('/');

            if (current_params.length === routed_params.length) {
                var isParamsMatch = true;
                for (var i = 0; i < current_params.length; i++) {
                    if (routed_params[i][0] !== ':') {
                        if (routed_params[i] !== current_params[i].toLowerCase()) {
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
            executeNoRoutedPath();
        }else{
            checkForGoupRoutes(route);
            exectuteRouteActions(route);
        }
    }

    function checkForGoupRoutes(route) {
        var roted_path = route.path;
        var group = null;
        for (var i = 0; i < _groups.length; i++) {
            if (_groups[i].prefix.length<=roted_path.length) {
                var temp = roted_path.slice(0,_groups[i].prefix.length);
                if (temp === _groups[i].prefix) {
                    group = _groups[i];
                    break;
                }
            }
        }
        if (group) {
            executeGroupActions(group);
        }
    }

    //EXECUTORS
    function exectuteRouteActions(route) {
        var params = parseParams(route.path);
        var query = getRoute();
        route.beforeAction ? route.beforeAction(params, query) : {};
        route.action ? route.action(params, query) : {};
        route.afterAction ? route.afterAction(params, query) : {};
    }

    function executeGroupActions(group) {
        var params = parseParams(group.prefix);
        var query = getRoute();
        group.beforeAction ? group.beforeAction(params, query) : {};
        group.action ? group.action(params, query) : {};
        group.afterAction ? group.afterAction(params, query) : {};
    }

    function executeNoRoutedPath() {
        _not_routed_paths.beforeAction ? _not_routed_paths.beforeAction() : {};
        _not_routed_paths.action ? _not_routed_paths.action() : {};
        _not_routed_paths.afterAction ? _not_routed_paths.afterAction() : {};
    }

    //PARSERS
    function parseParams(route) {
        var roted_path = route.split('/');
        var params = {};
        var temp = [];
        for (var i = 0; i < roted_path.length; i++) {
            if (roted_path[i][0]===':') {
                temp.push({
                    index:i,
                    name:roted_path[i].slice(1,roted_path[i].length)
                });
            }
        }
        for (var z = 0; z < temp.length; z++) {
            params[temp[z].name] = getRoute().split('/')[temp[z].index];
        }
        return params;
    }

    //BROWSER PATH PARAMS FINDER
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

    //LISTENER
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

    //VALIDATION METHODS
    function cheackOptions(options) {
        if (typeof options !== 'object') {
            throw new Error(validation_messages.options_object_requirement);
        }
        for(var key in options) {
            if ((key !== 'name') && (key !== 'action') && (key !== 'beforeAction') && (key !== 'afterAction')) {
                throw new Error(validation_messages.options_not_match_requestments);
            }
        }
    }

    function checkPrefixOrPath(param) {
        if (typeof(param) !== 'string') {
            throw new Error(validation_messages.path_or_prefix_requirement);
        }
    }

    return AiRouter;
}({}));
