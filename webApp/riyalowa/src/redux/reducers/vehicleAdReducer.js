import { ADD_VEHICLE_AD, DELETE_VEHICLE_AD, GET_VEHICLE_AD_BY_ID, UPDATE_VEHICLE_AD } from '../../utils/constants'

const initstate = {
    vehicleAds: [],
    vehicleAd: null
}

export default function (state = initstate, action) {

    switch (action.type) {
        case ADD_VEHICLE_AD:
            return {
                ...state,
                vehicleAds: [...state.vehicleAds, action.payload],
            }
        case UPDATE_VEHICLE_AD:
            return {
                ...state,
                vehicleAds: [...state.vehicleAds.filter(vehicleAd => vehicleAd._id != action.payload._id), action.payload]
            }
        case GET_VEHICLE_AD_BY_ID:
            return {
                ...state,
                vehicleAd: action.payload
            }
        case DELETE_VEHICLE_AD:
            return {
                ...state,
                vehicleAds: [...state.vehicleAds.filter(vehicleAd => vehicleAd._id != action.payload._id)]
            }
        default:
            return state;
    }
}
