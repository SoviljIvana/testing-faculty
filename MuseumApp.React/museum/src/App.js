import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import { PrivateRouteAdmin } from './components/privateRouteAdmin';
function App() {
  return (
    <React.Fragment>
      <div className="set-overflow-y">
      <Switch>
        <Redirect exact from="/" to="home" />
        <Route path = "/home" component = {Home} />
        <PrivateRouteAdmin path = "/dashboard" component = {Dashboard} />
      </Switch>
      <NotificationContainer />
      </div>
    </React.Fragment>
  );
}
export default App;