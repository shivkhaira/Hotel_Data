import React, { useState,useEffect } from 'react'
import Title from './hotel.title'
import View from './item.view'
import CartItems from '../cart/cart.component'
import CustomButton from '../button/button.component'
import CustomInput from '../input/customInput.component'
import {createOrder} from '../../firebase/firebase.utils'
import {selectCartItems,selectCartItemsQuantity,selectCartItemsPrice} from '../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {auth,firestore} from '../../firebase/firebase.utils'
import {Link} from 'react-router-dom'
import {selectCRest} from '../redux/rest/rest.selectors'
import { useParams } from 'react-router-dom'
import {clearCart} from '../redux/cart/cart.action'

const HotelView=({clearCart,cartItems,currentUser,selectCartItemsQuantity,selectCartItemsPrice})=>
{
  const { res_id,t_id } = useParams();
 
 const [data,Setdata]=useState([])
 const [mida,Setmida]=useState()
 const [loading,Setload]=useState(true)
 const [mid,Setmid]=useState(true)
const [search,Setsearch]=useState('')

const makeid=(length)=> {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

 const handle=async()=>{

if (cartItems.length<1)
{
alert('Empty Cart')
}
else
{
     const datax={
         pending:0,
         time:new Date().toLocaleString(),
         id:makeid(8),
         table:t_id,
         res_id:res_id,
         price:selectCartItemsPrice,
         quantity:selectCartItemsQuantity,
         data:{
         ...cartItems
         }
     }
     await createOrder(datax)
     alert('Order Succesfull')
     clearCart()
    }
     
 }

 useEffect(() => {
   //console.log(match)
    let m=[]
    var docRef = firestore.collection("data").where('res_id', '==', res_id)
    docRef.get().then(function(querySnapshot) {
       
        querySnapshot.forEach(function(doc) {
           
            m.push({
                id:doc.id,
                category:doc.data().category,
               
            })
        })
    

      
        Setmida(m)


        
        Setmid(false)
        

        if (mid === false) {
           
            Promise.all(
              mida.map(f => {
                let items = []
                var docRef = firestore
                  .collection('Dish')
                  .where('category', '==', f.category)
                  .where('res_id', '==', res_id)
                return docRef.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    items.push({
                      id:doc.data().id,
                      dish: doc.data().dish,
                      price:doc.data().price
                    })
                  })
                  return { id: f.id, category: f.category, items }
                })
              }),
            ).then(results => {
              Setdata(results)
              Setload(false)
            })
          }

    })
},[mid,mida])

 const change=(e)=>{
    Setsearch(e.target.value)
 }

 return(
    
    <div className="shop-page">
         {
           <div hidden>
    currentUser?
    <button className='option' onClick={()=>auth.signOut()}>SIGN OUT</button>
    :
    <Link to='signin'>SIGN IN</Link>
    </div>
}
<br />

{cartItems.length>0 && <CustomButton type="button" onClick={clearCart}>Clear Cart</CustomButton> }
{cartItems.length>0 &&   <CustomButton type="button" onClick={handle}>Order Now</CustomButton>}
      

            <CartItems />

            <CustomInput type="text" value={search} onChange={change} />
   

       
       {loading?'Loading':


        data.map(d=>
            <div key={d.id}>
            <Title title={d.category} /> 
            <View item={d.items} search={search} />
            </div>
        )
    }

    </div>
)

}

const maptoporps=()=>createStructuredSelector({
    cartItems:selectCartItems,
    currentUser:selectCurrentUser,
    selectCartItemsQuantity:selectCartItemsQuantity,
    selectCartItemsPrice:selectCartItemsPrice,
    rest:selectCRest
})

const maptoDispatchtoProps=dispatch=>({
  clearCart:cart=>dispatch(clearCart(cart))
})


export default connect(maptoporps,maptoDispatchtoProps)(HotelView)