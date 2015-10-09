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
      Object.keys(params).forEach(function(key){
        if(params[key] === undefined) {
          alert("Please fill in all form fields");
          this.transitionTo('daycare');
        }
      });
      var newTeacher = this.store.createRecord('teacher', params);
      var daycare = params.daycare
      daycare.get('teachers').addObject(newTeacher);
      newTeacher.save().then(function(){
        return daycare.save();
      });

      this.transitionTo('daycare')
    },


    addClass(params) {
      Object.keys(params).forEach(function(key){
        if(params[key] === undefined) {
          alert("Please fill in all form fields");
          this.transitionTo('daycare');
        }
      });
      var newClass = this.store.createRecord('class', params);
      var daycare = params.daycare
      daycare.get('classes').addObject(newClass);
      newClass.save().then(function(){
        return daycare.save();
      });
      this.transitionTo('daycare')
    },

    addReview(params) {
      Object.keys(params).forEach(function(key){
        if(params[key] === undefined) {
          alert("Please fill in all form fields");
          this.transitionTo('daycare');
        }
      });
      var newReview = this.store.createRecord('review', params);
      var daycare = params.daycare
      daycare.get('reviews').addObject(newReview);
      var user = params.user
      user.get('reviews').addObject(newReview)
      newReview.save().then(function(){
        user.save();
        return daycare.save();
      });
      debugger;
      this.transitionTo('daycare')
    }
  }

});
