import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas'
import LoadingSpinner from '../LoadSpin/loading'

const QR=props=>{

const [link,setLink]=useState('')
const [image,setImage]=useState(0)
const [loading,setLoading]=useState(false)

useEffect(()=>{
    setLink(props.id+"/"+props.tid)
    setImage(0)
    
},[props.id,props.tid])


const set=()=>{
    setLoading(true)
    print()
}
const print=()=>{
    
    html2canvas(document.querySelector("#capture")).then(canvas => {
        
       setImage(canvas.toDataURL())
      setLoading(false)
    });
  
}

    return(
        <React.Fragment>
        {loading && <LoadingSpinner asOverlay />}
        <div id="capture">
       {image===0 && <div className="mobile"><QRCode key={props.tid} value={`https://crown-db-98bb2.firebaseapp.com/view/${link}`} level="L" size={200} />
       <p>Table No. {props.tid}</p></div>
       }
       {image!==0 && <img className="qr_code" src={image} alt="noopener noreferrer" />}
       </div>
       {image===0 && <button onClick={set}>Save</button>}
       </React.Fragment>
    )
}

export default QR