import * as actionType from "../../utils/constants";

const initstate = {
    sparepartsAds = [],
    sparepartAd = null
}

export default function (state = initstate, action) {
    switch(action.type) {
        case actionType.ADD_SPAREPARTS_AD:
            return {
                ...state,
                sparepartsAds: [...state.sparepartsAds, action.payload],
            }
        case actionType.UPDATE_SPAREPARTS_AD:
            return {
                ...state,
                sparepartsAds: [...state.sparepartsAds.filter(sparepartAd => sparepartAd._id != action.payload._id), action.payload]
            }
        case actionType.GET_SPAREPARTS_AD_BY_ID:
            return {
                ...state,
                sparepartAd: action.payload
            }
        case actionType.GET_ALL_SPAREPARTS_ADS:
            return {
                ...state,
                sparepartAd: action.payload
            }
        case actionType.DELETE_SPAREPARTS_AD:
            return {
                ...state,
                sparepartsAds: [...state.sparepartsAds.filter(sparepartAd => sparepartAd._id != action.payload._id)]
            }
        default:
            return state;
    }
}