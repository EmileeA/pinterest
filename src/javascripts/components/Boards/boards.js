import $ from 'jquery';
import boardsData from '../../helpers/data/boardsData';
import singleBoard from '../SingleBoard/singleBoard';

import utilities from '../../helpers/utilities';

import './boards.scss';

const addBoardClickEvent = (e) => {
  e.preventDefault();
  singleBoard.showOneBoard(e.target.id);
  console.log(e.target.id);
};

const printAllBoards = (user) => {
  boardsData.getBoards(user.uid)
    .then((bords) => {
      let domString = '<h1>Boards</h1>';
      domString += '<div class="row" id="board-cards">';
      bords.forEach((bord) => {
        domString += `
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">${bord.boardName}</h5>
              <button class="btn btn-primary boardClick" id="${bord.boardId}">View</button>
              </div>
            </div>
          </div>
          `;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('body').on('click', '.boardClick', addBoardClickEvent);
    })
    .catch((error) => console.error(error));
};

export default { printAllBoards, addBoardClickEvent };
