import React, { useState,useEffect, useCallback } from 'react'
import {firestore} from '../../firebase/firebase.utils'
import Dish from '../../component/dish/dish.component'
import Modal from '../../shared/Modal'
import Button from '../../shared/Button'
import Data from '../data/data.component'

const Menu=({d})=>{
  
    
   
    const [collapse,setCollapse]=useState(true)
    const [dish,setDish]=useState()
    const [loading,setLoading]=useState(true)
    const [add_data,setAdd_data]=useState({
        category:null,
        category_id:null
    })
    const [showAdd,setAdd]=useState(false)

    useEffect(() => {
        let m=[]

        firestore.collection("Dish").where("category_id", "==", d.dish_id)
    .onSnapshot(function(querySnapshot) {
    
        querySnapshot.forEach(function(doc) {
            m.push({
                did:doc.id,
                ...doc.data()
            })
        });
     
            setDish(m)
            setLoading(false)
            m=[]
       
    });

        
      
    },[loading,d.dish_id])

     const add_info=useCallback((id,cat)=>{
        setAdd_data({
            category_id:id,
            category:cat
        })
        setAdd(true)
     },[])
            return(
                <React.Fragment>
                    <Modal
 show={showAdd}
 header={`Add a Dish in ${add_data.category}`}
 onCancel={()=>console.log("S")}
 contentClass="place-item__modal-content"
 footerClass="place-item__modal-actions"
 footer={
   <React.Fragment>
     <Button onClick={()=>setAdd(false)} inverse>Close</Button>
    
   </React.Fragment>
 }
>
    <div className="add_dishi">
<Data cat={add_data.category} cat_id={add_data.category_id} />
</div>
</Modal>
                <div className="e_classs">
                   
                    <div className="titless"><h3 onClick={()=>setCollapse(c=>!c)} style={{cursor:'pointer'}} className="tid">{d.category}</h3> <div onClick={()=>add_info(d.id,d.category)} id={d.id} name={d.category} className="small_sub">+</div></div>
                    
                    {!collapse &&
                    <div>
                {loading ? "Loading":(
              dish.map(u=><Dish key={u.id} d={u} />)
                )}
                </div>}
                
                <hr />   
                </div>
                </React.Fragment>
            )
            }

export default Menu