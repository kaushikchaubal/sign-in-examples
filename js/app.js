// *******************************************
// ********* GOOGLE SIGN-IN METHODS **********
// *******************************************
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
	document.getElementById('google-status').innerHTML = "Welcome " + profile.getName();
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		document.getElementById('google-status').innerHTML = 'Logged out successfully';
	});
}

// *******************************************
// ******* FACEBOOK SIGN-IN METHODS **********
// *******************************************
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);

	if (response.status === 'connected') {
	  signIn();
	} else if (response.status === 'not_authorized') {
	  document.getElementById('facebook-status').innerHTML = 'Please log into this app';
	} else {
	  document.getElementById('facebook-status').innerHTML = 'Please log into Facebook';
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.onload = function() {
	FB.init({
		appId      : '286260761740359',
		xfbml      : true,
		version    : 'v2.7'
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

function signIn() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		document.getElementById('facebook-status').innerHTML = "Welcome " + response.name;
	});
}