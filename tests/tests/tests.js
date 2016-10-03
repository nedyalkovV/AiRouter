/* jshint esversion: 6 */

var expect = chai.expect;

var router = new AiRouter();

describe("Basic", function() {
    describe("check action params", function() {
        it("should have a query equal to '/' and params equal to empty object", function() {
            router.route('/',{
                name:"BASIC",
                action:(params, query)=>{
                    expect(params).to.be.empty;
                    expect(query).to.equal('/');
                }
            });
        });
    });
    describe("check beforeAction params", function() {
        it("should have a query equal to '/' and params equal to empty object", function() {
            router.route('/',{
                name:"BASIC",
                beforeAction:(params, query)=>{
                    expect(params).to.be.empty;
                    expect(query).to.equal('/');
                }
            });
        });
    });
    describe("check afterAction params", function() {
        it("should have a query equal to '/' and params equal to empty object", function() {
            router.route('/',{
                name:"BASIC",
                afterAction:(params, query)=>{
                    expect(params).to.be.empty;
                    expect(query).to.equal('/');
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
                    expect(trigger).to.equal('first');
                },
                action:(params, query)=>{
                    trigger = 'secund';
                    expect(trigger).to.equal('secund');
                },
                afterAction:(params, query)=>{
                    trigger = 'third';
                    expect(trigger).to.equal('third');
                }
            });
        });
    });
});

describe("Redirect method", function() {
    describe("check redirect method", function() {
        it("browser route shoud be /posts/123/comments/321", function() {
            router.go('/tests/#/posts/123/comments/321');
            var route = getCurrentRoute(null);
            expect(route).to.equal('/posts/123/comments/321');
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
