/* jshint esversion: 6 */

var expect = chai;

var router = new AiRouter(null);

describe("Basic", function() {

    describe("check action params", function() {
        it("should have a query equal to '/' and params equal to empty object", function() {
            router.route('/',{
                name:"BASIC",
                action:(params, query)=>{
                    chai.expect(params).to.be.empty;
                    chai.expect(query).to.equal('/');
                }
            });
        });
    });

    describe("check beforeAction params", function() {
        it("should have a query equal to '/' and params equal to empty object", function() {
            router.route('/',{
                name:"BASIC",
                beforeAction:(params, query)=>{
                    chai.expect(params).to.be.empty;
                    chai.expect(query).to.equal('/');
                }
            });
        });
    });

    describe("check afterAction params", function() {
        it("should have a query equal to '/' and params equal to empty object", function() {
            router.route('/',{
                name:"BASIC",
                afterAction:(params, query)=>{
                    chai.expect(params).to.be.empty;
                    chai.expect(query).to.equal('/');
                }
            });
        });
    });

    describe("function trigger order", function() {
        var trigger = null;
        it("should trigger beforeAction() first, action() secund and afterAction() third", function() {
            router.route('/',{
                name:"BASIC",
                beforeAction:(params, query)=>{
                    trigger = 'first';
                    chai.expect(trigger).to.equal('first');
                },
                action:(params, query)=>{
                    trigger = 'secund';
                    chai.expect(trigger).to.equal('secund');
                },
                afterAction:(params, query)=>{
                    trigger = 'third';
                    chai.expect(trigger).to.equal('third');
                }
            });
        });
    });
});

describe("Advanced", function() {
    describe("check params and query callbacks", function() {
        it("query shoud be /posts/123/comments/321, params {postId:'123', commentId:'321'}", function() {
            router.route('/posts/:postId/comments/:commentId',{
                name:'ADVANCE',
                beforeAction:(params, query)=>{
                    chai.expect(params.postId).to.equal('123');
                    chai.expect(params.commentId).to.equal('321');
                    chai.expect(query).to.equal('/posts/123/comments/321');
                },
                action:(params, query)=>{
                    chai.expect(params.postId).to.equal('123');
                    chai.expect(params.commentId).to.equal('321');
                    chai.expect(query).to.equal('/posts/123/comments/321');
                },
                afterAction:(params, query)=>{
                    chai.expect(params.postId).to.equal('123');
                    chai.expect(params.commentId).to.equal('321');
                    chai.expect(query).to.equal('/posts/123/comments/321');
                },
            });
        });
    });
});

describe("Redirect method", function() {
    describe("check redirect method", function() {
        it("browser route shoud be /posts/123/comments/321", function() {
            router.go('/tests/#/posts/123/comments/321');
            var route = getCurrentRoute(null);
            chai.expect(route).to.equal('/posts/123/comments/321');
        });
    });
});

describe("notFound routes", function() {
    describe("check notFound routes", function() {
        it("should throw error", function() {
            router.go('/tests/#/projects/A5534/section/B5535');
            window.addEventListener("error", function (e) {
                chai.assert.isNotNull(e, 'Error chatched');
                chai.expect(e.message).to.equal('Uncaught Error: AiRouter: No Routes Found. (Please see documentation)');
           });
        });
    });
    describe("overwrite notFound routes", function() {
        it("Should handle not routed paths", function() {
            router.go('/tests/#/projects/A5534/section/B5535aaa');
            router.notFound({
                beforeAction:()=>{
                    window.addEventListener("error", function (e) {
                        chai.assert.isNull(e, 'No errors presented');
                   });
                },
                action:()=>{
                    window.addEventListener("error", function (e) {
                        chai.assert.isNull(e, 'No errors presented');
                   });
                },
                afterAction:()=>{
                    window.addEventListener("error", function (e) {
                        chai.assert.isNull(e, 'No errors presented');
                   });
                }
            });
        });
    });
});

describe("Group routes", function() {
    describe("group route evecution", function() {
        it("group route should execute before current route", function() {
            router.go('/tests/#/accounts/123456/profile/654321');
            router.group('/accounts/:accountId',{
                action:(params, query)=>{
                    chai.assert.isOk(true, 'execution pass ok');
                }
            });

            router.route('/accounts/:accountId/profile/:profileId',{
                action:(params, query)=>{
                    chai.expect(params.accountId).to.equal('123456');
                    chai.expect(params.profileId).to.equal('654321');
                    chai.expect(query).to.equal('/accounts/123456/profile/654321');
                }
            });

        });
    });
    describe("group route params", function() {
        it("group route params should equal {accountId:'123456'}", function() {
            router.group('/accounts/:accountId',{
                beforeAction:(params, query)=>{
                    chai.expect(params.accountId).to.equal('123456');
                    chai.expect(query).to.equal('/accounts/123456/profile/654321');
                },
                action:(params, query)=>{
                    chai.expect(params.accountId).to.equal('123456');
                    chai.expect(query).to.equal('/accounts/123456/profile/654321');
                },
                afterAction:(params, query)=>{
                    chai.expect(params.accountId).to.equal('123456');
                    chai.expect(query).to.equal('/accounts/123456/profile/654321');
                }
            });
        });
    });
});



function getCurrentRoute(_mode) {
    var fragment = '';
    if(_mode === 'history') {
        fragment = location.pathname + location.search;
    } else {
        var match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
    }
    return fragment;
}
