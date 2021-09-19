import { combineReducers } from 'redux';
import vehicleAdReducer from './vehicleAdReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import sparepartAdReducer from './sparepartsAdReducer';
export default combineReducers({
    vehicle: vehicleAdReducer,
    sparepart: sparepartAdReducer,
    user:userReducer,
    category: categoryReducer
});