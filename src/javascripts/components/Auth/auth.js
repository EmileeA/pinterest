import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import monkeyButBut from './googlelogo.png';
import utilities from '../../helpers/utilities';

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

export default { coolLoginButton };
