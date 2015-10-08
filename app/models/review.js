import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  date: DS.attr(),
  body: DS.attr(),
  rating: DS.attr(),
  user: DS.belongsTo('user', {async: true}),
  daycare: DS.belongsTo('daycare', {async: true})
});
