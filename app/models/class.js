import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  ages: DS.attr(),
  description: DS.attr(),
  image: DS.attr(),
  schedule: DS.attr(),
  ratio: DS.attr(),
  daycare: DS.belongsTo('daycare', {async: true})

});
