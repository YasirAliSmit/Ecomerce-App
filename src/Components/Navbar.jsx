import { Link, useNavigate } from "react-router-dom";
import cart from "./assets/cart.jpg";
import user from "./assets/user.jpg";
import Cart from "./Cart";
import React, { useEffect, useState } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import shop from "./bannerimg/shop.png";
import "./Navbar.css";
const Navbar = () => {
  const navigate =  useNavigate()
  function handleLogout(){
auth.signOut().then(()=>{
  navigate('/login')
})
  }
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            //console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();
  return (
    <div>
      {!loggeduser && (
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/signup">
            <button>SignUp</button>
          </Link>
          <Link to="/login">
            <button>LogIn</button>
          </Link>

          <div style={{ display: "flex" }}>
            <Link to="/cart">
              <img className="cart-btn" src={cart} alt="cart" />
            </Link>
            <div className="int">0</div>
          </div>

          <Link to="/userprofile">
            <div className="cart-btn">
              <img className="cart-btn" src={user} alt="user" />
            </div>
          </Link>
        </nav>
      )}
    {loggeduser &&(<nav>
      <Link to="/">
            <button>Home</button>
          </Link>
     
      
      <div style={{ display: "flex" }}>
            <Link to="/cart">
              <img className="cart-btn" src={cart} alt="cart" />
            </Link>
            <div className="int">{loggeduser[0].cart}</div>
          </div>

          <Link to="/userprofile">
            <div className="cart-btn">
              <img className="cart-btn" src={user} alt="user" />
            </div>
          </Link>
          <button onClick={handleLogout}>Logout</button>
      
      
      </nav>)}
    </div>
  );
};

export default Navbar;

// <nav>

//   <Link to='/'><button>Home</button></Link>
//   <Link to='/signup'><button>SignUp</button></Link>
//   <Link to='/login'><button>LogIn</button></Link>
//   <div style={{display:'flex'}}>
//   <Link to='/cart'>
//     <img className='cart-btn' src={cart} alt="cart" />
//   </Link>
//     <div className='int'>0</div>
//   </div>
//   <Link to='/userprofile'>
//   <div className='cart-btn'>
//     <img className='cart-btn' src={user} alt="user" />
//   </div>
//   </Link>
//       </nav>
