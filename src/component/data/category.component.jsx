import React, { useState,useEffect } from 'react'
import {addCategory} from '../../firebase/firebase.utils'
import {firestore} from '../../firebase/firebase.utils'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {selectCRest} from '../redux/rest/rest.selectors'
import { v4 as uuidv4 } from 'uuid'
import LoadingSpinner from '../LoadSpin/loading'
import Button from '../../shared/Button'
import Menu from '../../component/menu/menu.component';


const Category=({currentUser,rest})=>{
    const[cat,Setcat]=useState('')
    const [data,set]=useState()
    const [loading,Setload]=useState(true)

    useEffect(() => {
        let m=[]
        var docRef = firestore.collection("data").where("currentUser", "==", currentUser)
        docRef.get().then(function(querySnapshot) {
           
            querySnapshot.forEach(function(doc) {
                m.push({
                    id:doc.id,
                    category:doc.data().category,
                    dish_id:doc.data().id
                })
            });
            set(m)
            Setload(false)
        })
    },[currentUser,loading])

    const change=(e)=>{
        Setcat(e.target.value)
    }
    const handle=()=>{
        var idp=uuidv4()
        Setload(true)
        addCategory(idp,cat,currentUser,rest.res_id)
        Setcat('')
    }
  
    return (
<div>
    {loading && <LoadingSpinner asOverlay />}
    <div style={{textAlign:'center'}}>
  <label htmlFor="cat_name" style={{display:'inline',fontWeight:'bold'}}>Add Category: <input type="text" placeholder="Category Name" id="cat_name" onChange={change} className="form-control add_i" value={cat} name="category" />&nbsp;
  <Button type="button" onClick={handle} className="add_bb" disabled={cat==='' ? true : false}>Add</Button>
</label>
        
         </div>
    <hr />
    {
     loading ?<p>Loading</p> : data.map(d=><Menu key={d.id} d={d} />)
  }
</div>
    )
}

const maptoporps=()=>createStructuredSelector({
    currentUser:selectCurrentUser,
    rest:selectCRest
})


export default connect(maptoporps)(Category)