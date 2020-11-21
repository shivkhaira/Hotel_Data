export const addItemtoCart=(cartItems,cartItemtoAdd)=>{
    const existingcartItem=cartItems.find(cartItem=>cartItem.id===cartItemtoAdd.id)
    if (existingcartItem)
    {
        return cartItems.map(cartItem=>
            cartItem.id===cartItemtoAdd.id?{...cartItem,quantity:cartItem.quantity+1}:cartItem
        )
    }

    return [...cartItems,{...cartItemtoAdd,quantity:1}]
}



export const decreaseItem=(cartItems,cartItemtoAdd)=>{
    
    const existingcartItem=cartItems.find(cartItem=>cartItem.id===cartItemtoAdd.id)
    if (existingcartItem)
    {
        return cartItems.map(cartItem=>
            cartItem.id===cartItemtoAdd.id?{...cartItem,quantity:cartItem.quantity-1}:cartItem
        )
    }

    return [...cartItems,{...cartItemtoAdd,quantity:1}]
}
