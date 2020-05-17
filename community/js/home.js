// Handle signin button in the banner
document.getElementsByClassName('enthuse-banner-signin-google')[0].addEventListener('click', signIn);
// JSON, stores Firebase user properties
var userProps;
// bool, stores whether or not the user is authenicated
var signedIn = false;
// object, contains the Google auth info
var provider = new firebase.auth.GoogleAuthProvider();
// add useful scopes to Oauth 2.0
provider.addScope('profile');
provider.addScope('email');

// check if the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // set the userProps variable to contain the Firebase user properties
    userProps = user;
    // set the signedIn variable to true
    signedIn = true;
    // hide the promotional banner
    document.getElementsByClassName('enthuse-banner-join')[0].style.display = 'none';
    // display the user's name
    document.getElementById('enthuse-signedin').innerText = user.displayName;
    // account for the missing banner by moving content up
    document.getElementsByClassName('enthuse-content')[0].style.top = '2px';
  } else {
    // clear the user properties
    userProps = null;
    // set signedIn to false
    signedIn = false;
    // display the promotional banner
    document.getElementsByClassName('enthuse-banner-join')[0].style.display = 'blog';
    // replace the user's name with "Sign In"
    document.getElementById('enthuse-signedin').innerText = 'Sign In';
  }
});

// Handle signin button in the navbar
document.getElementById('enthuse-signedin').addEventListener('click', function() {
  if (signedIn) {
    signOut();
  } else {
    signIn();
  }
});

// handle signin
function signIn() {
  // authenicate with Google Oauth 2.0
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    // There's no need to set the userProps variable, as it'll already be handled by onAuthStateChanged
    var user = result.user;
    // Display user's name
    document.getElementById('enthuse-signedin').innerText = JSON.parse(result.user);
  }).catch(function(error) {
    alert("Sorry, we're experiencing an issue.  Try again later.");
  });
}

function signOut() {
  firebase.auth().signOut().then(function() {
    window.location.reload();
  });
}

function addWelcomeMessage(message) {

}