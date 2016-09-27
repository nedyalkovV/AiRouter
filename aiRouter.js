/* jshint esversion: 6 */

var AiRouter = (function(app) {

    'use strict';
    var _routes;
    var curent_route = decodeURI(location.pathname + location.search);

    const validation_messages = {
        path_and_options_requirement: 'Path and Options are required paramethers. (Please see documentation)',
        options_object_requirement: 'Options paramether should be object. (Please see documentation)',
        options_not_match_requestments: 'Options does not match requirements. (Please see documentation)'
    };

    function AiRouter() {
        _routes = [];
        // window.on('hashchange', function() {
        //   console.log(1);
        // });
        window.addEventListener("hashchange", function() {
            curent_route = decodeURI(location.pathname + location.search);
        });
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

    function cheackOptions(options) {
        for(var key in options) {
            if ((key !== 'name') && (key !== 'action') && (key !== 'beforeAction') && (key !== 'afterAction')) {
                throw new Error(validation_messages.options_not_match_requestments);
            }
        }
    }

    return new AiRouter();
}({}));


AiRouter.route('/app/handlers',{
    name:'tets'
});
