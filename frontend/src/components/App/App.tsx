import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { useUserdata, useFlows } from '../../hooks';
import { UserdataContext, FlowsContext } from '../../contexts';

import H1 from '../H1';
import Polls from '../Polls';
import Header from '../Header';
import AppBody from '../AppBody';
import Spinner from '../Spinner';
import NotFound from './NotFound';
import SideMenu from '../SideMenu';
import ErrorBoundary from '../ErrorBoundary';
import GreetingPage from '../AppBody/GreetingPage';
import LoginForm, { EnterPasswordForm } from '../LoginForm';

import './App.scss';

const App = () => {
  const { userdata, updateProfile } = useUserdata();
  const { flows, flowsLoading } = useFlows();

  return (
    <div className="app">
      <ErrorBoundary>
        <UserdataContext.Provider value={{ userdata, updateProfile }}>
          <FlowsContext.Provider value={{ flows, flowsLoading }}>
            <Header />
            <ErrorBoundary>
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
                              <Route
                                exact
                                path="/home"
                                component={GreetingPage}
                              />

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

                  <Route exact path="/users/reset/:uemailb64/:token">
                    {userdata.is_auth ? (
                      <Redirect to="/home" />
                    ) : (
                      <EnterPasswordForm />
                    )}
                  </Route>

                  <Route exact path="/user">
                    <Redirect
                      to={userdata.is_auth ? '/home' : '/user/signin'}
                    />
                  </Route>

                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              )}
            </ErrorBoundary>
          </FlowsContext.Provider>
        </UserdataContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
