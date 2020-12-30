import React,{useEffect, useState} from 'react';
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
import Loading from './component/loading/loading.component'
import Customer from './component/customer/customer.component'
import {selectCustomer} from './component/redux/customer/cust.selectors'
import LoadingSpinner from './component/LoadSpin/loading'
import {selectCRest} from './component/redux/rest/rest.selectors'


function App(props) {


  var unsubscribeFromAuth=null
  const {setCurrentUser,selectCustomer}=props
  const [loading,setLoading]=useState(false)
useEffect(() => {
  
    const unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
        setLoading(true)
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
        setLoading(false)
    })
    
    return()=>{
      unsubscribeFromAuth()
    }
    
},[unsubscribeFromAuth,setCurrentUser])



  return (
   
    <Switch>
      <Route exact path="/" render={()=>props.currentUser ? (<Redirect to='/rest' />) :( <React.Fragment>{loading && <LoadingSpinner asOverlay />} <Login /></React.Fragment> ) } />
      <Route path="/add" exact component={Category} />
      <Route path="/load" exact component={Loading} />
      <Route path="/list" exact component={List} />

 
  <Route path="/view/:res_id/:t_id/done" exact >{selectCustomer?<HotelView />: <Customer />}</Route>
 
  <Route path="/view/:res_id/:t_id" exact ><Customer /></Route>
    
      <Route path="/add/:name" exact component={Data} />
      <Route path="/logout" exact render={()=>props.currentUser ? <Logout /> :( <Redirect to='/login' /> )} />
      <Route path="/rest" exact render={()=>props.currentUser ? <Rest /> :(<Redirect to='/login' /> ) } />
      <Route path="/login" exact render={()=>props.currentUser ? (<Redirect to='/rest' />) :( <Login /> ) } />
      <Route path="/view_orders" exact render={()=>props.currentUser ? (<Orders />) :( <Redirect to='/login' /> ) } />
   
   </Switch>

  );
}

const mapStatetoProps=()=>createStructuredSelector({
  currentUser:selectCurrentUser,
  selectCustomer:selectCustomer,
  selectCRest:selectCRest
})

const maptoDispatchtoProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStatetoProps,maptoDispatchtoProps)(App);
