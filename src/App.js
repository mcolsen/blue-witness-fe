import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MapContainer from './components/map/MapContainer';
import { LoginCallback } from '@okta/okta-react';
import OktaRoute from './components/OktaRoute';

import RecentTimeline from './components/timeline/RecentTimeline';
import Incidents from './components/incidents/Incidents';
import About from './components/about/About';

import GraphContainer from './components/graphs/GraphContainer';
import NavBar from './components/NavBar/NavBar';
import Stats from './components/Stats/Stats';
import LoginContainer from './components/Login/LoginContainer';
import Dashboard from './components/AdminDashboard/AdminDashboard';
import MapSearch from './components/map/MapSearch';
import HorizontalBar from './components/graphs/bargraph/HorizontalBar';

import useOktaRedux from './hooks/useOktaRedux';

export default function App() {
  // Keeps Okta and Redux in sync
  useOktaRedux();

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <div className="Map">
            <MapContainer />
          </div>
          <div className="map-menu-background">
            <MapSearch />
          </div>
          <div className="bottom-section">
            <Stats />
            <div className="bottom-section-wrap">
              <div className="Timeline">
                <RecentTimeline />
              </div>
              <div className="horizontal-graph">
                <HorizontalBar />
              </div>
            </div>
          </div>
        </Route>

        <Route path="/graph">
          <GraphContainer />
        </Route>
        <Route path="/incidents">
          <Incidents />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login" component={LoginContainer} />
        <Route path="/" exact component={() => <MapContainer />} />
        {/* Bandaid fix to prevent production from crashing due to unspecified Okta environment variables */}
        <OktaRoute path="/admin-dashboard" component={Dashboard} />
        <Route path="/implicit/callback" component={LoginCallback} />
      </Switch>
    </div>
  );
}
