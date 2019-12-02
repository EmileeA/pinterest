import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import utilities from '../../helpers/utilities';
import monkeyButBut from './googlelogo.png';

const getCurrentUid = () => firebase.auth().currentUser.uid;

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const coolLoginButton = () => {
  const domString = `<button id="google-auth" class="btn btn-light">
  <img src="${monkeyButBut}"/>
  </button>`;
  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { coolLoginButton, getCurrentUid };
