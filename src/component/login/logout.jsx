import React from 'react'
import Login from './signin.component'
import {auth} from '../../firebase/firebase.utils'
const Logout=()=>{
    auth.signOut();
    return(
        <Login />
    )
}

export default Logout