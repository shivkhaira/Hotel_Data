import {createSelector} from 'reselect'

const selectCart=state=>state.cart

export const selectCartHidden=createSelector(
    [selectCart],
    cart=>cart.hidden
)

export const selectCartItems=createSelector(
    [selectCart],
    (cart)=>cart.cartItems
)

export const selectCartItemsPrice=createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce(
        (accumulatedPrice,cartItem)=>accumulatedPrice+(cartItem.quantity*cartItem.price),0)
)

export const selectCartItemsQuantity=createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce(
        (accumulatedPrice,cartItem)=>accumulatedPrice+cartItem.quantity,0)
)





