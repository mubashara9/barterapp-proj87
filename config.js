import firebase from 'firebase';
require('@firebase/firestore');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCrBY6VAAGtcDuCaNMhsQ6rqqBbk6G0fC0",
    authDomain: "barter-system-7bbc4.firebaseapp.com",
    projectId: "barter-system-7bbc4",
    storageBucket: "barter-system-7bbc4.appspot.com",
    messagingSenderId: "449058638965",
    appId: "1:449058638965:web:ce43542168d459b5c9fc3c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();