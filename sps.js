/**
*@fileOverview SimplePubSub (sps) - Minimalistic implementation of PubSub pattern in JavaScript
*@author Andreas Huebner (andreas.huebner@gmail.com) - http://www.andrashuebner.com 
*@version 1.0.1
*/
/**
*@namespace
*/
var sps = sps || {}; //sps = SimplePubSub
/** @type {sps} */
sps.arrayEvents=[];
/*
sps.arrayEvents will contain objects with the following structure: 
{
eventRef: Reference to the subscribed object
eventName: Name of the custom event the object is subscribed to
eventCallback: Callback function to call
}
*/
/**
*@private
*/
sps._isString=function(valueToCheck) {

    return (typeof(valueToCheck) === "string");
};
/**
*@private
*/
sps._isFunction=function(valueToCheck) {

    return (typeof(valueToCheck) === "function");
};
/**
*@private
*/
sps._isObject=function(valueToCheck) {
    var stringify={}.toString.apply(valueToCheck);
    return (stringify === "[object Object]");
};
/**
*@private
*/
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
*@function
*Subscribe object to custom event
*@example
*someObject.spson("testevent1",function() {console.log("callback function triggered");});
*@param {string} eventName Name of custom event to subscribe to
*@param {function} callbackFunction Callback function to call when event triggered.
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
*@function
*Unsubscribe object from custom event
*@example
*someObject.spsoff("testevent1");
*@param {string} eventName Name of custom event to unsubscribe from
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
*@static
*Triggers custom event
*@param {string} eventName name of custom event to trigger
*@param {object} [eventObject] event object to pass when calling callback functions of objects subscribed to custom event
*@example
*sps.trigger("custom event 1");
*Trigger custom event without passing event object
*@example
*sps.trigger("custom event 2",{"eventSource": "some source"});
*Trigger custom event with event object. This event object will be passed as the first parameter when calling the callback functions of subscribed objects
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