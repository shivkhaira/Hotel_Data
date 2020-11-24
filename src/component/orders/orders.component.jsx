import React,{useEffect} from 'react'
import {selectCRest} from '../redux/rest/rest.selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {firestore} from '../../firebase/firebase.utils'
import { useState } from 'react'
import Order from '../order/order.component'
import CustomButton from '../button/button.component'
import './orders.style.css'

const Orders=({rest})=>{
const [mid,setMida]=useState()
const [load,setLoad]=useState(true)


const comp=(e)=>{
    var o_id=e.target.name
    setLoad(true)
    var washingtonRef = firestore.collection("orders").doc(o_id)

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        pending: 1
    })
    .then(function() {
        //console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    

}
    useEffect(() => {
      
         let m=[]
         var docRef = firestore.collection("orders").where('res_id', '==', rest.res_id).where('pending','==',0)
         docRef.onSnapshot(function(querySnapshot) {
            
             querySnapshot.forEach(function(doc) {
                
                 m.push({
                     idx:doc.id,
                     price:doc.data().price,
                     data:doc.data().data, 
                     ...doc.data()                   
                 })
             })
         
     
             setMida(m)
             m=[]
             setLoad(false)
            
     
             
})
    },[load,rest.res_id])
return(
    <div>
      <h1>Pending Orders</h1>   
    {load?"Loading":
    
   
    
    mid.map(d=>{
       return(
           <div key={d.id}>
               <h2>Table No. :-{d.table} ---- {d.time}</h2>
           <Order x={d.data} />
           <h2>Total Price: {d.price}</h2>
           <h3>Total Quantity: {d.quantity}</h3>
           <CustomButton onClick={comp} name={d.idx}>Completed</CustomButton>
           <hr />   
           </div>
          
       )
        
        })
    }

    </div>
)
}


const maptoporps=()=>createStructuredSelector({
    rest:selectCRest
})
export default connect(maptoporps)(Orders)