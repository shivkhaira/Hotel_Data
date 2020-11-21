import React, { useState,useEffect } from 'react'
import {firestore} from '../../firebase/firebase.utils'
const List=()=>{
    
    const [data,set]=useState()
    const [loading,Setload]=useState(true)
    useEffect(() => {
        let m=[]
        var docRef = firestore.collection("data").where("category", "==", 'Fish')
        docRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            
                m.push({
                    id:doc.id,
                    category:doc.data().category
                })
            });
            set(m)
            Setload(false)
        })
    },[])
        
 
    return(
<div>
    <h1>LIST</h1>
  {
     loading ?<p>Loading</p> : data.map(d=><p key={d.id}>{d.category}</p>)
  }
  </div>
    
    )
}

export default List