import Ember from 'ember';

export default Ember.Route.extend({

   model(params) {
    return this.store.findRecord('daycare', params.daycare_id);
  },

  actions: {
    saveChanges(daycare, params) {
      Object.keys(params).forEach(function(key){
        if(params[key] !== undefined) {
          daycare.set(key, params[key]);
        }
      });
      daycare.save();
      this.transitionTo('daycare');
    },

    addTeacher(params) {
      var newTeacher = this.store.createRecord('teacher', params);
      var daycare = params.daycare
      daycare.get('teachers').addObject(newTeacher);
      newTeacher.save().then(function(){
        return daycare.save();
      });
      debugger;
      this.transitionTo('daycare')
    }
  }




});
