import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import AllProducts from './Components/AllProducts';
import SingleProduct from './Components/SingleProduct';
import Cart from './Components/Cart';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
import YourProducts from './Components/YourProducts';

function App() {
  const { state } = useContext(AuthContext);
  // console.log(state?.user, "- frontenduser")
  return (
  
    <div>
      <Navbar/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/allproducts' element={<AllProducts/>}/>
      <Route exact path='/yourproducts' element={<YourProducts/>}/>
      <Route exact path='/singleproduct/:id' element={<SingleProduct/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
