console.log("HELLO WORLD");
console.log('yo');
$("#hello").html('asfdlfj');

var firebaseConfig = {
  apiKey: "AIzaSyAQvk-G3H5PYDXMloKUZF0hvvbdiEDaJLw",
  authDomain: "healthgenie-df312.firebaseapp.com",
  projectId: "healthgenie-df312",
  storageBucket: "healthgenie-df312.appspot.com",
  messagingSenderId: "1037401529111",
  appId: "1:1037401529111:web:1e9033199e88caf2b73552",
  measurementId: "G-QF3Z5HPP5G"
};
firebase.initializeApp(firebaseConfig);
console.log('firebase has been implemented successfully');


// sign up user
function signUp(){
  console.log('signup incoming');
  email = $("#email").val();
  password = $("#password").val();
  firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function(){
      alert('Email Verification has been sent please check your email');
    }).catch(function(error){
      console.error(error);
    });
  })
  .catch(function(error) {
    console.error(error);
  })
}

// sign out user
function signOut(){
  firebase.auth().signOut();
  console.log('User has been signed out');
}

// login user
function loginUser(){
  email = $("#loginemail").val();
  password = $("#loginpw").val();
  firebase.auth().signInWithEmailAndPassword(email,password);
  // if we are able login
  console.log("yay user was able to login here is login email",email);
  // checking if they are verified
  var user = firebase.auth().currentUser;
  if (user.emailVerified) {
    alert("Looks Like you are verified now navigating to the main app");
    // take them to app view
    window.location = "app.html";
  } else {
    alert("Whoops looks like you are not verified you need to be verified to use our application");
    // take them to verify view
    user.sendEmailVerification().then(function() {
      console.log("verification email has been sent");
    }).catch(function(error) {
      console.error(error);
    });
    window.location = "verify-email.html";
  }
}

// within email view to resend or send email verification
function sendVerifyEmail() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    alert("Verification email has been sent");
  }).catch(function(error) {
    console.error(error);
  });
}
