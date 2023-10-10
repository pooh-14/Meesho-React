import React, { useContext, useEffect, useState } from "react";
import "../Components/CSS Files/YourProducts.css";
import { useNavigate } from "react-router-dom";
import api from "./ApiConfig";
import { AuthContext } from "../Context/AuthContext";

const YourProducts = () => {
  const { state } = useContext(AuthContext)
  const [allProducts, setAllProducts] = useState();
  const router = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
console.log(token);
      const response = await api.post("/get-your-products", { token });

      if (response.data.success) {
        setAllProducts(response.data.products);
      }
      } catch (error) {
        console.log(error)
      }
    }
    getProducts();
  }, []);

    useEffect(() => {
      if (state?.user?.role !== "Seller") {
          router('/')
      }
  }, [state])

  return (
    <div>
      <div id="yourscreen">Your Products</div>
      <div id="yourbody">
        {allProducts?.length ? (
          <div id="yourright">
            {allProducts.map((product) => (
              <div key={product._id}>
                <div>
                  <img src={product.image} />
                </div>

                <p>{product.name}</p>
                <span>Rs.{product.price}</span>
                <span>onwards</span>
                <p></p>

                <div>
                  <span>
                    <p>3.4</p>
                    <i class="fa-solid fa-star fa-xs"></i>
                  </span>
                  <p>27 Reviews</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Products!</div>
        )}
      </div>
    </div>
  );
};

export default YourProducts;
