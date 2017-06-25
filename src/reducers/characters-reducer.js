import { GET_CHARACTERS, GET_SINGLE_CHARACTER, GET_COMICS, SAVE_COMIC, GET_FAVORITES } from '../actions';

const initialState = {
  characters: {},
  character : {},
  comics    : {},
  favorites : {}
}

export default function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, characters: action.payload};
    case GET_SINGLE_CHARACTER:
			return { ...state, character: action.payload };
    case GET_COMICS:
			return { ...state, comics: action.payload };
    case SAVE_COMIC:
			return { ...state, favorites: action.payload };
    case GET_FAVORITES:
			return { ...state, favorites: action.payload };
    default:
      return state;
  }
}
