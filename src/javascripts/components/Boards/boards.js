import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import './boards.scss';
import boardsData from '../../helpers/data/boardsData';
import selectedBoard from '../SingleBoard/singleBoard';
import utilities from '../../helpers/utilities';


const displayPins = (e) => {
  e.preventDefault();
  const boardId = e.target.id;
  selectedBoard.selectedBoard(boardId);
  // console.log(e.target.id);
};

const buildBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardsData.getBoardsByUid(uid)
    .then((boards) => {
      let domString = '<h2 class="heading">Boards</h2>';
      domString += '<div id="board-section" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += `<div id="${board.id}" class="card-boards">
        <div class="card-body text-center">
          <h5 class="card-title">${board.name}</h5>
          <p class="card-text"${board.uid}></p>
          <button type="button" id="${board.id}" class="btn btn-primary show-pins">Pins</button>
        </div>
      </div>`;
      });
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.show-pins', displayPins);
    })
    .catch((error) => console.error(error));
};

export default { buildBoards };
