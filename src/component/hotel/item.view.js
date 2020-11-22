import React from 'react'
import Detail from './item-detail.view'

const View=({item,search})=>{
 
   const filterd=item.filter(m=>
   
      m.dish.toLowerCase().includes(search.toLowerCase())
         
 )
   return(
      <div>
         {
filterd.map(item=>(
   
   <Detail key={item.id} item={item} />
  
))
}
</div>
   )
}


export default View