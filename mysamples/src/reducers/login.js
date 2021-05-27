import {
  TOGGLE_LOGIN_LOADER
} from '../actions/login';

const initialState = {
  loginLoader: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_LOADER:
      return {
        ...state,
        loginLoader : action.bool
      };
    default:
      return state;
  }
};

export default reducer;
