var config = {
  apiKey: "AIzaSyB8b0KoIr3kDuZpLmJrH-lk8PGLdn1W_VE",
  authDomain: "sling-3ccb3.firebaseapp.com",
  databaseURL: "https://sling-3ccb3.firebaseio.com",
  projectId: "sling-3ccb3",
  storageBucket: "sling-3ccb3.appspot.com",
  messagingSenderId: "1005011976091"
};
firebase.initializeApp(config);

document.addEventListener("DOMContentLoaded", function(event) {
  var signInButton = document.getElementById("google-signin");
  var currentUserDetails = document.getElementById("current-user");

  firebase.auth().onAuthStateChanged(function(currentUser) {
    signInButton.style.display = "none";
    currentUserDetails.style.display = "none";
    if (currentUser) {
      currentUserDetails.getElementsByClassName('user-name')[0].innerHTML = currentUser.displayName;
      currentUserDetails.getElementsByClassName('user-email')[0].innerHTML = currentUser.email;
      currentUserDetails.style.display = "inline-block";

      updateNotificationTokensForUser(currentUser);

    } else {
      signInButton.style.display = "inline-block";
      signInButton.addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithPopup(provider).catch(function(error) {
          alert(error.message);
          console.log(error);
        });
      });
    }
  });
});

var updateNotificationTokensForUser = function (user) {
  chrome.storage.local.get("registered", function(result) {
    if (!result["registered"])
      return;

    chrome.storage.local.get("notificationToken", function(notificationToken) {
      chrome.instanceID.getID(function (instanceId) {
        firebase
          .database()
          .ref("users/" + user.uid + "/readerDevices/" + instanceId)
          .set(notificationToken);
      })
    });
  });
}