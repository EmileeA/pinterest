import $ from 'jquery';
import pinsData from '../../helpers/data/pinsData';
// import boardData from '../../helpers/data/boardsData';

import './singleBoard.scss';
import utilities from '../../helpers/utilities';

const backToBoards = (e) => {
  e.preventDefault();
  $('#boards').removeClass('d-none');
  $('#single-board').addClass('d-none');
};

const showOneBoard = (boardId) => {
  pinsData.getMyPins(boardId)
    .then((pins) => {
      let domString = '<div class="row justify-content-between"><h1>Pins</h1>';
      domString += '<button class="btn btn-success" id="all-boards">Back to Boards</button></div>';
      domString += '<div class="row">';
      pins.forEach((pin) => {
        domString += `
        <div class="card col-4">
          <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.pinName}">
          <div class="card-body">
            <h5 class="card-title">${pin.pinName}</h5>
          </div>
        </div>
      `;
      });
      domString += '</div>';
      utilities.printToDom('single-board', domString);
      $('#single-board').on('click', '#all-boards', backToBoards);
      $('#boards').addClass('d-none');
      $('#single-board').removeClass('d-none');
    })
    .catch((error) => console.error(error));
};

export default { showOneBoard };
