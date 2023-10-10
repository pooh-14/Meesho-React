import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../Components/CSS Files/Cart.css'
import { AuthContext } from "../Context/AuthContext";
import api from "./ApiConfig";

const Cart = () => {
  const [finalprice, setFinalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const { state } = useContext(AuthContext);

  console.log(state, "state here");

  useEffect(() => {
    async function getCartProduct() {
      try {
        const response = await api.post("/all-cart-products", {
          userId: state?.user?._id,
        });
        if (response.data.success) {
          setCartProducts(response.data.cartProducts);
        }
      } catch (error) {
        console.log(error, "error in cart");
      }
    }
    if (state?.user?._id) {
      getCartProduct();
    }
  }, [state, cartProducts]);

  console.log(cartProducts, "cartProducts here");

  const checkOut = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token,"token here")
      if (token) {
        console.log(token,"token here")
      try {
        const response = await api.post("/checkOut", {token});
        // console.log(response.data.success,"response here");
        if (response.data.success) {
          toast.success(response.data.message);
          setCartProducts([]);
          setFinalPrice([])
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  // }

  useEffect(() => {
    if (cartProducts.length) {
      var totalprice = 0;
      for (var i = 0; i < cartProducts.length; i++) {
        totalprice += cartProducts[i].price;
      }
      setFinalPrice(totalprice);
    }
  }, [cartProducts]);

  const removecartItem = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(token, "token here");
      const response = await api.post(
        "remove-cart-items",
        {
          productId,
          token,
        }
      );
      console.log(response,"data here");
      if (response.data.success) {
        toast.success("item removed succesfully");
        setCartProducts(response.data.user);
      } else {
        toast.error( response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div id='cascreen'>
        <div id="cabody">
        <div id="caleft">
          <div>
            <span>Cart</span>
            <span></span>
          </div>
          
          <div>
          {cartProducts.length >0  &&
          cartProducts?.map((pro) => (
          <div>
            <div>
              <div>
               <img src={pro.image}/>
              </div>
              <div>
                <p style={{fontWeight: "600"}}>{pro.name}</p>
                <p>Size: L   Qty: 1</p>
                <p>₹{pro.price}</p>
                <p onClick={()=>removecartItem(pro._id)} style={{fontWeight: "600", marginTop: "10px"}}>X REMOVE</p>
              </div>
              <div>
                <p>EDIT</p>
              </div>
            </div>
            <div>
               <p>Sold By: D.I</p>
               <p>Free Delivery</p>
            </div>
          </div>
          ))}
          </div>


        </div>
        <div id="caright">
            <div>
                <p>Price Details</p>
                <span>Total Product Price</span>
                <span>₹{finalprice + finalprice}</span>
            </div>
            <div>
                <span>Order Total</span>
                <span>₹{finalprice}</span>
                <p>Clicking on Continue will not deduct any money</p>
            </div>
            <div>
                <button onClick={checkOut}>Continue</button>
            </div>
            <div>
                <img src="https://images.meesho.com/images/marketing/1588578650850.png"/>
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Cart