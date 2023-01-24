import Navbar from './Navbar'
import Products from './Products'
import Banner from './Banner'
import React, { useEffect, useState } from 'react'
import {collection,getDoc,getDocs,query,where} from 'firebase/firestore'
import {auth,db} from '../firebaseConfig/firebaseConfig'
import shop from './bannerimg/shop.png'
import { async } from '@firebase/util'
export const Home = () => {
  function GetCurrentUser(){
    const [user,setUser] = useState('')
    const usersCollectionRef = collection(db,'users') 
    useEffect(()=>{
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          const getUsers = async()=>{
            const q = query(collection(db,'users'),where('uid','==' , userlogged.uid))
            //console.log(q);
             const data = await getDocs(q)
              setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
            
          }
          getUsers()
        }else{
          setUser(null)
        }
      })
    },[])
    return user
  }
  const loggeduser = GetCurrentUser()
  if(loggeduser){console.log(loggeduser[0].email)}
  return (
    <div>
      <Navbar/>
      <Banner/>
      <h1><Products/></h1>
      <h4>{loggeduser?loggeduser[0].email:'No User'}</h4>
        
    </div>
  )
}
