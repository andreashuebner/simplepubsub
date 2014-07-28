<h1>Simple Pub Sub
<h2>Minimalistic JavaScript PubSub Implementation
<h3>Just include the file sps.js (sps for simplepubsub) or sps.min.js and your are ready to go.


Examples to use:

To subsribe an object to an event with a callback function, just use the method exampleobject.spson method:<br>

object1.spson("testevent1",function(evt) {
  //some code here when testevent1 triggered
});

To unsubsribe an object from an event, just call the spsoff method:<br>
object1.spsoff("testevent1");

To trigger an event, just call the sps.trigger function: 

sps.trigger("testevent",{"eventsource": "something here"});

The second parameter (event object) is optional. If provided it will be passed to all subsribed objects when 
calling the provided callback functions as the first parameter.
