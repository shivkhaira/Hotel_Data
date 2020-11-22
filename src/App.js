import React,{useEffect} from 'react';
import { Redirect, Route,Switch } from 'react-router';
import HotelView from './component/hotel/hotel.component'
import Category from './component/data/category.component'
import Data from './component/data/data.component'
import List from './component/list/list.component'
import Login from './component/login/signin.component'
import {connect} from 'react-redux'
import {selectCurrentUser} from './component/redux/user/user.selector'
import {setCurrentUser} from './component/redux/user/users.action'
import {createStructuredSelector} from 'reselect'
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import Logout from './component/login/logout'
import Rest from './component/rest/rest.component'
import Orders from './component/orders/orders.component'

function App(props) {


  var unsubscribeFromAuth=null
  const {setCurrentUser}=props

useEffect(() => {
    
    const unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
        if (userAuth)
        {
            const userRef=await createUserProfileDocument(userAuth)
            userRef.onSnapshot(snapShot=>{
                setCurrentUser({
                  
                        id:snapShot.id,
                        ...snapShot.data()
                    })
            
            })
          
        }
        else
        {
           setCurrentUser(userAuth)
          
        }
    })
    
    return()=>{
      unsubscribeFromAuth()
    }
    
},[unsubscribeFromAuth,setCurrentUser])




  return (
   
    <Switch>
      <Route exact path="/" render={()=>props.currentUser ? (<Redirect to='/rest' />) :( <Login /> ) } />
      <Route path="/add" exact component={Category} />
      <Route path="/list" exact component={List} />
      <Route path="/view/:res_id/:t_id" exact component={HotelView} />
      <Route path="/add/:name" exact component={Data} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/rest" exact render={()=>props.currentUser ? <Rest /> :( <Login /> ) } />
      <Route path="/signin" exact render={()=>props.currentUser ? (<Redirect to='/add' />) :( <Login /> ) } />
      <Route path="/view_orders" exact render={()=>props.currentUser ? (<Orders />) :( <Redirect to='/signin' /> ) } />
   </Switch>

  );
}

const mapStatetoProps=({user})=>createStructuredSelector({
  currentUser:selectCurrentUser
})

const maptoDispatchtoProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStatetoProps,maptoDispatchtoProps)(App);
