import React from 'react'

const CustomButon=({children,...other})=>(
  
<button {...other}>{children}</button>
    
)

export default CustomButon