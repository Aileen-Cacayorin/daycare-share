import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  email: DS.attr(),
  uid: DS.attr(),
  // location: DS.attr(),
  // avatar: DS.attr(),
  daycares: DS.hasMany('daycare', {async: true})
});
