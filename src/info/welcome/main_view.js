/** ****************************************************************************
 * Info Menu main view.
 **************************************************************************** */

import 'jquery-touchswipe';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import './styles.scss';
import './images/welcome_1.jpg';

export default Marionette.View.extend({
  id: 'welcome',
  template: JST['info/welcome/main'],

  triggers: {
    'click #exit': 'exit',
  },
});
