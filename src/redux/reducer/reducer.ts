import * as actionTypes from "../actions/types";

const initialState = {
  footballGamesContent: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_FOOTBALL_GAMES:
      return {
        ...state,
        footballGamesContent: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
