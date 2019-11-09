import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

// const authDiv = $('#auth');
const logoutNavbar = $('#navbar-button-logout');
// const boardsDiv = $('#boards');
// const home = $('#home');

const logoutEvent = () => {
  logoutNavbar.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        // authDiv.addClass('hide');
        // logoutButton.addClass('hide');
        // boardsDiv.addClass('hide');
        // home.removeClass('hide');
      })
      .catch((err) => console.error('Hey You! You are still logged in', err));
  });
};

export default { logoutEvent };
