import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (id) => new Promise((resolve, reject) => {
// orderby is a Query on a Firebase request and has to do with whatever is up at firebase.
// When you say order by uid you need to ensure that whatever you're getting has an id property on it

  // axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${id}"`)
  axios.get(`${baseUrl}/boards.json?orderBy="uid"`)
  // axios is
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

export default { getBoards };
