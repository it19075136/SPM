import * as actionType from "../../utils/constants";

const initstate = {
    categories : []
    
}

export default function (state = initstate, action) {
    switch(action.type) {
        case actionType.GET_ALL_CATEGORIES:
            return {
                ...state,
                categories : action.payload
            }
        case actionType.DELETE_CATEGORIES:
            return {
                ...state,
                categories : state.categories.filter(val => val._id != action.payload)
            }     
            default:
                return state;
    }
}