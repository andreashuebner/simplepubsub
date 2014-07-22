var sps = sps || {}; //sps = SimplePubSub
sps.arrayEvents={};
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

/**
 * Function to subscribe objects to custom events
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
         throw new Error("spson method expects second parameter to be a function");
    }
    
    
};