<h1>Simple Pub Sub
<h2>Minimalistic JavaScript PubSub Implementation
<h3>Just include the file sps.js (sps for simplepubsub) or sps.min.js and your are ready to go.<br><br>


Examples to use:<br>

To subsribe an object to an event with a callback function, just use the method exampleobject.spson method:<br><br>

object1.spson("testevent1",function(evt) {
  //some code here when testevent1 triggered
});
