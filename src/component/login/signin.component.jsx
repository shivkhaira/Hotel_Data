import React from 'react'
import CustomInput from '../input/customInput.component'
import CustomButton from '../button/button.component'
import {auth} from '../../firebase/firebase.utils'
import { useState } from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../redux/user/user.selector'
import {Link} from 'react-router-dom'

const Login=({currentUser})=>{

const [email,Setemail]=useState('')
const [password,Setpassword]=useState('')

const handle=async e=>{
    e.preventDefault();
   try{
      
     await auth.signInWithEmailAndPassword(email,password)       
       Setemail('')
       Setpassword('')
   }
  catch(error)
  {
      console.error(error)
      if(error.code==='auth/user-not-found')
      {
       console.log("Username not")
      }
      else if(error.code==='auth/wrong-password')
      {
           console.log("Passowrd w")
      }
      else 
      {
           console.log("Go")
      }
  }
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
       <div>
           {
    currentUser?
    <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
    :
    <Link to='signin'>SIGN IN</Link>
}
             <form onSubmit={handle}>
                <CustomInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
              
                <CustomInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
            <div className='buttons'>
                <CustomButton type="submit">Sign In</CustomButton>
            </div>
            </form>
       </div>
    )
}

const maptoStatetoProps=(state)=>createStructuredSelector({
    currentUser:selectCurrentUser
})


export default connect(maptoStatetoProps)(Login)