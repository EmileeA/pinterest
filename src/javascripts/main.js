import 'bootstrap';
import firebase from 'firebase';
import auth from './components/Auth/auth';
import home from './components/Home/home';
import apiKeys from './helpers/apiKeys.json';
import pinsData from './helpers/data/pinsData';
import boardsData from './helpers/data/boardsData';
import authData from './helpers/data/authData';
import returnToBoards from './components/Boards/returnBoards';
import '../styles/main.scss';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.coolLoginBtn();
  home.logoutEvent();
  authData.checkUserLoginStatus();
  pinsData.getPinsByBoardId('boardId');
  boardsData.getBoardByBoardId('boardId').then();
  returnToBoards.returnToBoards();
};
init();
