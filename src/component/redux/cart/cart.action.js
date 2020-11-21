export const addItem=item=>({
    type:'ADD_ITEM',
    payload:item
})

export const clearItem=item=>({
    type:'REMOVE_ITEM',
    payload:item
})

export const decItem=item=>({
    type:'DECREASE',
    payload:item
})

export const clearCart=()=>({
    type:'CLEAR_CART'
})