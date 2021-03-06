import { combineReducers } from 'redux';
import results from './results';
import details from './details';
import loading from './loading';
import params from './params';
import cast from './cast';

export default combineReducers({
  results,
  details,
  loading,
  params,
  cast
});
