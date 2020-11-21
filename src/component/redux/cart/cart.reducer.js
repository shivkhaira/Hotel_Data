import {addItemtoCart,decreaseItem} from './cart.utils.js'

const INITIAL_STATE={
    cartItems:[]
}

const CartReducer=(state=INITIAL_STATE,action)=>{
    console.log(action.type)
    switch(action.type)
    {
       
        case 'ADD_ITEM':
            return{
                ...state,
                cartItems:addItemtoCart(state.cartItems,action.payload)
            }
        case 'REMOVE_ITEM':
            
            return {
                ...state,
                cartItems:state.cartItems.filter(cartItem=>cartItem.id!==action.payload.id)
            }

            case 'CLEAR_CART':
            
            return {
                ...state,
                cartItems:[]
            }

            case 'DECREASE':
            
                return {
                    ...state,
                    cartItems:decreaseItem(state.cartItems,action.payload)
                }
           
         default:
                return state
    }
}

export default CartReducer