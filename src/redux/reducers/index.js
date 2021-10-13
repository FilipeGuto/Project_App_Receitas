import { combineReducers } from 'redux';
import reducerLogin from './reducerLogin';
import reducerHeader from './reducerHeader';
import reducerFilter from './reducerFilter';

const rootReducer = combineReducers({
  reducerLogin,
  reducerHeader,
  reducerFilter,
});

export default rootReducer;
