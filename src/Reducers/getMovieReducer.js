import { GET_MOVIE } from "../Actions/types";


const initialState = {

};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      }
    default:
      return state
  }
}