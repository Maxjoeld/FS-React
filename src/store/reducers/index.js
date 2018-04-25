// import { combineReducers } from 'redux';
import { arrayMove } from 'react-sortable-hoc';
import {
  LOGIN,
  GET_NOTES,
  AUTHENTICATION_ERROR,
  DEAUTH,
  SORT_NOTES,
  SORT_DATA,
  NOTE_IDX,
  SORT_TRUE,
  SORT_FALSE,
  ARRAY_MOVE,
  SET_ID,
} from '../actions';

const initialState = {
  notes: [],
  isAuthenticated: false,
  noteIndex: 0,
  sortedNotes: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case DEAUTH:
      return {
        ...state, notes: [], isAuthenticated: false, noteIndex: 0,
      };
    case SORT_NOTES:
      return { ...state, notes: action.payload };
    case NOTE_IDX:
      return { ...state, noteIndex: action.payload };
    case SORT_FALSE:
      return { ...state, notes: action.payload, sortedNotes: false };
    case SORT_TRUE:
      return { ...state, notes: action.payload, sortedNotes: true };
    case ARRAY_MOVE:
      return { ...state, notes: action.payload };
    case SET_ID:
      return { ...state, authenticated: true, user: action.payload };
    default:
      return state;
  }
};

// const NoteReducer = (s = [], action) => {
//   switch (action.type) {
//     case GET_NOTES:
//       return
//     default:
//       return notes;
//   }
// };

// const rootReducer = combineReducers({
//   AuthReducer,
//   NoteReducer,
// });

export default rootReducer;
