import { ADD_FAV, DEL_FAV } from "../Actions/types";


const initialState = {
  fmovies: [],
};


export default function favouriteReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAV:
      const item = action.payload;
      console.log(state.fmovies);

      if (state.fmovies !== undefined) {
        const existingItem = state.fmovies.find((x) => x.id === item.id);

        if (!existingItem) {
          return { ...state, fmovies: [...state.fmovies, item] };
        }

        return {
          ...state,
          fmovies: state.fmovies.map((x) =>
            x.id === item.id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          fmovies: [action.payload],
        };
      }
    case DEL_FAV:
      return {
        ...state,
        fmovies: state.fmovies.filter(
          (x) => x.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
