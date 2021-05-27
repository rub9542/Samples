import { Api } from '../services';
import { sessionService } from 'redux-react-session';

export const TOGGLE_LOGIN_LOADER = 'TOGGLE_LOGIN_LOADER';

export const logIn = (params, history) => {
  return (dispatch) => {
    dispatch(toggleLoginLoader(true));
    return Api.post('/hackathon/register').params(params).send((response, error) => {
      dispatch(toggleLoginLoader(false));
      if(response && response !== '') {
        console.log(response);
        history.push('/instructions')
        sessionService.saveUser(response.user)
      }
    });
  };
};

export const adminLogin = (params, history) => {
  return (dispatch) => {
    dispatch(toggleLoginLoader(true));
    return Api.post('/hackathon/admin-login').params(params).send((response, error) => {
      dispatch(toggleLoginLoader(false));
      if(response && response !== '') {
        console.log(response);
        history.push('/admin/dashboard')
      }
    });
  };
};

export const toggleLoginLoader = (bool) => ({
  type: TOGGLE_LOGIN_LOADER,
  bool,
});
