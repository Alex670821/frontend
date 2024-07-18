// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Profile from "./containers/Profile"; // Importar el componente Profile
import SubscriptionForm from "./components/SubscriptionForm"; // Importar el componente SubscriptionForm
import Rewards from "./containers/Rewards";
import VideoUpload from "./components/VideoUpload";
import ScheduledVideos from "./components/ScheduledVideos";
import VideoList from "./components/VideoList";

import { Provider } from "react-redux";
import store from "./store";

import Layout from "./hocs/Layout";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/subscribe" component={SubscriptionForm} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" component={Activate} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/rewards" component={Rewards} />
          <Route exact path="/upload-video" component={VideoUpload} />
          <Route exact path="/scheduled-videos" component={ScheduledVideos} />
          <Route exact path="/videos" component={VideoList} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
