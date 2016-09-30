// AiRouter.mode('history');

AiRouter.route('/projects/:projectId/settings/:cardId',{
    name:'Login page',
    action:function(params, query) {
        console.log(params.projectId);
        console.log(query);
    },
});

AiRouter.route('/projects1/:samkaID/settings/:cardId',{
    name:'Login page',
    action:function(params, query) {
        console.log(params.samkaID);
        console.log(query);
    },
});

AiRouter.group({
    prefix:'/projects'
});
