import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { showToast } from '../components/Toast';

export default function fetchDetails(action$, { dispatch }) {
  return action$.ofType('FETCH_DETAILS').mergeMap((action) => {
    dispatch({ type: 'START_LOADING' });
    dispatch({ type: 'RESET_DETAILS' });
    return ajax
      .getJSON(
        `http://${window.location.hostname}:7500/api/list?torrentId=${window.btoa(action.payload)}&timestamp=${new Date().getTime()}`,
      {
        withCredentials: true
      }
      )
      .retry(3)
      .switchMap(payload => [
        {
          type: 'SET_DETAILS',
          payload
        },
        {
          type: 'STOP_LOADING'
        }
      ])
      .catch((err) => {
        showToast(err.message, 'error');
        return Observable.of({
          type: 'STOP_LOADING'
        });
      });
  });
}
