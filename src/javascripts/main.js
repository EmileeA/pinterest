import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import '../styles/main.scss';

const init = () => {
  // firebase keys that you're loading in. This is the method to initialize firebase
  firebase.initializeApp(apiKeys.firebaseKeys);
  // console.log('hi', apiKeys.firebaseKeys);
  authData.checkLoginStatus();
};

init();
