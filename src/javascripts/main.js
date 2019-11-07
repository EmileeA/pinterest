import firebase from 'firebase';
import 'bootstrap';

import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import navbar from './components/Navbar/navbar';
import home from './components/Home/home';
// import board from './components/boards/boards';

import apiKeys from './helpers/apiKeys.json';

import '../styles/main.scss';

const init = () => {
  // firebase keys that you're loading in. This is the method to initialize firebase
  firebase.initializeApp(apiKeys.firebaseKeys);
  // console.log('hi', apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.coolLoginButton();
  navbar.logoutEvent();
  home.homeMaker();
};

init();
