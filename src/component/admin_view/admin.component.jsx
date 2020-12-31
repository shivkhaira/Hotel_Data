import React, { useState,useEffect } from 'react'
import Card from '../../shared/Card'
import {selectCRest} from '../redux/rest/rest.selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import LoadingSpinner from '../../component/LoadSpin/loading'
import {firestore} from '../../firebase/firebase.utils'
import Orders from '../../component/orders/orders.component'
import Category from '../../component/data/category.component'
import QrCode from 'react.qrcode.generator'
import Modal from '../../shared/Modal'
import Button from '../../shared/Button'

import './admin.style.css'
const Admin=props=>{

    
    const [order,setOrder]=useState(0)
    const [loading,setLoading]=useState(true)
    const [pend,setPend]=useState(0)
    const [showQR,setQR]=useState(false)
    const [tableN,setTable]=useState('')
    const [image,setImage]=useState(false)

const comp=(e)=>{
    var o_id=e.target.name
    setLoading(true)
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
        
        var docRef = firestore.collection("orders").where('res_id', '==', props.rest.res_id).where('pending','==',0).orderBy("time", "desc");
        docRef.onSnapshot(function(querySnapshot) {
            setPend(0)
            querySnapshot.forEach(function(doc) {
                setPend(pend=>pend+1)
                m.push({
                    idx:doc.id,
                    price:doc.data().price,
                    data:doc.data().data, 
                    ...doc.data()                   
                })
            })
        
    
            setOrder(m)
             m=[]
            
            setLoading(false)
           

    
            
})
   },[props.rest.res_id])

const genQR=(e)=>{
    setImage(false)
e.preventDefault()
if(tableN==='')
{
    alert("Enter Table Number")
   return 0
}
setImage(true)
}

    return(
        <React.Fragment>
                          <Modal
 show={showQR}
 header="Generate QR Code"
 onSubmit={genQR}
 onCancel={()=>setQR(false)}
 contentClass="place-item__modal-content"
 footerClass="place-item__modal-actions"
 footer={
   <React.Fragment>
     <Button onClick={()=>setQR(false)} type="button" inverse>Close</Button>
     <Button onClick={()=>{}} type="submit">Generate</Button>
   </React.Fragment>
 }
>
    <div className="add_dishi">
        {image && <QrCode value={`https://crown-db-98bb2.firebaseapp.com/view/${props.rest.res_id}/${tableN}`} size="300" />}
<input type="number" value={tableN} onChange={(e)=>setTable(e.target.value)} placeholder="Table Number" />
</div>
</Modal>
            {loading && <LoadingSpinner asOverlay />}
            <Card className="full_o">
                <div className="topd">
                <h2 className="rest_name">{props.name}</h2>
                <span><ul>
                <li><Button onClick={()=>setQR(true)}>QR Code</Button></li>
                <li><Button to="/logout" danger>Logout</Button></li>              
                 </ul></span>
                </div>
                <hr />
                <div className="pending">
                  <h2 className="phead">Pending Orders <p className="phead right"><i>{pend}</i></p></h2>
                  <hr />
                  <div>  
                {loading===false && (order.length===0 ? <p className="oder">NO ORDER</p>:
                
                (order.map(d=>{
                    return(
                        <Orders d={d} comp={comp} key={d.id} />
                    )
                }))
                
                )}
                </div>
                </div>

                <div className="pendingr">
                  <h2 className="phead">Menu</h2>
                  <hr />
                  <div>  
                    <Category />
                </div>
                </div>
            </Card>
        </React.Fragment>
    )
}

const maptoporps=()=>createStructuredSelector({
    rest:selectCRest
})
export default connect(maptoporps)(Admin)
