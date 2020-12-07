import {auth} from '../../firebase/firebase.utils'
import {Redirect} from 'react-router-dom'
import React from 'react'
import {selectCurrentUser} from '../redux/user/user.selector'
import { useEffect } from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

const Logout=({currentUser})=>{
    useEffect(()=>{
        auth.signOut()
        auth.signOut()
    },[])
  if(currentUser)
  {
      return(<h1>Loading</h1>)
  }
  else{
      return(
          <Redirect to='signin' />
      )
  }
}


const maptoStatetoProps=()=>createStructuredSelector({
    currentUser:selectCurrentUser
})

export default connect(maptoStatetoProps)(Logout)