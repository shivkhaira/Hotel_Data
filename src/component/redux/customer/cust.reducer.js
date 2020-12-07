
const INITIAL_STATE={
    customer:null
}

const CustReducer=(state=INITIAL_STATE,action)=>{
    
    switch(action.type)
    {
       
        case 'ADD_CUSTOMER':
            return{
                ...state,
                customer:action.payload
            }
               
         default:
                return state
    }
}

export default CustReducer