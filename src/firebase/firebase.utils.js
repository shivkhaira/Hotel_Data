import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage";

export const config={
    apiKey: "AIzaSyAd6pZcd5DQzHFnLHPWmnHAwBrYQOIOBAU",
    authDomain: "crown-db-98bb2.firebaseapp.com",
    databaseURL: "https://crown-db-98bb2.firebaseio.com",
    projectId: "crown-db-98bb2",
    storageBucket: "crown-db-98bb2.appspot.com",
    messagingSenderId: "936171536662",
    appId: "1:936171536662:web:a0d901c659c64b32e4d037",
    measurementId: "G-9HY68328H7"
  }

firebase.initializeApp(config)
export const auth=firebase.auth()
export const firestore=firebase.firestore()
export const storage=firebase.storage()
export const createOrder=async(order)=>{
 
        await firestore.collection("orders").doc().set({
           ...order
          
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
   
   }

  export const getCategory=async()=>{
   
  await firestore.collection("data").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
          return doc
    });
    })
   
   }
   
   export const addCategory=async(id,category,currentUser,res_id)=>{
     
    await firestore.collection("data").doc(id).set({
      id,
       category,
       res_id,
      currentUser 
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}

export const addRest=async(res_id,name,currentUser)=>{
     
  await firestore.collection("Rest").doc(currentUser.id).set({
    res_id,
     name,
    currentUser 
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

}

export const addDish=async(id,category,currentUser,dish,price,url,res_id,catName,time)=>{
     
  await firestore.collection("Dish").doc(id).set({
    'id':id,
     'category_id':category,
    'currentUser':currentUser,
    'dish':dish,
    'price':price,
    'image':url,
    'res_id':res_id,
    'category':catName,
    'time':time
  
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

}

export const createUserProfileDocument=async(userAuth,data)=>{
   if(!userAuth) return;
  const userRef=firestore.doc(`users/${userAuth.uid}`)
  const snapShot=await userRef.get()
  

   if (!snapShot.exists)
   {
    const {displayName,email}=userAuth
    const createdAt=new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...data
      })
    } catch(error)
    {
      console.log("Error creating user",error.message)
    }
   }

   return userRef
}

const provider=new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})
export const signinWithGoogle=()=>auth.signInWithPopup(provider)

export default firebase