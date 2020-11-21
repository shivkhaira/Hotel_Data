import React from 'react'
import {connect} from 'react-redux'
import {selectCartItems,selectCartItemsPrice,selectCartItemsQuantity} from '../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'


const CartItems=({cartItems,selectCartItemsPrice,selectCartItemsQuantity})=>{
    return(
    <div>
 {cartItems.map(cartItem=>(
                <div key={cartItem.id}>{cartItem.dish} {cartItem.quantity}</div>
            ))}
            <h3>Total Items: {selectCartItemsQuantity}</h3>
<h3>Price: {selectCartItemsPrice}</h3>
    </div>
    )
}

const maptoporps=()=>createStructuredSelector({
    cartItems:selectCartItems,
    selectCartItemsPrice:selectCartItemsPrice,
    selectCartItemsQuantity:selectCartItemsQuantity
})


export default connect(maptoporps)(CartItems)