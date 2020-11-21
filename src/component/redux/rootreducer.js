import {combineReducers} from 'redux'
import CartReducer from './cart/cart.reducer'
import userReducer from './user/user.reducer'
import RestReducer from './rest/rest.reducer'
import CustReducer from './customer/cust.reducer'

export default combineReducers({
   cart:CartReducer,
   user:userReducer,
   rest:RestReducer,
   cust:CustReducer
})