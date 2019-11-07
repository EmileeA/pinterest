import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');
const boardsDiv = $('#boards');
const home = $('#home');

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.addClass('hide');
        logoutButton.addClass('hide');
        boardsDiv.addClass('hide');
        home.addClass('hide');
      })
      .catch((err) => console.error('You are still logged in', err));
  });
};

export default { logoutEvent };
