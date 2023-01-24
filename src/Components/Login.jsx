import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault(); //ase sae hmra page refresh nhi ho gea
    signInWithEmailAndPassword(auth, email, password) //auth hmra firebase kea firebase configure vla folder sea connnect ho gyea gea
      .then((userCredential) => {
        setSuccessMsg("Logged In successfully You will be redirected to Home");
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 3000)
      }).catch((error)=>{
        const errorCode = error.code
        console.log(error.message)
        if(error.message =='Firebase: Error (auth/invalid-email).'){
          setErrorMsg("Please Fill all required fields")
        }
        if(error.message == "Firebase: Error(auth/user-not-found)."){
          setErrorMsg('Email not found')
        }
        if(error.message=='Firebase:Error (auth/wrong-password).'){
          setErrorMsg('Wrong Password')
        }
      })
  }
  return (
    <div>
      <Navbar />
      <div className="login">
        <form className="logform">
          {successMsg&&<><div>{successMsg}</div></>}
          {errorMsg&&<><div>{errorMsg}</div></>}
          <h2>Login</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              style={{ marginTop: 10 }}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              style={{ marginTop: 10 }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <span> Don,t have an account?</span>
          <Link to="/signup">Create Account</Link>
          <button onClick={handleLogin} className="btn btn-primary">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
