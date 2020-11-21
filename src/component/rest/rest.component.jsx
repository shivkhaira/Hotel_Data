import React,{useEffect} from 'react'
import CustomInput from '../input/customInput.component'
import CustomButton from '../button/button.component'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {firestore,addRest} from '../../firebase/firebase.utils'
import { useState } from 'react'
import {setRest} from '../redux/rest/rest.action'
import { Link } from 'react-router-dom'

const Rest=({currentUser,setRest})=>{

  
const[r,setR]=useState(0)
const [name,setName]=useState('')
const [c,setC]=useState(0)
    const handle=(e)=>{
        setName(e.target.value)
    }

    const click=()=>{
        if (name==='')
        {
            alert("Empty Name")
          
        }
        else
        {
            var id=makeid(6)
            addRest(id,name,currentUser)
            setC(1)
        }
    }
    
    const makeid=(length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    useEffect(() => {
    
        var docRef = firestore.collection("Rest").where("currentUser", "==", currentUser)
        docRef.get().then(function(querySnapshot) {
           
            querySnapshot.forEach(function(doc) {
               setR(doc.data().name)
               setRest(doc.data())
        })
    })
        
    },[currentUser,c,setRest])


if (r===0)
{
    return(
        <div>
      <CustomInput type="text" name="name" onChange={handle} placeholder="Restaurant Name" value={name} />
      <CustomButton type="button" name="name" onClick={click} >Submit</CustomButton>
        </div>
    )
}
else
{
    return(
        <div><Link to="/add">{r}</Link><br />
        <Link to='/view_orders'>View Orders</Link></div>
    )
}
}
const maptoporps=()=>createStructuredSelector({
    currentUser:selectCurrentUser
})
const maptoDispatchtoProps=dispatch=>({
    setRest:rest=>dispatch(setRest(rest))
  })
export default connect(maptoporps,maptoDispatchtoProps)(Rest)