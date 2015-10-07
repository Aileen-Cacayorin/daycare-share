import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addTeacher() {
      var params = {
        name: this.get('teacherName'),
        education: this.get('teacherEducation'),
        experience: this.get('teacherExperience'),
        about: this.get('teacherAbout'),
        certifications: this.get('teacherCertifications'),
        years: this.get('teacherYears'),
        image: this.get('teacherImage'),
        daycare: this.get('daycare')
      }
      debugger;
      this.sendAction('addTeacher', params)
    }
  }
});
