import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  email: DS.attr(),
  uid: DS.attr(),
  reviews: DS.hasMany('review', {async: true}),
  daycares: DS.hasMany('daycare', {async: true})
});
