import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

// reaching into the Dom and looking for an ID called auth and setting it to a variable.
// continued.. so that the element will already be defined and you can use it in the check status function

const homeDiv = $('#home');
// authDiv is our login button
const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      boardsDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      // nobody is logged in; we should not see boards
      boardsDiv.addClass('hide');
      homeDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
