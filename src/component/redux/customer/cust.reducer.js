
const INITIAL_STATE={
    customer:null
}

const CustReducer=(state=INITIAL_STATE,action)=>{
    
    switch(action.type)
    {
       
        case 'ADD_CUST':
            return{
                ...state,
                rest:action.payload
            }
               
         default:
                return state
    }
}

export default CustReducer