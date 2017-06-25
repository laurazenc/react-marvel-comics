import { getCharactersRequest, getCharacterInfoRequest, getCharacterComicsRequest, getComicRequest, loadState, saveState } from '../services';
// import {GET_CHARACTERS} from '../constants';

export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_SINGLE_CHARACTER = 'GET_SINGLE_CHARACTER';
export const GET_COMICS = 'GET_COMICS';
export const SAVE_COMIC = 'SAVE_COMIC';
export const GET_FAVORITES = 'GET_FAVORITES';

export function getCharacters(offset = 0, name = '') {
  let characters;

  return (dispatch) => {
    getCharactersRequest(offset, name)
    .then((data) => {
      characters = data.data.results;
      dispatch({
        type: GET_CHARACTERS,
        payload: characters
      });
    }, (error) => {

      dispatch({
        type: GET_CHARACTERS,
        payload: error
      });
    });
  };
}

export function getSingleCharacter(id) {
  let character;

	return (dispatch) => {
    return new Promise((resolve) => {
      getCharacterInfoRequest(id)
      .then((data) => {
        character = data.data.results[0];

        dispatch({
          type: GET_SINGLE_CHARACTER,
          payload: character
        });
        resolve();
      });

    });
	};
}

export function getComics(id) {
  let comics;

  return (dispatch) => {
    getCharacterComicsRequest(id)
    .then((data) => {
      comics = data.data.results;

      dispatch({
        type: GET_COMICS,
        payload: comics
      });

    });
  };
}


export function saveComic(comic) {
  let favorites = loadState();
  return (dispatch) => {
    return new Promise((resolve) => {
      favorites.push(comic.id);
      saveState(favorites);

      dispatch({
        type: SAVE_COMIC,
        payload: favorites
      });

      resolve();

    });
  };
}

export function getComic(id) {
  let comic;
  return () => {
    return new Promise((resolve) => {
      getComicRequest(id)
      .then((data) => {
        comic = data.data.results[0];
        resolve(comic);
      });

    });
  }
}

export function getFavorites() {
  let favorites = loadState();
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: GET_FAVORITES,
        payload: favorites
      });

      resolve();
    });
  };
}
