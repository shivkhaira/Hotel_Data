import React, { useState,useEffect } from 'react'
import Title from './hotel.title'
import View from './item.view'
import CartItems from '../cart/cart.component'
import CustomInput from '../input/customInput.component'
import {createOrder} from '../../firebase/firebase.utils'
import {selectCartItems,selectCartItemsQuantity,selectCartItemsPrice} from '../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {firestore} from '../../firebase/firebase.utils'
import firebase from '../../firebase/firebase.utils'
import {selectCRest} from '../redux/rest/rest.selectors'
import { useParams } from 'react-router-dom'
import {clearCart} from '../redux/cart/cart.action'
import './hotel.style.css'
import Card from '../../shared/Card'
import Button from '../../shared/Button'
import Modal from '../../shared/Modal'
import Payment from '../payment/payment.component'
import { v4 as uuidv4 } from 'uuid'
import LoadingSpinner from '../LoadSpin/loading'

const HotelView=({clearCart,cartItems,selectCartItemsQuantity,selectCartItemsPrice})=>
{
  const { res_id,t_id } = useParams();
 
 const [data,Setdata]=useState([])
 const [mida,Setmida]=useState()
 const [loading,Setload]=useState(true)
 const [mid,Setmid]=useState(true)
 const [search,Setsearch]=useState('')
 const [r_name,setRes]=useState('') 
 const [s_cart,Setcart]=useState(false)
 const [o_load,setOLoad]=useState(false)
 const [openPaypal,setOpenPaypal]=useState(false)
 const [order,setOrder]=useState(false)



const OnlineHandler=async()=>{
  
  var jp_s=uuidv4()
if (cartItems.length<1)
{
alert('Empty Cart')
}
else
{
  var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
     const datax={
         pending:0,
         time:myTimestamp,
         dine_option:opt,
         payment_option:"PayPal",
         id:jp_s,
         table:t_id,
         res_id:res_id,
         price:selectCartItemsPrice,
         quantity:selectCartItemsQuantity,
         data:{
         ...cartItems
         }
     }
     
     //setOLoad(true)
     await createOrder(datax)
    // setOLoad(false)
    
     clearCart()
     
     console.log(jp_s)
    }
   
  
 }


 const handle=async()=>{

  var jp_s=uuidv4()
if (cartItems.length<1)
{
alert('Empty Cart')
}
else
{
  var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
     const datax={
         pending:0,
         time:myTimestamp,
         dine_option:opt,
         payment_option:"Offline",
         id:jp_s,
         table:t_id,
         res_id:res_id,
         price:selectCartItemsPrice,
         quantity:selectCartItemsQuantity,
         data:{
         ...cartItems
         }
     }
     
     setOLoad(true)
     await createOrder(datax)
     setOLoad(false)
   
     clearCart()
     hide_cart()
     setOrder(true)
     
    }
   
  
 }

 useEffect(() => {
  
  var docRe = firestore.collection("Rest").where("res_id", "==", res_id)
  docRe.get().then(function(querySnapshot) {
     
      querySnapshot.forEach(function(doc) {
        setRes(doc.data().name)
  })
})


    let m=[]
    var docRef = firestore.collection("data").where('res_id', '==', res_id)
    docRef.get().then(function(querySnapshot) {
       
        querySnapshot.forEach(function(doc) {
           
            m.push({
                id:doc.id,
                category:doc.data().category,
                category_id:doc.data().id
               
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
                  .where('category_id', '==', f.category_id)
                  .where('res_id', '==', res_id)
                return docRef.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    items.push({
                      id:doc.data().id,
                      dish: doc.data().dish,
                      price:doc.data().price,
                      image:doc.data().image
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

   
},[mid,mida,res_id])


 const change=(e)=>{
    Setsearch(e.target.value)
 }

 const show_cart=()=>{
  Setcart(true)
 }

 const hide_cart=()=>{
  Setcart(false)
  setOpt("null")
  setPayment("null")
  setOption(true)
 }
// eslint-disable-next-line
 const clear_cart=()=>{
  clearCart()
 }

 const Paypal=()=>{
  hide_cart()
  setOpenPaypal(true)
 }

 const [opt,setOpt]=useState("null")
const [option,setOption]=useState(true)
    const changex=(e)=>{
        setOpt(e.target.value)
     
        if(e.target.value==="null")
        {
          setOption(true)
        }
        else
        {
          if (payment!=="null")
        {
          setOption(false)
        }
        }
    }
    const [payment,setPayment]=useState("null")
    const changep=(e)=>{
      setPayment(e.target.value)
      if(e.target.value==="null")
      {
        setOption(true)
      }
      else
      {
        if (opt!=="null")
        {
        
        setOption(false)
      }
      }
  }

 
 return(
    <Card>
              { loading && <LoadingSpinner asOverlay /> }
         {cartItems.length>0 &&
<div className="bottom center">

  <Button onClick={show_cart}>View Cart</Button>
  <Button onClick={clear_cart} danger>Clear Cart</Button>
{/*
Total Items:{selectCartItemsQuantity} - Total Price:{selectCartItemsPrice}</p>
*/}

</div>
}
    <div className="shop-page">
 
   

 <h1 className="title">{r_name}</h1>
            <CustomInput className="search" placeholder="Search" type="text" value={search} onChange={change} />
<hr />


       
       {loading?'Loading':


        data.map(d=>
            <div key={d.id} className="block">
            <Title title={d.category} />
            <View item={d.items} search={search} className="dish_image" />
            </div>
        )
    }



{openPaypal &&
<div className="cart">
   <Payment price={selectCartItemsPrice} makeOrder={OnlineHandler} name={r_name} description={`Payment through PayPal for ${r_name}`} />

<Button onClick={()=>setOpenPaypal(false)} style={{zIndex:200}} className="width bottom center">Close</Button>

</div>
}

<Modal
 show={order}
 header="Cart Details"
 onCancel={()=>setOrder(false)}
 contentClass="place-item__modal-content"
 footerClass="place-item__modal-actions"
 footer={
   <React.Fragment>
     <Button onClick={()=>setOrder(false)} inverse>Close</Button>
   </React.Fragment>
 }
>
  <h1>Congratulations!!! Ordered Some Food.</h1>
  <h4>Your Food is being prepared!!!!..</h4>
</Modal>

<Modal
 show={s_cart}
 header="Cart Details"
 onCancel={hide_cart}
 contentClass="place-item__modal-content"
 footerClass="place-item__modal-actions"
 footer={
   <React.Fragment>
     <Button onClick={hide_cart} inverse>Close</Button>
     <Button onClick={payment==="online"?Paypal:handle} disabled={option}>Order</Button>
   </React.Fragment>
 }
>
  {o_load ? <div className="center bold"><h2>SENDING YOUR ORDER.... PLEASE WAIT!</h2></div> : <React.Fragment><CartItems /><div className="detail_pane">
<select onChange={changex} className="select" autoFocus={true}>
    <option value="null">
        Select Delivery Option
    </option>

    <option value="dine-in">
        Dine-In
    </option>

    <option value="take-away">
    Take-Away
    </option>
</select>
<select className="selectp" onChange={changep}>

    <option value="null">
        Select Payment Option
    </option>

    <option value="online">
        PayPal
    </option>

    <option value="offline">
    Offline Payment
    </option>
</select>
</div></React.Fragment> }

</Modal>

    </div>
    </Card>
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