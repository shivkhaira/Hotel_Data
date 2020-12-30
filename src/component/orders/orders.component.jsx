import React, { useEffect, useState } from 'react'
import Order from '../order/order.component'
import CustomButton from '../button/button.component'
import './orders.style.css'


const Orders=({d,comp})=>{
   
    const [minute,setMinute]=useState(0)
    const [hour,setHour]=useState(0)
 
   
   
    useEffect(()=>{
       
        
        let interval = setInterval(() =>{
            
            var Christmas = new Date();
            var today = new Date(d.time.seconds*1000);
            var diffMs = (Christmas - today); // milliseconds between now & Christmas
 
            var diffDays = Math.floor(diffMs / 86400000); // days
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
           
            setMinute(diffMins)
           
            setHour(24*diffDays+diffHrs)
        }, 1000)
       
        return () => clearInterval(interval)
        
    },[d.time])

   
    const [collapse,setCollapse]=useState(true)
     
            return(
                <div key={d.id} onClick={()=>setCollapse(c=>!c)} className="e_class">
                   
                    <div className="titles"><p className="tid">Table No. {d.table}</p>  <p className="tidi">{hour!==0&& hour+ " hour "}{hour===0 && minute===0?"Just Ordered":minute+" minutes"}</p></div>
                    {!collapse &&
                    <div>
                <Order x={d.data} />
                <h2>Total Price: {d.price}</h2>
                <h3>Total Quantity: {d.quantity}</h3>
                <CustomButton onClick={comp} name={d.idx}>Completed</CustomButton>
                </div>
                }
                <hr />   
                </div>
               
            )
            }

export default Orders