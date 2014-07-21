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

/**
 * Function to subscribe objects to custom events
 *An object can be substribed to several custom events
 *@example
 *testobject1.spson("testevent1",function(event) {
 *console.log("testevent1 triggered");
 *}
 * @param {string} eventName - The name of the custom event that object should be subscribed to
 * @param {function} callbackFunction - Callback function that will be called when sps or any object emits the custom event
 */

Object.prototype.spson(eventName,callbackFunction) {
    
};