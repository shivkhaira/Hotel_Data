import React,{useEffect} from 'react'
import CustomInput from '../input/customInput.component'
import CustomButton from '../button/button.component'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {firestore,addRest} from '../../firebase/firebase.utils'
import { useState } from 'react'
import {setRest} from '../redux/rest/rest.action'
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '../LoadSpin/loading'
import Card from '../../shared/Card'
import './res.style.css'
import Admin from '../admin_view/admin.component'

const Rest=({currentUser,setRest})=>{

  
const[r,setR]=useState('')
const [exist,setExist]=useState(5)
const [name,setName]=useState('')
const [c,setC]=useState(0)
const [loading,setLoading]=useState(true)

    const handle=(e)=>{
        setName(e.target.value)
    }

    const click=async()=>{
        setLoading(true)
        if (name==='')
        {
            alert("Empty Name")
          
        }
        else
        {
            var id=uuidv4()
            await addRest(id,name,currentUser)
            setC(1)
        }
        setLoading(false)
    }
    

    useEffect(() => {
      
        setLoading(true)
        var docRef = firestore.collection("Rest").doc(currentUser.id);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                
                setR(doc.data().name)
                setRest(doc.data())
                setExist(true)
            } else {
                // doc.data() will be undefined in this case
                setExist(false)
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    setLoading(false)

    },[currentUser,c,setRest])

if (exist===5)
{
    return(
        <LoadingSpinner asOverlay />
    )
}

  
    return(
        
        <React.Fragment>
            {!exist?
             <React.Fragment>
         <Card className="wholef"> 
        <h1 className="center">Add a Restaraunt</h1>
      <CustomInput type="text" name="name" className="res_name" onChange={handle} placeholder="Restaurant Name" value={name} required/><br />
      <CustomButton type="button" name="name" className="res_button" onClick={click} >Submit</CustomButton>
        </Card>
        {loading && <LoadingSpinner asOverlay />}
        </React.Fragment>
            :<Admin name={r} />}
        </React.Fragment>
    )


}
const maptoporps=()=>createStructuredSelector({
    currentUser:selectCurrentUser
})
const maptoDispatchtoProps=dispatch=>({
    setRest:rest=>dispatch(setRest(rest))
  })
export default connect(maptoporps,maptoDispatchtoProps)(Rest)