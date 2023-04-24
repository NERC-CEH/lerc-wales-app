import { observer } from 'mobx-react';
import { Main, Header, Page } from '@flumens';
import {
  IonIcon,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
} from '@ionic/react';
import { globe } from 'ionicons/icons';
import languages from 'common/config/languages';
import './styles.scss';

function SelectLanguage({ appModel, hideHeader }) {
  const currentValue = appModel.attrs.language;

  function onSelect(e) {
    appModel.attrs.language = e.target.value; // eslint-disable-line no-param-reassign
    appModel.save();
  }

  const alphabetically = ([, l1], [, l2]) => l1.localeCompare(l2);
  const languagesOptions = Object.entries(languages)
    .sort(alphabetically)
    .map(([value, language]) => (
      <IonItem key={value}>
        <IonLabel>{language}</IonLabel>
        <IonRadio value={value} checked={currentValue === value} />
      </IonItem>
    ));

  return (
    <Page id="language-select">
      {!hideHeader && <Header title="Language" />}

      <Main>
        <IonList>
          {hideHeader && (
            <div className="header">
              <IonIcon icon={globe} size="large" />
              <h4>Select your language</h4>
            </div>
          )}
          <IonRadioGroup onIonChange={onSelect}>
            {languagesOptions}
          </IonRadioGroup>
        </IonList>
      </Main>
    </Page>
  );
}

export default observer(SelectLanguage);
