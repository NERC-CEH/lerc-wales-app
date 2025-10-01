// eslint-disable-next-line import/no-extraneous-dependencies
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uk.ac.ceh.lercwales',
  appName: 'LERC Wales',
  webDir: 'build',
  cordova: {},
  android: {
    adjustMarginsForEdgeToEdge: 'force',
  },
};

export default config;
