import { getCharactersRequest } from '../utils';
// import {GET_CHARACTERS} from '../constants';

export const GET_CHARACTERS = 'GET_CHARACTERS';

export function getCharacters(character = null) {
  let characters;

  return (dispatch) => {
    getCharactersRequest(character)
    .then((data) => {
      // this.setState({data: data.data.results});
      characters = data.data.results;
      dispatch({
        type: GET_CHARACTERS,
        payload: characters
      });

    });
  };
}
