import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import './Navbar.css'
const Signup = () => {
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [sucessMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
        const intialcartvalue = 0;
        console.log(user);
        addDoc(collection(db, "users"), {
          username: username,
          phonenumber: phonenumber,
          email: email,
          password: password,
          address: address,
          cart:intialcartvalue,
          uid:user.uid
        }).then(()=>{
          setSuccessMsg('New user added successfully,You will now be automatically redirected to login page.')
          setUsername('')
          setPhonenumber('')
          setEmail('')
          setPassword('')
          setAddress('')
          setErrorMsg('')
          setTimeout(() => {
            setSuccessMsg('')
            navigate('/login')
          }, 4000);
        }).catch((error)=>{setErrorMsg(error.message)})
      }
    ).catch((error)=>{
      if(error.message == 'Firebase: Error (auth/invalid-email).'){
        setErrorMsg('Please fill all required fields')
      }
      if(error.message == 'Firebase: Error (auth/invalid-email-already-in-use).'){
        setErrorMsg('User already exists')
      }
    })
  };
  return (
    <>
    
    <Navbar />
    <div className="contain">
      <form className="sigup-container" onSubmit={handleSubmit}>
        <h5>Create Account</h5>
        {sucessMsg&&<><div>{sucessMsg}</div></>}{
          errorMsg&&<><div>{errorMsg}</div></>
        }
        <label>Your Name</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
        />
        <label>Your Mubile Number</label>
        <input
          type="tel"
          onChange={(e) => setPhonenumber(e.target.value)}
          placeholder="Your Name"
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Name"
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your Name"
        />
        <label>Address</label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Your Name"
        />
        <button type="submit">Sign Up</button>
        <Link to="/login">Sign In</Link>
        <div>
          <span> Already have an account?</span>
        </div>
      </form>
    </div>
</>  );
};

export default Signup;
