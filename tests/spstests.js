//constructor function for some tests objects. Only one attribute counter to make it easier to distinguish between the several test objects
function TestObject(id) {
    this.id=id;
}

var testObject1;
var testObject2;
var testObject3;
var testObject4;
var testObject5;

QUnit.module("Testing Simple Pub Sub subscribe function", {
  setup: function() {
    testObject1=new TestObject(1);
    testObject2=new TestObject(2);
    testObject3=new TestObject(3);
    testObject4=new TestObject(4);
    testObject5=new TestObject(5);
  },
  teardown: function() {
    delete testObject1;
    delete testObject2;
    delete testObject3;
    delete testObject4;
    delete testObject5;
  }
});




test( "Calling spson method without string as first parameter raises error", function() {
     
       throws(
        function() {
            testObject1.spson(1,function(event) {
                console.log("Testevent1 triggered");
            });
        },
        function(error) {
            
            return error.message === "spson method expects first parameter to be a string";
        }
    );
     
    });
    
    test( "Calling spson method on non object raises error", function() {
     
       throws(
        function() {
            [].spson("testevent1",function(event) {
                console.log("Testevent1 triggered");
            });
        },
        function(error) {
            
            return error.message === "spson method needs to be called on object";
        }
    );
     
    });
    test( "Calling spson method without function as second parameter raises error", function() {
     
       throws(
        function() {
            testObject1.spson("testevent1",{});
        },
        function(error) {
            
            return error.message === "spson method expects second parameter to be a function";
        }
    );
     
    });



