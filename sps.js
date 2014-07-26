var sps = sps || {}; //sps = SimplePubSub
sps.arrayEvents=[];
/*
sps.arrayEvents will contain objects with the following structure: 
{
eventRef: Reference to the subscribed object
eventName: Name of the custom event the object is subscribed to
eventCallback: Callback function to call
}
*/

//helper functions, not part of public API
sps._isString=function(valueToCheck) {

    return (typeof(valueToCheck) === "string");
};
sps._isFunction=function(valueToCheck) {

    return (typeof(valueToCheck) === "function");
};

sps._isObject=function(valueToCheck) {
    var stringify={}.toString.apply(valueToCheck);
    return (stringify === "[object Object]");
};

sps._objectInArray=function(objectToCheck) {
//for debugging
var debug=0;
if (objectToCheck.eventRef.id === 2) {
        debug=1;
     }
    /*
    var objectToPush= {
            eventRef: that,
            eventName: eventName,
            eventCallback: callbackFunction
            
        };
     */
    
     var identicalObjectFound=0;
     
     for (var a=0;a<sps.arrayEvents.length;a++) {
        var objectToCompare=sps.arrayEvents[a];
        
        if (objectToCompare.eventRef === objectToCheck.eventRef && objectToCompare.eventName === objectToCheck.eventName 
            && String(objectToCheck.eventCallback) === String(objectToCompare.eventCallback)) {
            
            identicalObjectFound=1;
        }
        
     }
     if (debug === 1) {
      
     }
     if (identicalObjectFound === 0) {
        return false;
     } else {
        return true;
    }
     
     
    
};

/**
 *Subscribe objects to custom events
 *An object can be substribed to several custom events
 *@example
 *testobject1.spson("testevent1",function(event) {
 *console.log("testevent1 triggered");
 *});
 *@example
 *or use sps (SimplePubSub) object directly
 *sps.spson("testevent2",function(event) {
 *console.log("testevent2 triggered");
 });
 * @param {string} eventName - The name of the custom event that object should be subscribed to
 * @param {function} callbackFunction - Callback function that will be called when sps or any object emits the custom event
 */
Object.prototype.spson=function(eventName,callbackFunction) {
    var that=this;
    if (sps._isString(eventName) === false) {
        throw new Error("spson method expects first parameter to be a string");
    }
    //check that "that" refers to object
    if (sps._isObject(that) === false) {
         throw new Error("spson method needs to be called on object");
    }
    //check that callbackFunction is of type function
     if (sps._isFunction(callbackFunction) === false) {
         throw new Error("spson method expects second parameter to be a callback function");
    }
    
    var objectToPush={};
    var objectToPush= {
            eventRef: that,
            eventName: eventName,
            eventCallback: callbackFunction
            
        };
        //check if object already exists, in this case do nothing
        if (sps._objectInArray(objectToPush) === false) {
         
            sps.arrayEvents.push(
                objectToPush
            );
    }
    
};
/**
*Unsubsribe object from a custom event.
*If an object is subscribed to several custom events, it will only be unsubscribed from the matching custom event
*@example
*testobject1.spsoff("testevent");
*@param {string} eventName - The name of the custom event the object should be unsubsribed from
*/
Object.prototype.spsoff=function(eventName) {
    if (sps._isString(eventName) === false) {
        throw new Error("spsoff method expect as first parameter the name of the custom event to unsubscribe from as a string.");   
    }
    for (var a=0;a<sps.arrayEvents.length;a++) {
        var objectToCheck=sps.arrayEvents[a];
        if (objectToCheck.eventName === eventName) {
            sps.arrayEvents.splice(a, 1);
        }
    }
    
}

/**
*Trigger a custom event.
*Will trigger the callback functions to be called for all objects that are subscribed to this custom event
*Additionally, an event object can be passed that will be passed on as first argument to the callback functions 
*@example
*sps.trigger("testevent1");
*@example
*sps.trigger("testevent2",{"eventsource": "testobject"};
*@param {string} eventName - The name of the custom event to be triggered
*@param {object} [eventObject] - Optional event object that will be passed as first parameter to all callback functions
*/
sps.trigger=function(eventName,eventObject) {
    if (sps._isString(eventName) === false) {
        throw new Error("sps trigger expects first argument to be the name of event as string");   
    }
    for (var a=0;a<sps.arrayEvents.length;a++) {
        var objectToCheck=sps.arrayEvents[a];
        if (objectToCheck.eventName === eventName) {
            if (sps._isObject(eventObject)) {
                objectToCheck.eventCallback.call(objectToCheck.eventRef,eventObject);
            } else {
                objectToCheck.eventCallback.call(objectToCheck.eventRef,{});
            }
        }
    }
    
    
};