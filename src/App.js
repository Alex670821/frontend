import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import SubscriptionForm from "./components/SubscriptionForm";
import CreateStreamForm from "./components/CreateStreamForm";
import StreamView from "./components/StreamView";
import LiveVideoStream from "./components/LiveVideoStream";
import ViewLiveStream from "./components/ViewLiveStream";
import StreamList from "./components/StreamList";
import StreamingComponent from "./components/StreamingComponent";
import ViewStreams from "./components/ViewStreams";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
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
          <Route exact path="/create-stream" component={CreateStreamForm} />
          <Route exact path="/streams/:id" component={StreamView} />
          <Route exact path="/live" component={LiveVideoStream} />
          <Route exact path="/view/:id" component={ViewLiveStream} />
          <Route exact path="/view-streams" component={StreamList} />
          <Route exact path="/stream" component={StreamingComponent} />
          <Route path="/view-streams" component={ViewStreams} />
          <Route path="/view-stream/:id" component={ViewLiveStream} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
