import React, { useState,useEffect } from 'react'
import CustomInput from '../input/customInput.component'
import CustomButton from '../button/button.component'
import {addCategory} from '../../firebase/firebase.utils'
import {firestore} from '../../firebase/firebase.utils'
import { Link } from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {selectCRest} from '../redux/rest/rest.selectors'

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
                    category:doc.data().category
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
        Setload(true)
        addCategory(cat,currentUser,rest.res_id)
        Setcat('')
    }
    return (
<div>
    {rest.name}
<CustomInput type="text" onChange={change} value={cat} name="category" />
         <CustomButton type="button" onClick={handle}>Add</CustomButton>
    <hr />
    {
     loading ?<p>Loading</p> : data.map(d=><p key={d.id}>{d.category}
     
     
     <Link to={`${'add/'+d.category}`}>Add</Link>  
     </p>)
  }
</div>
    )
}

const maptoporps=()=>createStructuredSelector({
    currentUser:selectCurrentUser,
    rest:selectCRest
})


export default connect(maptoporps)(Category)