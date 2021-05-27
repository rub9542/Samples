import React from "react";
import { connect } from "react-redux";
import "antd/dist/antd.less";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { saveToLocalStorage, loadFromLocalStorage } from "./store";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import Root from "./root/root";
import { sessionService } from "redux-react-session";
import "./App.css";
import { Api } from "./services";
const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger)
  // applyMiddleware(thunk)
);

store.subscribe(() => saveToLocalStorage(store.getState()));
sessionService.initSessionService(store).then(data => {
  const { authenticated, user } = store.getState()["session"];
  if (authenticated) {
    const token = user.accessToken;
    Api.header(token);
  }
});
window.store = store;

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

export default App;
