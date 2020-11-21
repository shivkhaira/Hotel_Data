import React,{useEffect, useState} from 'react'
import {addItem,clearItem,decItem} from '../redux/cart/cart.action'
import CustomButton from '../button/button.component'
import {connect} from 'react-redux'
import {selectCartItems} from '../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'


const Detail=({item,addItem,clearItem,decItem,cartItems})=>{
    const[quant,Setquant]=useState(0)

    useEffect(() => {
      const [p]=cartItems.filter(cartItem=>cartItem.id===item.id)
     if (p)
     {
       Setquant(p.quantity)
     }
     else
     {
         Setquant(0)
     }
     
      
      },[quant,cartItems,item])
    const handle=(e)=>{
      
        if (e.target.name==="plus")
        {
      //  Setquant(quant+1)
        addItem(item)
        }
        else if(e.target.name==="minus")
        {
           // Setquant(quant-1)
            
            if(quant===1)
            {   
             
                clearItem(item) 
               
                console.log(quant)
              
            }
            else{

                decItem(item)
            }
        }
        else{
           // Setquant(quant+1)  
            addItem(item)
        }
   
    }

    return(
        <div key={item.id}>
        <p>{item.dish}</p>
        <p>{item.price}</p>
        {quant===0?<CustomButton key={item.id} onClick={handle} type="button">ADD</CustomButton>:<p><button name="minus" onClick={handle}>-</button> {quant} 
         <button name="plus" onClick={handle}>+</button></p>}
        
        </div>
    )
}


const mapDispatchtoprops=dispatch=>({
    
    addItem:item=>dispatch(addItem(item)),
    clearItem:item=>dispatch(clearItem(item)),
    decItem:item=>dispatch(decItem(item))
    
})


const maptoporps=()=>createStructuredSelector({
    cartItems:selectCartItems 
})
export default connect(maptoporps,mapDispatchtoprops)(Detail)