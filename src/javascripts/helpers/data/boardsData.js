import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  // orderby is a Query on a Firebase request and has to do with whatever is up at firebase.
// When you say order by uid you need to ensure that whatever you're getting has an id property on it
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      // console.log(response);
      const daBoards = response.data;
      const boards = [];
      Object.keys(daBoards).forEach((fbId) => {
        // console.log(daBoards);
        daBoards[fbId].id = fbId;
        boards.push(daBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const getBoardByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`)
    .then((response) => {
      resolve((response.data));
    })
    .catch((error) => reject(error));
});

// axios call to delete a board by Id
const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);
// post axios call to speak to firebase for the create
const createNewBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default {
  getBoardsByUid,
  getBoardByBoardId,
  deleteBoard,
  createNewBoard,
};
