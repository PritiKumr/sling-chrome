function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed){
      chrome.storage.local.set({registered: true});
      chrome.storage.local.set({registrationId: registrationId});
    }
  });
}

function sendRegistrationId(callback) {
  // Send the registration token to your application server
  // in a secure way.
  callback(true);
}


chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
      return;
    // Up to 100 senders are allowed.
    var senderIds = ["1005011976091"];
    chrome.gcm.register(senderIds, registerCallback)
  });
});

chrome.gcm.onMessage.addListener(function (message) {
  var opt = {
    type: "basic",
    title: message.data['gcm.notification.title'], 
    message: message.data['gcm.notification.title'],
    iconUrl: "icons/icon128.png"
  };
  
  chrome.notifications.create(null, opt);
})