import React, { useContext, useEffect, useState } from "react";
import '../Components/CSS Files/Login.css'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {

  const [userData, setUserData] = useState({ email: "", password: "" })

    const { state, dispatch } = useContext(AuthContext)
    const router = useNavigate()

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            const response = await axios.post("http://localhost:8000/login", { userData });
            if (response.data.success) {
                dispatch({
                    type: 'LOGIN',
                    payload: response.data.user
                })
                localStorage.setItem("token", JSON.stringify(response.data.token))
                setUserData({ email: "", password: "" })
                router('/')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }
    // console.log(userData, "userData")

    useEffect(() => {
        if (state?.user?.name) {
            router('/')
        }
    }, [state])


  return (
    <div id="logscreen">
      <div id="logbody">
        <div>
          <img src="https://images.meesho.com/images/marketing/1661417516766.webp" />
        </div>
        <div>
          <p>Log In to view your profile</p>
        </div>
        <div id="logform">
          <form
          onSubmit={handleSubmit}
          >
            <label>Enter your Email ID :</label>
            <br />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <br />
            <label>Enter your Password :</label>
            <br />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <br />
            <button>LOGIN</button>
          </form>
        </div>
        <div>
      <span>Do not have an Account?</span>
        <span onClick={()=>router('/register')}>Register</span>
      </div>
      
      <div>
        <p>By continuing, you agree to Meesho's</p>
        <span>Terms and Conditions</span>
        <span>and </span>
        <span>Privacy Policy</span>
      </div>
    </div>
        
      </div>
      
  );
};

export default Login;
