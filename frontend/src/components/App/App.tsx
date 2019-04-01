import React, { useState, useEffect } from 'react';
import {
  withRouter,
  RouteComponentProps,
  Route,
  Switch,
  Redirect,
} from 'react-router';

import { yonFetch } from '../../services';
import { User } from '../../types';
import { UserdataContext, FlowsContext } from '../../contexts';

import Header from '../Header';
import SideMenu from '../SideMenu';
import AppBody from '../AppBody';

import './App.scss';
import LoginForm from '../LoginForm';
import GreetingPage from '../AppBody/GreetingPage';
import H1 from '../H1';
import Polls from '../Polls';
import { useUserdata, useFlows } from '../../hooks';
import Spinner from '../Spinner';
import Button from '../Button';
import NotFound from './NotFound';

/* 
TODO:Roadmap 
  -! Fix reset password functionality
  -! Add error boundaries
  - Add functionality to view polls created by user
  - Add ability to place custom vote labels on polls
  ...
  999. implement cool loading animation
*/

const App = () => {
  const { userdata, updateProfile } = useUserdata();
  const { flows, flowsLoading } = useFlows();

  return (
    <UserdataContext.Provider value={{ userdata, updateProfile }}>
      <div className="app">
        <FlowsContext.Provider value={{ flows, flowsLoading }}>
          <Header />
          {flowsLoading ? (
            <Spinner />
          ) : (
            <Switch>
              <Route
                exact
                path={['/home', '/polls', '/polls/:flow']}
                render={({ match, location }) => {
                  const allFlowUrls = flows.map(
                    ({ name }) => `/polls/${name.replace(' ', '_')}`
                  );

                  const selectedFlow:
                    | string
                    | undefined = location.pathname.includes('polls')
                    ? match.params.flow
                      ? match.params.flow.split('_').join(' ')
                      : 'All polls'
                    : undefined;

                  return (
                    <>
                      <SideMenu selectedFlow={selectedFlow} />

                      <AppBody>
                        <Switch>
                          <Route exact path="/home" component={GreetingPage} />

                          <Route exact path={['/polls', ...allFlowUrls]}>
                            <H1>{selectedFlow}</H1>
                            <Polls selectedFlow={selectedFlow as string} />
                          </Route>

                          <Route path="/polls/all">
                            <Redirect to="/polls" />
                          </Route>

                          <Route>
                            <H1>Whoops!</H1>
                            <span style={{ textAlign: 'center' }}>
                              There is no such flow available!
                            </span>
                          </Route>
                        </Switch>
                      </AppBody>
                    </>
                  );
                }}
              />

              <Route exact path="/">
                <Redirect to="/home" />
              </Route>

              <Route exact path="/user/:process">
                {userdata.is_auth ? <Redirect to="/home" /> : <LoginForm />}
              </Route>

              <Route exact path="/user">
                <Redirect to={userdata.is_auth ? '/home' : '/user/signin'} />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          )}
        </FlowsContext.Provider>
      </div>
    </UserdataContext.Provider>
  );
};

export default App;
