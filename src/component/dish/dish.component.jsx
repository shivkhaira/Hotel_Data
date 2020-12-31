import React, { useState } from 'react'
import Button from '../../shared/Button'
import Modal from '../../shared/Modal'
import EditData from '.././data/editdata.component'
import {firestore} from '../../firebase/firebase.utils'
import LoadingSpinner from '../../component/LoadSpin/loading'

const Dish=({d})=>{

    const [showedit,setEdit]=useState(false)
    const [showdel,setDel]=useState(false)
    const [loading,setLoading]=useState(false)
    const deleted=()=>{
        setLoading(true)
        firestore.collection("Dish").doc(d.id).delete().then(function() {
          
        }).catch(function(error) {
            console.error("Error removing document: ", error);
           
        });
    }
    return(
        <React.Fragment>
{loading && <LoadingSpinner asOverlay />}
                   <Modal
 show={showdel}
 header={`Are you sure ? Delete ${d.dish}`}
 onCancel={()=>{}}
 contentClass="place-item__modal-content"
 footerClass="place-item__modal-actions"
 footer={
   <React.Fragment>
     <Button onClick={()=>setDel(false)} inverse>Close</Button>
     <Button onClick={deleted} >Confirm</Button>
   </React.Fragment>
 }
>
    <div className="add_dishi">
<b>Do want to continue...?</b>
</div>
</Modal>

             <Modal
 show={showedit}
 header={`Edit ${d.dish}`}
 onCancel={()=>{}}
 contentClass="place-item__modal-content"
 footerClass="place-item__modal-actions"
 footer={
   <React.Fragment>
     <Button onClick={()=>setEdit(false)} inverse>Close</Button>
    
   </React.Fragment>
 }
>
    <div className="add_dishi">
<EditData dish={d} />
</div>
</Modal>
       <div className="item_e">
          <div className="item_e1">
              <h3>{d.dish}</h3> 
              <h4><b>Price: {d.price}</b></h4>
              <Button onClick={()=>setEdit(true)}>Edit</Button> <Button onClick={()=>setDel(true)} inverse>Delete</Button>
          </div>
           <img src={d.image} width="100px" height="100px" className="menu_image" alt={d.dish} />
       </div>
       </React.Fragment>
    )
}

export default Dish