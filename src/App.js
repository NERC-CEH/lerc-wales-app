import 'helpers/system_checkup';
import 'common/translations/translator';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { observer } from 'mobx-react';
import appModel from 'app_model';
import LanguageCountrySelectRequired from 'Components/LanguageCountrySelectRequired';
import Home from './Home';
import User from './User';
import Info from './Info';
import Settings from './Settings';
import SplashScreenRequired from './Info/SplashScreenRequired';
import Survey from './Survey';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'common/theme.scss';

const App = observer(() => (
  <IonApp>
    <IonReactRouter>
      <LanguageCountrySelectRequired appModel={appModel}>
        <Route exact path="/" render={() => <Redirect to="/home/surveys" />} />
        <SplashScreenRequired appModel={appModel}>
          <IonPage id="main">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/survey" component={Survey} />
              <IonRouterOutlet>
                {User}
                {Info}
                {Settings}
              </IonRouterOutlet>
            </Switch>
          </IonPage>
        </SplashScreenRequired>
      </LanguageCountrySelectRequired>
    </IonReactRouter>
  </IonApp>
));

export default App;
