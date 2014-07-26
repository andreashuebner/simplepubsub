//constructor function for some tests objects. Only one attribute counter to make it easier to distinguish between the several test objects
function TestObject(id) {
    this.id=id;
}

function appendHtml(div,testToAppend) {
    var existingHtml=document.getElementById(div).innerHTML;
    existingHtml += "<br>" + testToAppend;
    document.getElementById(div).innerHTML = existingHtml;
}

var testObject1;
var testObject2;
var testObject3;
var testObject4;
var testObject5;

//custom assertions
QUnit.assert.divContains = function( div,expectedMessage,expected, message) {
  var currentHtml=document.getElementById(div).innerHTML;
  
  var found=currentHtml.indexOf(expectedMessage);
  if (found > -1) {
    var actual=true;
  } else {
    var actual=false;
  }
  QUnit.push(actual === expected, actual, expected, message);

};
 

QUnit.module("Testing Simple Pub Sub functions", {
  setup: function() {
    testObject1=new TestObject(1);
    testObject2=new TestObject(2);
    testObject3=new TestObject(3);
    testObject4=new TestObject(4);
    testObject5=new TestObject(5);
    document.getElementById("testdiv").innerHTML="";
  },
  teardown: function() {
    delete testObject1;
    delete testObject2;
    delete testObject3;
    delete testObject4;
    delete testObject5;
    sps.arrayEvents=[];
    document.getElementById("testdiv").innerHTML="";
    delete sps;
  }
});




