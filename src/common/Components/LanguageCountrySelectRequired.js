import { observer } from 'mobx-react';
import SelectLanguage from 'Settings/Language';
import appModel from 'models/app';

const Component = observer(({  children }) => {
  if (!appModel.attrs.language) {
    return <SelectLanguage appModel={appModel} hideHeader />;
  }

  return children;
});


export default Component;
