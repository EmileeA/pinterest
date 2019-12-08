import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import './boards.scss';
import boardsData from '../../helpers/data/boardsData';
import selectedBoard from '../SingleBoard/singleBoard';
import utilities from '../../helpers/utilities';
import pinsData from '../../helpers/data/pinsData';


const displayPins = (e) => {
  e.preventDefault();
  const boardId = e.target.id;
  selectedBoard.selectedBoard(boardId);
  // console.log(e.target.id);
};

const deleteABoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  pinsData.bothPinAndBoard(e.target.id);
  boardsData.deleteBoard(e.target.id)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      buildBoards(uid);
    })
    .catch((error) => console.error(error));
};


const createNewBoard = (e) => {
  // console.log('createNewBoard');
  e.stopImmediatePropagation();
  $('#exampleModal1').modal('show');
};

const saveNewBoard = () => {
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    img: $('#board-img').val(),
    id: $('#board-id').val(),
    uid,
  };
  boardsData.createNewBoard(newBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((error) => console.error(error));
};

const buildBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardsByUid(uid)
    .then((boards) => {
      let domString = '<h2 class="heading">Boards</h2>';
      domString += '<button type="button" id="create-new-board" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">Create Board</button>';
      domString += '<div id="board-section" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += `<div id="${board.id}" class="card-boards">
        <div class="card-body text-center">
          <h5 class="card-title">${board.name}</h5>
          <p class="card-text"${board.uid}></p>
          <button type="button" id="${board.id}" class="btn btn-danger delete-board">Delete</button>
          <button type="button" id="${board.id}" class="btn btn-primary show-pins">View</button>
        </div>
      </div>`;
      });
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.show-pins', displayPins);
      $('#boards').on('click', '.delete-board', deleteABoard);
      $('#create-new-board').click(createNewBoard);
      $('#save-new-board').click(saveNewBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildBoards };
