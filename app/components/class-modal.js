import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    addClass() {
      var params = {
        name: this.get('className'),
        ages: this.get('ages'),
        description: this.get('classDescription'),
        schedule: this.get('schedule'),
        ratio: this.get('classRatio'),
        image: this.get('image'),
        daycare: this.get('daycare')
      }
      debugger;
      this.sendAction('addClass', params)
    }
  }
});
