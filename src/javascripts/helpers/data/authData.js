import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

// reaching into the Dom and looking for an ID called auth and setting it to a variable.
// continued.. so that the element will already be defined and you can use it in the check status function

import boards from '../../components/Board/board';
import home from '../../components/Home/home';

const homeDiv = $('#home');
// authDiv is our login button
const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in; we should not see auth component
      boardsDiv.removeClass('d-none');
      homeDiv.addClass('d-none');
      logoutNavbar.removeClass('d-none');
      authDiv.addClass('d-none');
      boards.printAllBoards(user.uid);
      home.printPinterest();
      boards.printAllBoards(user.uid);
    } else {
      // nobody is logged in; we should not see boards
      boardsDiv.addClass('d-none');
      homeDiv.removeClass('d-none');
      logoutNavbar.addClass('d-none');
      authDiv.removeClass('d-none');
    }
  });
};

export default { checkLoginStatus };
