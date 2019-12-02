import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/Boards/boards';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutBtn = $('#logout');
const titleDiv = $('#title');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should not see auth component
      authDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutBtn.removeClass('hide');
      titleDiv.addClass('hide');
      boards.buildBoards(user.uid);
    } else {
      //  nobody logged in SHOW auth component
      authDiv.removeClass('hide');
      titleDiv.removeClass('hide');
      logoutBtn.addClass('hide');
      boardsDiv.addClass('hide');
    }
  });
};

export default { checkUserLoginStatus };
