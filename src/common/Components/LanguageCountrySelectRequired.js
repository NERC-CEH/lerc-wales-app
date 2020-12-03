import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SelectLanguage from 'Settings/Language';

const Component = observer(({ appModel, children }) => {
  if (!appModel.attrs.language) {
    return <SelectLanguage appModel={appModel} hideHeader />;
  }

  return children;
});

Component.propTypes = {
  appModel: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Component;
