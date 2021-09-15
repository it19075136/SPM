import { combineReducers } from 'redux';
import vehicleAdReducer from './vehicleAdReducer';
import userReducer from './userReducer';
export default combineReducers({
    vehicle: vehicleAdReducer,
    user:userReducer
});