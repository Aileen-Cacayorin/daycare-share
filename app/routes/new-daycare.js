import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var sessionId = this.get("session").content.uid;
    return this.store.findRecord('user', sessionId);
  },

  actions: {

    addDaycare(params) {
      Object.keys(params).forEach(function(key){

        if(params[key] === undefined) {
          alert("Please fill in all form fields");
          this.transitionTo('new-daycare');
        }
      });
      var newDaycare = this.store.createRecord('daycare', params);
      var user = params.user
      user.get('daycares').addObject(newDaycare);
      newDaycare.save().then(function(){
        return user.save();
      });
      this.transitionTo('index');
    }
  }
});
