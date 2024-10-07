import { observer } from 'mobx-react';
import { globe } from 'ionicons/icons';
import { Main, Header, Page, RadioInput } from '@flumens';
import { IonIcon, IonList } from '@ionic/react';
import languages from 'common/config/languages';
import appModel from 'common/models/app';
import './styles.scss';

type Props = {
  hideHeader?: boolean;
};
function SelectLanguage({ hideHeader }: Props) {
  const currentValue = appModel.attrs.language;

  function onSelect(newValue: any) {
    appModel.attrs.language = newValue; // eslint-disable-line no-param-reassign
    appModel.save();
  }

  const alphabetically = ([, l1]: any, [, l2]: any) => l1.localeCompare(l2);
  const getOption = ([id, title]: any) => ({ value: id, label: title });
  const options = Object.entries(languages).sort(alphabetically).map(getOption);

  return (
    <Page id="language-select">
      {!hideHeader && <Header title="Language" />}

      <Main>
        <IonList className="my-5">
          {hideHeader && (
            <div className="header">
              <IonIcon icon={globe} size="large" />
              <h4>Select your language</h4>
            </div>
          )}

          <RadioInput
            onChange={onSelect}
            value={currentValue || ''}
            options={options}
          />
        </IonList>
      </Main>
    </Page>
  );
}

export default observer(SelectLanguage);
