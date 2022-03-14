import { GET_MOVIES } from "../Actions/types";


const initialState = {

};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state
  }
}