AiRouter.route('/',{
    name:"home"
});

$(document).ready(()=>{
    $('#eval').click(function() {
        var routerSTring = $('#route').val();
        eval(routerSTring);
        AiRouter.go('/demo/#/projects');
    });
});