QUnit.test( "Calling spson method without string as first parameter raises error", function() {
     
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
    
   QUnit.test( "Calling spson method on non object raises error", function() {
     
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
    QUnit.test( "Calling spson method without function as second parameter raises error", function() {
     
       throws(
        function() {
            testObject1.spson("testevent1",{});
        },
        function(error) {
            
            return error.message === "spson method expects second parameter to be a callback function";
        }
    );
     
    });
    
    QUnit.test( "After subscribing testObject1 for testEvent1, array of events contains the right object", function() {
        testObject1.spson("testevent1",function() {
          var textToAppend="testevent1 triggered from testobject1";
          appendHtml("testdiv",textToAppend);
        });
        
        var found=0;
        //sps.arrayEvents should contain the following dataset
        /*
        {
            eventRef: testObject1,
            eventName: testevent1,
            eventCallback: function() {console.log("testevent1 triggered for testObject1");}
            
        }
        */
        //Todo: Move logic into custom assertion
        for (var a=0;a<sps.arrayEvents.length;a++) {
            
            var element=sps.arrayEvents[a];
           
            if (element.eventRef.id === 1 && element.eventName === "testevent1" && typeof(element.eventCallback) === "function") {
                found += 1;
            }
        }
        QUnit.equal(found,1, "Expect to find subsribed object in event array");
        
     
      
    });
    
    QUnit.test( "Subscribing one object for the same event with same callback function twice should not result in duplicate dataset in eventarray", function() {
        testObject2.spson("testevent2",function() {
             var textToAppend="testevent2 triggered from testobject2";
             appendHtml("testdiv",textToAppend);
        });
        testObject2.spson("testevent2",function() {
             var textToAppend="testevent2 triggered from testobject2";
             appendHtml("testdiv",textToAppend);
        });
        var found=0;
        //sps.arrayEvents should contain the following dataset
        
        //Todo: Move logic into custom assertion
        for (var a=0;a<sps.arrayEvents.length;a++) {
            var element=sps.arrayEvents[a];
           
            if (element.eventRef.id === 2 && element.eventName === "testevent2" && typeof(element.eventCallback) === "function") {
                found += 1;
            }
        }
        QUnit.equal(found,1, "Expect to find subsribed object only once in event array, even when subscribed twice");
        
     
      
    });
    
     QUnit.test( "Subscribing one object for the same event with different callback functions should result in two different entries", function() {
        testObject3.spson("testevent3",function() {
            var textToAppend="testevent3 triggered from testobject3";
            appendHtml("testdiv",textToAppend);
        });
        testObject3.spson("testevent3",function() {
            var textToAppend="testevent3 triggered from testobject3 second time";
            appendHtml("testdiv",textToAppend);
        });
        var found=0;
      
       
        //Todo: Move logic into custom assertion
        for (var a=0;a<sps.arrayEvents.length;a++) {
            var element=sps.arrayEvents[a];
            
           
            if (element.eventRef.id === 3 && element.eventName === "testevent3" && typeof(element.eventCallback) === "function") {
                found += 1;
            }
        }
        QUnit.equal(found,2, "Expect to find subsribed object twice in event array when subscribed with different callback functions.");
  
    });
    
    QUnit.test( "Calling sps trigger method with string as first parameter results in error thrown", function() {
     
       throws(
        function() {
            sps.trigger({});
        },
        function(error) {
            
            return error.message === "sps trigger expects first argument to be the name of event as string";
        }
    );
     
    });
    
    QUnit.test( "Subsribing testobject1 to testevent1 and testobject1 to testevent2 and triggering testevent1 will only trigger callback\
    function for testevent1", function() {
        testObject1.spson("testevent1",function(eventsource) {
            //console.log("testevent1 triggered from testobject1 with eventobject " + eventsource.name);
            var textToAppend="testevent1 triggered from testobject1 with eventobject " + eventsource.name;
            appendHtml("testdiv",textToAppend);
        });
        testObject1.spson("testevent2",function() {
            console.log("testevent2 triggered from testobject1");
            var textToAppend="testevent1 triggered from testobject1 with eventobject " + eventsource.name;
            
            appendHtml("testdiv",textToAppend);
            
        });
        
        sps.trigger("testevent1",{"name": "testobject1"});
        //console.log("Content test div" + " " + document.getElementById("testdiv").innerHTML);
        //now testdiv should contain the message
         QUnit.assert.divContains("testdiv","testevent1 triggered from testobject1 with eventobject testobject1",true,"testdiv contains message from object1 with testevent1");
         QUnit.assert.divContains("testdiv","testevent1 triggered from testobject1 with eventobject testobject2",false,"testdiv does not contain message from object1 with testevent2");
    
  });  
  
   QUnit.test( "Calling spsoff method without string as first parameter results in error thrown", function() {
     
       throws(
        function() {
             var testObject1=new TestObject(1);
             testObject1.spsoff();
        },
        function(error) {
            
            return error.message === "spsoff method expect as first parameter the name of the custom event to unsubscribe from as a string.";
        }
    );
     
    });
    
    QUnit.test( "Subscribing testobject1 to testevent1 and testobject2 to testevent2 will trigger both functions", function() {
        testObject1.spson("testevent1",function(eventsource) {
          
            var textToAppend="testevent1 triggered from testobject1 with eventobject " + eventsource.name;
            appendHtml("testdiv",textToAppend);
        });
        testObject2.spson("testevent2",function(eventsource) {
            console.log("testevent2 triggered from testobject2");
            var textToAppend="testevent2 triggered from testobject2 with eventobject " + eventsource.name;
            
            appendHtml("testdiv",textToAppend);
            
        });
        
        sps.trigger("testevent1",{"name": "testobject1"});
        sps.trigger("testevent2",{"name": "testobject2"});
        QUnit.assert.divContains("testdiv","testevent1 triggered from testobject1 with eventobject testobject1",true,"testdiv contains message from object1 with testevent1");
        QUnit.assert.divContains("testdiv","testevent2 triggered from testobject2 with eventobject testobject2",true,"testdiv contains message from object2 with testevent2");
        
    
  });  
  
  QUnit.test( "Subscribing testobject1 to testevent1 and testobject2 to testevent2 and then unsubscribing testobject 1 will only trigger testobject2", function() {
        testObject1.spson("testevent1",function(eventsource) {
          
            var textToAppend="testevent1 triggered from testobject1 with eventobject " + eventsource.name;
            appendHtml("testdiv",textToAppend);
        });
        testObject2.spson("testevent2",function(eventsource) {
            console.log("testevent2 triggered from testobject2");
            var textToAppend="testevent2 triggered from testobject2 with eventobject " + eventsource.name;
            
            appendHtml("testdiv",textToAppend);
            
        });
        
        testObject1.spsoff("testevent1");
        
        sps.trigger("testevent1",{"name": "testobject1"});
        sps.trigger("testevent2",{"name": "testobject2"});
        QUnit.assert.divContains("testdiv","testevent1 triggered from testobject1 with eventobject testobject1",false,"testdiv contains message from object1 with testevent1");
        QUnit.assert.divContains("testdiv","testevent2 triggered from testobject2 with eventobject testobject2",true,"testdiv contains message from object2 with testevent2");
        
    
  });  
    
    
    



