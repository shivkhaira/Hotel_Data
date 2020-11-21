
const INITIAL_STATE={
    rest:null
}

const RestReducer=(state=INITIAL_STATE,action)=>{
    
    switch(action.type)
    {
       
        case 'ADD_REST':
            return{
                ...state,
                rest:action.payload
            }
               
         default:
                return state
    }
}

export default RestReducer