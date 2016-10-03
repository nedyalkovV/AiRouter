var router = new AiRouter();

router.route('/',{
    name:'HOME',
    action:function(params, query) {
        document.getElementById("switch").innerHTML = "Changed to Home page!";
        console.log('Home Page');
    },
});

router.route('/projects/:projectId/tests/:testId',{
    name:'HOME',
    action:function(params, query) {
        document.getElementById("switch").innerHTML = "Changed to Projects page!";
        console.log(params);
        console.log(query);
    },
});

router.route('/posts/:postId/comments/:commentId',{
    name:'HOME',
    beforeAction:function(params, query) {
        console.log('This function trigger before Action');
        console.log(params);
        console.log(query);
    },
    action:function(params, query) {
        document.getElementById("switch").innerHTML = "Changed to Blog page!";
        console.log('This function trigger Action');
        console.log(params);
        console.log(query);
    },
    afterAction:function(params, query) {
        console.log('This function triggers after Action');
        console.log(params);
        console.log(query);
    }
});

router.notFound({
    action:function() {
        document.getElementById("switch").innerHTML = "No Route Found page!";
        console.log('No Route Found page');
    }
});

function go1() {
    router.go('/demo/#/');
}

function go2() {
    router.go('/demo/#/projects/123/tests/321');
}

function go3() {
    router.go('/demo/#/posts/123/comments/A2516BC');
}

function go4() {
    var things = ['Rock', 'Paper', 'Scissor'];
    var thing = things[Math.floor(Math.random()*things.length)];
    router.go('/demo/#/'+thing);
}
