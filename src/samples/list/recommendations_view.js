import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import Device from 'helpers/device';
import JST from 'JST';
import './styles.scss';

const MainView = Marionette.View.extend({
  template: JST['samples/list/recommendation'],

  events: {
    // eslint-disable-next-line
    'click #btn-negative': function() {
      this.nextStep(false);
    },
    // eslint-disable-next-line
    'click #btn-positive': function() {
      this.nextStep(true);
    },
  },

  nextStep(userActionIsPositive) {
    const appModel = this.options.appModel;

    if (!this.step) {
      if (!userActionIsPositive) {
        this.step = 'negativeFeedback';
        this.render();
        return;
      }

      this.step = 'positiveFeedback';
      this.render();
      return;
    }

    appModel.set('feedbackGiven', true).save();
    this.triggerMethod('recommendation:done');

    if (!userActionIsPositive) {
      Log('Recommendations: exiting review');
      return;
    }

    if (this.step === 'negativeFeedback') {
      Log('Recommendations: asking for feedback');
      return;
    }

    Log('Recommendations: asking for app review');

    window.LaunchReview.launch();
  },

  serializeData() {
    const storeName = Device.isIOS() ? 'App Store' : 'Play Store';
    const steps = {
      initial: {
        question: t('Enjoying the app?'),
        negativeOption: t('Not really'),
        positiveOption: t('Yes!'),
      },
      negativeFeedback: {
        question: t('Would you mind giving us some feedback?'),
        negativeOption: t('No, thanks'),
        positiveOption: t('OK, sure'),
        link: true,
      },
      positiveFeedback: {
        question: t(`How about a rating on the ${storeName} then?`),
        negativeOption: t('No, thanks'),
        positiveOption: t('OK, sure'),
      },
    };
    return steps[this.step || 'initial'];
  },
});

export { MainView as default };
