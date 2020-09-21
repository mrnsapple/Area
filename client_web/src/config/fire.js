import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBy5cNaH5PZEvk140ZZV_BFBLUcp3pgLsw",
    authDomain: "my-dash-f0fd3.firebaseapp.com",
    databaseURL: "https://my-dash-f0fd3.firebaseio.com",
    projectId: "my-dash-f0fd3",
    storageBucket: "my-dash-f0fd3.appspot.com",
    messagingSenderId: "622486939834",
    appId: "1:622486939834:web:c2aa8ea9e7db8dd9593a83",
    measurementId: "G-RPQ5HT79CQ"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;