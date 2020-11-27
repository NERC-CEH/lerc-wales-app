import React from 'react';
import { Route } from 'react-router-dom';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import Credits from './Credits';
import About from './About';
import Menu from './Menu';
import Help from './Help';
import BRCApproved from './BRCApproved';
import WelshPrivacy from './PrivacyPolicyWelsh';
import WelshTerms from './TermsWelsh';

export default [
  <Route
    path="/info/menu"
    key="/info/menu"
    exact
    render={props => (
      <Menu
        userModel={userModel}
        appModel={appModel}
        savedSamples={savedSamples}
        {...props}
      />
    )}
  />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route path="/info/help" key="/info/about" exact component={Help} />,

  <Route
    path="/info/welsh-privacy"
    key="/info/about"
    exact
    component={WelshPrivacy}
  />,
  <Route
    path="/info/welsh-terms"
    key="/info/about"
    exact
    component={WelshTerms}
  />,

  <Route
    path="/info/brc-approved"
    key="/info/about"
    exact
    component={BRCApproved}
  />,
];
