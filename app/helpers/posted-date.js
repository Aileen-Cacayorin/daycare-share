import Ember from 'ember';

export function postedDate(params) {
  var date = params[0]
  return moment(date).format('LL');;
}

export default Ember.Helper.helper(postedDate);
