import { UPDATE_USER, ADD_USER } from '../../utils/constants'

const initstate = {
    user: {},
}

export default function (state = initstate, action) {

    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user: action.payload,
            }
        case UPDATE_USER:
            return {
                ...state,
                // vehicleAds: [...state.vehicleAds.filter(vehicleAd => vehicleAd._id != action.payload._id), action.payload]
            }
        default:
            return state;
    }
}
