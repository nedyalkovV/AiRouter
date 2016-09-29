// AiRouter.mode('history');

AiRouter.route('/projects/:projectId/settings/:cardId',{
    name:'Login page',
    action:function(sad) {
        console.log(sad);
    },
    afterAction:function() {
        console.log(1);
    }
});
