import React,{useState} from 'react'
import CustomInput from '../input/customInput.component'
import CustomButon from '../button/button.component'
import {storage,addDish} from '../../firebase/firebase.utils'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {selectCurrentUser} from '../redux/user/user.selector'
import {selectCRest} from '../redux/rest/rest.selectors'

const Data=(props)=>{

    const [image,Setimage]=useState()
    const [url,Seturl]=useState()
    const [progress,Setprogress]=useState(0)
    const [dish,Setdish]=useState('')
    const [price,Setprice]=useState(0)
    const [cat]=useState(props.match.params.name)
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

      const makeid=(length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
  const handleUpload = async(e) => {
    e.preventDefault()
    let id=makeid(8)
    let image_name=makeid(10)+image.name
    let uploadTask = storage.ref(`images/${image_name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        Setprogress(progress);
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
          .then(url => {
            Seturl(url);
            addDish(id,cat,props.currentUser,dish,price,url,props.rest.res_id)
          });
      }

    
    );
    
  };



    return(
        <form onSubmit={handleUpload} method="post">
            <CustomInput type="text" name="category" value={cat} disabled /><br />
            <CustomInput type="text" name="dish" onChange={handleChange} value={dish} placeholder="Dish" /><br />
            <CustomInput type="number" name="price" onChange={handleChange} value={price} placeholder="Price" /><br />
            <CustomInput type="file" name="image" onChange={handleChange} /><br />
            <CustomButon type="submit">Save</CustomButon>
            <p>{url}</p>
            <p>{progress===100?"Done":"Wait"}</p>
                    </form>

        )
}


const maptoporps=()=>createStructuredSelector({
  currentUser:selectCurrentUser,
  rest:selectCRest
})

export default connect(maptoporps)(Data)