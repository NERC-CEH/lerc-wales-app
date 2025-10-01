import { observer } from 'mobx-react';
import appModel from 'models/app';
import SelectLanguage from '../../Settings/Language';

const Component = observer(({ children }) => {
  if (!appModel.attrs.language) {
    return <SelectLanguage appModel={appModel} hideHeader />;
  }

  return children;
});

export default Component;
