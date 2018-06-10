import 'jquery-touchswipe';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import './styles.scss';

export default Marionette.View.extend({
  id: 'language',
  template: JST['info/language/main'],

  triggers: {
    'click #english': 'english',
    'click #welsh': 'welsh',
  },
});
