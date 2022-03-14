import { GET_RECOM } from "../Actions/types";


const initialState = {

};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RECOM:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state
  }
}