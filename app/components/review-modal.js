import Ember from 'ember';

export default Ember.Component.extend({
  currentRating: 0,

  actions: {
   updateRating(params) {
     var clickedRating = params.rating;
     this.set('currentRating', clickedRating);
   },

   addReview() {
     var params = {
       name: this.get('reviewName'),
       date: new Date(),
       body: this.get('body'),
       rating: this.get('currentRating'),
       user: this.get('user'),
       daycare: this.get('daycare')
     }
     debugger;
     this.sendAction('addReview', params)
   }

  }
});
