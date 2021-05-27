import { Api, Notification } from '../services';

export const TOGGLE_USER_LOADER = 'TOGGLE_USER_LOADER';
export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const UPDATE_USER_SELECTED = 'UPDATE_USER_SELECTED';
export const SELECT_ALL = 'SELECT_ALL';
export const TOGGLE_STATUS_LOADER = 'TOGGLE_STATUS_LOADER';
export const TOGGLE_MAIL_LOADER = 'TOGGLE_MAIL_LOADER';
export const SET_USER_STATUS_FILTER = 'SET_USER_STATUS_FILTER';
export const UPDATE_USER_STATUS_LOCALLY = 'UPDATE_USER_STATUS_LOCALLY';


export const toggleUserLoader = (bool) => ({
  type: TOGGLE_USER_LOADER,
  bool,
});



export const getUsers = (history, testId) => {
  return (dispatch) => {
    const params = {
      role: "Admin",
    }
    if (!testId) testId = 0;
    const url = `/hackathon/user`
    dispatch(toggleUserLoader(true));
    return Api.get(url).params(params).send((response, error) => {
      dispatch(toggleUserLoader(false));
      if(response && response !== '') {
        dispatch(updateUsersList(response.users));
      }
    });
  };
};

export const updateUserStatus = (index, userId, status) => {
  return (dispatch) => {
    const params = {
      role: "Admin",
      status
    }
    const url = `/hackathon/user-status/${userId}`
    dispatch(toggleStatusLoader(true, status));
    return Api.patch(url).params(params).send((response, error) => {
      dispatch(toggleStatusLoader(false, status));
      if(response && response.show && response.show.type === 'success'){
        dispatch(updateStatusLocally(index, status))
      }
    });
  };
};


export const updateStatusLocally = (index, status) => ({
  type: UPDATE_USER_STATUS_LOCALLY,
  index,
  status
});

export const toggleStatusLoader = (bool, status) => ({
  type: TOGGLE_STATUS_LOADER,
  bool,
  status
});

export const setUserStatusFilter = (status) => ({
  type: SET_USER_STATUS_FILTER,
  status
});


export const sendMail = () => {
  return (dispatch, getState) => {
    if(!getState().users.emailList.length){
      return Notification.error("Error", "No user selected!");
    }
    const params = {
      role: "Admin",
      emails: getState().users.emailList
    }
    const url = `/hackathon/send-mail`
    dispatch(toggleMailLoader(true));
    return Api.post(url).params(params).send((response, error) => {
      dispatch(toggleMailLoader(false));
    });
  };
};

export const toggleMailLoader = (bool) => ({
  type: TOGGLE_MAIL_LOADER,
  bool,
});


export const updateUsersList = (users) => ({
  type: UPDATE_USERS_LIST,
  users,
});

export const updateUserSelect = index => ({
  type: UPDATE_USER_SELECTED,
  index,
})

export const selectAll = (bool) => ({
  type: SELECT_ALL,
  bool
});
