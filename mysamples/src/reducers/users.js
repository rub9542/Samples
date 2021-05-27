import {
  TOGGLE_USER_LOADER,
  UPDATE_USERS_LIST,
  UPDATE_USER_SELECTED,
  SELECT_ALL,
  TOGGLE_STATUS_LOADER,
  SET_USER_STATUS_FILTER,
  UPDATE_USER_STATUS_LOCALLY,
  TOGGLE_MAIL_LOADER
} from '../actions/users';

const initialState = {
  userLoader: false,
  users: [],
  emailList: [],
  selectLoader: false,
  rejectLoader: false,
  userStatusFilter: "All",
  mailLoader: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_USER_LOADER:
      return {
        ...state,
        userLoader : action.bool
      };
    case TOGGLE_MAIL_LOADER:
      return {
        ...state,
        mailLoader : action.bool
      };
    case SET_USER_STATUS_FILTER:
      return {
        ...state,
        userStatusFilter : action.status
      };
    case UPDATE_USER_STATUS_LOCALLY:
      state.users[action.index].status = action.status;
      return {
        ...state,
        users : [...state.users]
      }
    case TOGGLE_STATUS_LOADER:
      if(action.status === "Selected"){
        return {
          ...state,
          selectLoader : action.bool
        };
      }else if(action.status === "Rejected"){
        return {
          ...state,
          rejectLoader : action.bool
        };
      }

    case UPDATE_USERS_LIST:
      const userList = action.users.map(item => {
        Object.assign(item, {selected: false})
        return item;
      })
      return {
        ...state,
        users : userList
      };
    case UPDATE_USER_SELECTED:
      state.users[action.index].selected = !state.users[action.index].selected
      if(state.users[action.index].selected){
        if(!state.emailList.includes(state.users[action.index].email)){
          state.emailList.push(state.users[action.index].email)
        }
      }else{
        if(state.emailList.includes(state.users[action.index].email)){
          const index = state.emailList.indexOf(state.users[action.index].email);
          state.emailList.splice(index, 1)
        }
      }
      return {
        ...state,
        users : [...state.users],
        emailList: [...state.emailList]
      };
    case SELECT_ALL:
      const emails = [];
      state.users.filter(user => state.userStatusFilter === "All" ? user : user.status === state.userStatusFilter).forEach(user => {
        user.selected = action.bool
        if(action.bool){
          emails.push(user.email);
        }
      })
      return {
        ...state,
        users : [...state.users],
        emailList: emails
      };
    default:
      return state;
  }
};

export default reducer;
