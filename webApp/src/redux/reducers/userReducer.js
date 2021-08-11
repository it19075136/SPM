
const initstate={
    user: null
}
export default function(state=initstate,action){
    switch(action.type){
        case 'ADD_USER':
            return{
                ...state,
                user:action.payload
            }
            default:
                return state;
    }
    
}
