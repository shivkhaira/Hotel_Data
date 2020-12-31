import React,{useState} from 'react'
import CustomInput from '../input/customInput.component'
import Button from '../../shared/Button'
import {storage,EditDish,EditDishi} from '../../firebase/firebase.utils'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {selectCRest} from '../redux/rest/rest.selectors'
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '../LoadSpin/loading'
import firebase from '../../firebase/firebase.utils'

const EditData=(props)=>{
    const [image,Setimage]=useState(0)
    
    const [upload,setUpload]=useState(false)
    const [dish,Setdish]=useState(props.dish.dish)
    const [price,Setprice]=useState(props.dish.price)
    const [loading,setLoading]=useState(false)

   const handleChange = e => {
     if (e.target.name==='image') {
        if (e.target.files[0]) {
          let image = e.target.files[0];
          Setimage(() => (image));
       
        }
      }
      else if (e.target.name==='dish')
      {
     
        Setdish(e.target.value)
      }
      else if (e.target.name==='price')
      {
        Setprice(e.target.value)
      }


      }

  


     
  const handleUpload = async(e) => {
   
    e.preventDefault()

    if (dish==='' || price ==='')
    {
      alert('Missing Values')
      return 0
    }
   
    if (image!==0)
    {
    let image_name=uuidv4()+image.name
    let uploadTask = storage.ref(`images/${image_name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        //const progress = Math.round(
         // (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       // );
       setLoading(true)
       setUpload(false)
       
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image_name)
          .getDownloadURL()
          .then(urlx => {
           
            var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
            EditDish(props.dish.id,dish,price,urlx,myTimestamp).then(()=>{
              setLoading(false)
              setUpload(true)
              Setimage(0)
            })
           
          });
      }

    
    );
    }
    else
    {
      setLoading(true)
      setUpload(false)
      try{
        var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
      await EditDishi(props.dish.id,dish,price,myTimestamp)
        setUpload(true)
        setLoading(false)
      }
      catch(err)
      {
        console.log(err)
      }
    }
   
  };



    return(
      <React.Fragment>
        {loading && <LoadingSpinner asOverlay />}
      
            <CustomInput type="text" name="dish" onChange={handleChange} value={dish} placeholder="Dish" /><br />
            <CustomInput type="number" name="price" onChange={(e)=> Setprice(e.target.value)} value={price} placeholder="Price" /><br />
            <CustomInput type="file" name="image" onChange={handleChange} /><br />
            <Button type="submit" onClick={handleUpload}>Save</Button>
          
            <p>{upload && "Edited Successfully"}</p>
    
      </React.Fragment>

        )
    }

 

const maptoporps=()=>createStructuredSelector({
  currentUser:selectCurrentUser,
  rest:selectCRest
})

export default connect(maptoporps)(EditData)