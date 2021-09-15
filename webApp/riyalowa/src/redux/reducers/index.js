import { combineReducers } from 'redux';
import vehicleAdReducer from './vehicleAdReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
export default combineReducers({
    vehicle: vehicleAdReducer,
    user:userReducer,
    category: categoryReducer
});