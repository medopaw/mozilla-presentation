// First, obtain a telephony object.
var telephony = navigator.mozTelephony;
// Check if the speaker is enabled or phone is muted.
concole.log(telephony.speakerEnabled, telephony.muted);
// Then, we dial out.
var outgoing = telephony.dial(myPhoneNumber);
// Event handlers for the call.
outgoing.onconnected = function(event) {
  /* Do something when the callee picks up the call. */
};
outgoing.ondisconnected = function(event) {
  /* Do something when the call finishes. */
};


// Receive an incoming call.
telephony.onincoming = function onincoming(event) {
  var incoming = event.call;
  if (incoming.number == myBlockedNumber) {
    // Hang up
    incoming.hangUp();
    return;
  }
  // Answer the call.
  incoming.answer();
};
