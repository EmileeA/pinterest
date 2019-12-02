import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import monkeyButBut from './googlelogo.png';
import utilities from '../../helpers/utilities';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const coolLoginBtn = () => {
  const domString = `<button id="google-auth"> <img id="g-btn "src=${monkeyButBut} /></button>`;
  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { coolLoginBtn, getCurrentUid };
