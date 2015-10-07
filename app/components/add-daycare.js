import Ember from 'ember';

export default Ember.Component.extend({


  actions: {
    addDaycare() {
      var params = {
        // username: this.get('username'),
        // password: this.get('password'),
        name: this.get('name'),
        address: this.get('address'),
        email: this.get('email'),
        phone: this.get('phone'),
        website: this.get('website')
        waitlist: this.get('waitlist'),
        ratio: this.get('ratio'),
        certifications: this.get('certifications'),
        hours: this.get('hours'),
        mission: this.get('mission'),
        description: this.get('description'),
        image1: this.get('image1'),
        image2: this.get('image2'),
        image3: this.get('image3'),
        image4: this.get('image4'),
        image5: this.get('image5'),
        user: this.get('user')

      }

      this.sendAction('addDaycare', params);
      username: this.set('');
      password: this.set('');
      name: this.set('');
      email: this.set('');
      phone: this.set('');
      waitlist: this.set('');
      ratio: this.set('ratio');
      certifications: this.set('');
      hours: this.set('');
      mission: this.set('');
      description: this.set('');
      image1: this.set('');
      image2: this.set('');
      image3: this.set('');
      image4: this.set('');
      image5: this.set('');
    }
  }
});
