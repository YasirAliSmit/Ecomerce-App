
import './App.css';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import {Home} from './Components/Home'
import Login  from './Components/Login'
import Navbar from './Components/Navbar'
import Cart from './Components/Cart';
import PgFoF from './Components/PgFoF'
import Signup from './Components/Signup'
import UserProfile from './Components/UserProfile';
function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route exact path='/' element={<Home/>}/>
  <Route exact path='/home' element={<Home/>}/>
  <Route exact path='/login' element={<Login/>}/>
  <Route exact path='/signup' element={<Signup/>}/>
  <Route exact path='/cart' element={<Cart/>}/>
  <Route exact path='/userprofile' element={<UserProfile/>}/>
  <Route exact path='*' element={<PgFoF/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
