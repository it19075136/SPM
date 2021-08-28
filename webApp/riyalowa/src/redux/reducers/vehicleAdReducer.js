import { ADD_VEHICLE_AD, UPDATE_VEHICLE_AD } from '../../utils/constants'

const initstate = {
    vehicleAds: [],
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
        default:
            return state;
    }
}
