//constructor function for some tests objects. Only one attribute counter to make it easier to distinguish between the several test objects
function TestObject(id) {
    this.id=id;
}

var testObject1;
var testObject2;
var testObject3;
var testObject4;
var testObject5;

QUnit.module( "Testing Simple Pub Sub subscribe function", {
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


