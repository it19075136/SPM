import { combineReducers } from 'redux';
import vehicleAdReducer from './vehicleAdReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    vehicle: vehicleAdReducer,
    category: categoryReducer
});