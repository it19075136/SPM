import { combineReducers } from 'redux';
import vehicleAdReducer from './vehicleAdReducer';

export default combineReducers({
    vehicle: vehicleAdReducer
});