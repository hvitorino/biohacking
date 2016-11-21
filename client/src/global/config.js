import firebase from 'firebase';
import ReactGA from 'react-ga';
import Airbrake from 'airbrake-js';

const config = {
  apiKey: 'AIzaSyAwFULDzJxhy67MYf5tMTMD3ygQh2pZGks',
  authDomain: 'biohacking-ca69d.firebaseapp.com',
  databaseURL: 'https://biohacking-ca69d.firebaseio.com',
  storageBucket: 'biohacking-ca69d.appspot.com',
  messagingSenderId: '730944460815',
};

const airbrake = new Airbrake({
  projectId: 133132,
  projectKey: '4a68026f35d09256a77ae10fd065bab2',
});

window.airbrake = airbrake;
window.firebase = firebase;
window.ReactGA = ReactGA;

window.firebase.initializeApp(config);
window.ReactGA.initialize('UA-87321481-1');
