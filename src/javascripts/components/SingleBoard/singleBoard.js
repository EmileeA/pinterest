// singleBoard is essentially my pin compenent that holds my pin functionality
import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';
import pinsData from '../../helpers/data/pinsData';
import boardsData from '../../helpers/data/boardsData';
import utilities from '../../helpers/utilities';
import './singleBoard.scss';

// here's my object
const updatedPin = (e) => {
  e.stopImmediatePropagation();
  const pinId = e.target.id;
  const { uid } = firebase.auth().currentUser;
  const updateAPin = {
    name: $('#pin-name').val(),
    boardId: $('.board-title')[0].id,
    url: $('#url').val(),
    imgUrl: $('#pin-image-url').val(),
    uid,
  };
  // calling my axios call
  pinsData.updatedPinToBoard(pinId, updateAPin);
};

const populateUpdateModal = (id) => {
  pinsData.getPinById(id)
    .then((response) => {
      $('#edit-pin-name').val(response.name);
      $('.board-title').val(response.id);
      $('.edit-pin-board').val(response.boardId);
      $('#edit-pin-image').val(response.imgUrl);
    })
    .catch((error) => console.error(error));
};

const buildUpdateModal = (e) => {
  console.log('buildUpdateModal running...');
  // we are separting edit- from the id by using split.
  // // emilee you need to use the correct id's below on populateUpdateModal
  const pinId = e.target.id.split('edit-')[1];
  const domString = `<div class="modal fade" id="switchBoardModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Switch Board</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="switch-board-div"></div>
        <div class="form-group">
          <label for="edit-pin-name">Name</label>
          <input type="text" class="form-control" id="edit-pin-name" placeholder="Enter Pin Name">
        </div>
        <div class="form-group">
          <label for="edit-pin-board">Board</label>
          <input type="text" class="form-control" id="edit-pin-board" placeholder="Enter board">
        </div>
        <div class="form-group">
          <label for="edit-pin-image">Image URL</label>
          <input type="text" class="form-control" id="edit-pin-image" placeholder="Enter Image URL">
        </div>
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id=${pinId}>Save changes</button>
        </div>
      </div>
    </div>
    </div>`;
  utilities.printToDom('updateModal', domString);
  $('#switchBoardModal').modal('show');
  // updatedPin will get the pinId event
  $(`#${pinId}`).click(updatedPin);
  populateUpdateModal(pinId);
};

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newPin = {
    name: $('#pin-name').val(),
    boardId: $('.board-title')[0].id,
    url: $('#url').val(),
    imgUrl: $('#pin-image-url').val(),
    uid,
  };
  pinsData.addNewPin(newPin)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      selectedBoard('boardId');
    })
    .catch((error) => console.error(error));
};

const deletePins = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  // the attr method gets the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
  const pinId = $(e.target).attr('id');
  pinsData.deleteAPin(pinId)
    .then(() => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const selectedBoardId = $(e.target).attr('boardInfo');
      // eslint-disable-next-line no-use-before-define
      selectedBoard(selectedBoardId);
    })
    .catch((error) => console.error(error));
};

const selectedBoard = (boardId) => {
  boardsData.getBoardByBoardId(boardId)
    .then((board) => {
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          // console.log('pins', pins);
          let domString = '<div id="singles" class="d-flex flex-wrap justify-content-between container">';
          domString += `<p class="board-title">${board.name}</p>`;
          pins.forEach((pin) => {
            domString += `<div class="singles-div">
            <div class="card-body text-center">
              <h5 class="card-title">${pin.name}</h5>
              <img src="${pin.imgUrl}" class="card-img-top" alt="...">
              <button type="button" class="btn btn-danger delete" boardInfo="${pin.boardId}" id=${pin.id}>Delete</button>
              <button type="button" class="btn btn-danger edit" id=edit-${pin.id}>Edit</button>
              <p class="card-text"></p>
            </div>
          </div>`;
          });
          utilities.printToDom('boards', '');
          utilities.printToDom('single', domString);
          $('#singles').on('click', '.edit', buildUpdateModal);
        });
    });
  let domString = '<button type="button"  class="btn btn-success retBtn">Back</button>';
  domString += '<button type="button"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add</button>';
  utilities.printToDom('boards2', domString);
  $('body').on('click', '.delete', (e) => deletePins(e));
  $('#add-new-pin').click(addNewPin);
  // listening on this div (switchBoardModal) for a click on the class button "edit" that will run my function buildUpdateModal.
};

export default { selectedBoard };
