import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  address: DS.attr(),
  email: DS.attr(),
  phone: DS.attr(),
  waitlist: DS.attr(),
  ratio: DS.attr(),
  certifications: DS.attr(),
  hours: DS.attr(),
  mission: DS.attr(),
  description: DS.attr(),
  website: DS.attr(),
  image1: DS.attr(),
  image2: DS.attr(),
  image3: DS.attr(),
  image4: DS.attr(),
  image5: DS.attr(),
  teachers: DS.hasMany('teacher', {async: true}),
  classes: DS.hasMany('class', {async: true}),
  user: DS.belongsTo('user', {async: true})
});
