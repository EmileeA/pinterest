import $ from 'jquery';
import boardsData from '../../helpers/data/boardsData';
import singleBoard from '../SingleBoard/singleBoard';

import utilities from '../../helpers/utilities';
import './board.scss';

const addBoardClickEvent = (e) => {
  e.preventDefault();
  singleBoard.showOneBoard(e.target.id);
};

// <img src="..." class="card-img-top" alt="...">

const printAllBoards = (user) => {
  boardsData.getMyBoards(user.uid)
    .then((bords) => {
      let domString = '<h1>Boards</h1>';
      domString += '<div class="row" id="board-cards">';
      bords.forEach((bord) => {
        domString += `
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title">${bord.boardName}</h5>
              <button class="btn btn-primary" id="view-board">View</button>
              </div>
            </div>
          </div>
          `;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('body').on('click', '.myBoard', addBoardClickEvent);
    })
    .catch((error) => console.error(error));
};

export default { printAllBoards };
