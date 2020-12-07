import React from 'react'
import {Link} from 'react-router-dom'
const Loading=()=>(
    <div><h1>Loading</h1>
    <Link to='login'>Login</Link><br />
    <Link to='logout'>Logout</Link></div>
)
export default Loading