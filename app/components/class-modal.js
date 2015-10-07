import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    addClass() {
      var params = {
        name: this.get('className'),
        ages: this.get('ages'),
        description: this.get('classDescription'),
        schedule: this.get('schedule'),
        image: this.get('image'),
        daycare: this.get('daycare')

      }
    }
  }
});
