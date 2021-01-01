import React from 'react'
import CustomInput from '../input/customInput.component'
import Button from '../../shared/Button'
import {auth} from '../../firebase/firebase.utils'
import { useState } from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../redux/user/user.selector'
import { Redirect} from 'react-router-dom'
import Card from '../../shared/Card'
import LoadingSpinner from '../../component/LoadSpin/loading'
import './signin.css'

const Login=({currentUser})=>{

const [email,Setemail]=useState('')
const [password,Setpassword]=useState('')
const [loading,setLoading]=useState(false)
const [loginText,setText]=useState(0)

const handle=async e=>{
    setLoading(true)
    e.preventDefault();
   try{
      
     await auth.signInWithEmailAndPassword(email,password)       
       Setemail('')
       Setpassword('')
       setText('Login Successful.... Redirecting!!!!')
   }
  catch(error)
  {
      console.error(error)
      if(error.code==='auth/user-not-found')
      {
      alert("Username not")
      }
      else if(error.code==='auth/wrong-password')
      {
           alert("Check Your Password")
      }
      else 
      {
           console.log("Go")
      }
  }
  setLoading(false)
}


const handleChange=event=>{
    const {value,name}=event.target
  
    if (name==='email'){
        Setemail(value)
    }
    else{
        Setpassword(value)
    }
}

    return(
        <Card className="inmate">
               
{loading && <LoadingSpinner asOverlay />}
       <div>
           {
               
    currentUser?
   <Redirect to='/rest' />
    :

             <form onSubmit={handle} className="sing">
                Email: <CustomInput label="Email" type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required />
              
                Password: <CustomInput label="Password" type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required />
            <div className='buttons'>
                <Button type="submit">Sign In</Button>
            </div>
            <br />
            {loginText!==0 && <p style={{color:'green'}}>{loginText}</p>}
            </form>
        
           }
            </div>
       </Card>
    )
}

const maptoStatetoProps=()=>createStructuredSelector({
    currentUser:selectCurrentUser
})


export default connect(maptoStatetoProps)(Login)