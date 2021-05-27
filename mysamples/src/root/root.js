import React from 'react';
import Login from '../pages/Auth';
import Users from '../pages/Users';
import Admin from '../pages/Admin';
import Dashboard from '../pages/Admin/dashboard';
import AddTest from '../pages/Admin/addQ';
import Instructions from '../pages/Instructions';
import Test from '../pages/Test';
import EndTest from '../pages/Test/endTest';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import '../design/layout.css';

const { Content } = Layout;

class Root extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/users" component={Users} />
          <Route exact path="/admin/dashboard/add-test" component={AddTest} />
          <Route exact path="/instructions" component={Instructions} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/result" component={EndTest} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
