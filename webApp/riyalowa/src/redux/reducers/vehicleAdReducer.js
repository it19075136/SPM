import { ADD_VEHICLE_AD, DELETE_VEHICLE_AD, GET_ALL_VEHICLE_ADS, GET_PUBLISHED_VEHICLE_ADS, GET_VEHICLE_AD_BY_ID, UPDATE_VEHICLE_AD } from '../../utils/constants'

const initstate = {
    vehicleAds: [],
    vehicleAd: null,
    publishedVehicleAds: [],
    publishedVehicleAdIds: []
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
        case GET_PUBLISHED_VEHICLE_ADS:
            return {
                ...state,
                publishedVehicleAdIds: action.payload
            }
        case GET_ALL_VEHICLE_ADS:
            return {
                ...state,
                vehicleAds: action.payload
            }
        default:
            return state;
    }
}
