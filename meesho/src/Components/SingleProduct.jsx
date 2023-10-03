import React, { useContext, useEffect, useState } from 'react'
import '../Components/CSS Files/SingleProduct.css'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import api from "./ApiConfig";

const SingleProduct = () => {

  
  const [userData, setUserData] = useState({});
  const [allowUpdate, setAllowUpdate] = useState(false);
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [singleProductData, setSingleProductData] = useState({});

  useEffect(() => {
    if (id) {
        async function getSingleProductData() {
            try {
                const response = await api.post('/get-single-product-data', { productId: id })
                if (response.data.success) {
                    setSingleProductData(response.data.product)
                }
            } catch (error) {
              console.log(error);
            }
        }
        getSingleProductData()
    }
}, [id])

  console.log(singleProductData, "singleProductData");

  async function addToCart(productId) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.post("/add-cart", { productId},{token});
  
      if (response.data.success) {
        toast.success("Product added successfully to cart!!");
      } else {
        toast.error("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error")
    }
  }






  function uptoDate() {
    setAllowUpdate(true);
  }

  function closeUpate() {
    setAllowUpdate(false);
  }

  function handleChange(e) {
    setSingleProductData({ ...singleProductData, [e.target.name]: e.target.value });
  }
  function selectRole(e) {
    setSingleProductData({ ...singleProductData, ["category"]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const allProduct = JSON.parse(localStorage.getItem("Products"));
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].id === id) {
        allProduct[i].image = singleProductData.image;
        allProduct[i].name = singleProductData.name;
        allProduct[i].price = singleProductData.price;
        allProduct[i].category = singleProductData.category;
        singleProductData.image = singleProductData.image;
        singleProductData.name = singleProductData.name;
        singleProductData.price = singleProductData.price;
        singleProductData.category = singleProductData.category;

        localStorage.setItem("Products", JSON.stringify(allProduct));
        setSingleProductData({ name: "", price: "", image: "", category: "Other" });
        toast.success("Product Updated!");
      }
    }
  }


  return (
    <div>
        <div id="sgscreen">

        {allowUpdate ? (
        <div id='uppop'>
          <div >
          <i onClick={closeUpate}  class="fa-solid fa-xmark fa-xl"></i>
            <form onSubmit={handleSubmit}>
                <label>Product Name:</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={singleProductData.name}
                  onChange={handleChange}
                />
                <br />

                <label>Product Price :</label>
                <br />
                <input
                  type="number"
                  name="price"
                  value={singleProductData.price}
                  onChange={handleChange}
                />
                <br />
                <label>Product Category :</label>
                <br />
                <select
                  onChange={selectRole}
                >
                  <option value="Other">Other</option>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Kids">Kids</option>
                  <option value="Electronics">Electronics</option>
                </select>
                <br />
                <label>Product Image :</label>
                <br />
                <input
                  type="text"
                  name="image"
                  value={singleProductData.image}
                  onChange={handleChange}
                />
                <br />
                <button onMouseLeave={closeUpate}>Update Product</button>
            </form>
          </div>
        </div>
       ) : null} 
 
 <div id="sgbody">
   <div id="sgleft">
     <img
       src={singleProductData.image}
     />
     <img
       src={singleProductData.image}
     />
     <img
       src={singleProductData.image}
     />
   </div>
   <div id="sgbet">
     <div>
       <img
         src={singleProductData.image}
       />
     </div>  

     {userData?.role !== "Buyer" ?
     <div>
       <button onClick={uptoDate}>Update Product</button>
       <button>Delete</button>
     </div>
        :
     <div>
       <button onClick={addToCart}>Add to Cart</button>
      <button>Buy Now</button>
     </div>}


     <div>
       <p>3 Similar Products</p>
       <img
         src="https://images.meesho.com/images/products/256665222/f4o2w_128.webp"
       />
       <img
         src="https://images.meesho.com/images/products/256665224/h8qbs_128.webp"
       />
       <img
         src="https://images.meesho.com/images/products/256665228/xefee_128.webp"
       />
     </div>
   </div>
   <div id="sgright">
     <div>
       <p>{singleProductData.name}</p>
       <p>₹{singleProductData.price}</p>
       <div>
         <span>
           <p>4.0</p>
           <i class="fa-solid fa-star fa-xs"></i>
         </span>
         <p>273 Ratings, 90 Reviews</p>
       </div>
       <p>Free Delivery</p>
     </div>
     <div>
       <h4>Select Size</h4>
       <div>
         <p>S</p>
         <p>M</p>
         <p>L</p>
         <p>XL</p>
       </div>
     </div>
     <div>
       <h4>Product Details</h4>
       <p>Name : {singleProductData.name}</p>
       <p>Fabric : Cotton</p>
       <p>Sleeve Length : NA</p>
       <p>Pattern : Solid</p>
       <p>Net Quantity (N) : 1</p>
       <p>Sizes :</p>
       <p>S, M, L, XL</p>
       <p>Country of Origin : India</p>
       <p>More Information</p>
     </div>
     <div>
       <h4>Sold By</h4>
       <div>
         <img src="https://images.meesho.com/images/pow/shop_100.webp" />
         <p>D.I</p>
         <button>View Shop</button>
       </div>
       <div>
         <span>
           <span>
             <p>4.0</p>
             <i class="fa-solid fa-star fa-xs"></i>
           </span>
           <p>20,701 Ratings</p>
         </span>
         <span>
           <p>2,764</p>
           <p>Followers</p>
         </span>
         <span>
           <p>468</p>
           <p>Products</p>
         </span>
       </div>
     </div>
     <div>
       <h4>Check Delivery Date</h4>
       <input placeholder="Enter Delivery Pincode" />
       <p>Enter Pincode for Estimated Delivery Date</p>
       <p>Dispatch in 2 day</p>
     </div>
     <div>
       <img
         src="https://images.meesho.com/images/value_props/lowest_price_pbd.png"
       />
       <div>
         <p>Lowest</p>
         <p>Price</p>
       </div>

       <img src="https://images.meesho.com/images/pow/cod_jamun.svg" />
       <div>
         <p>Cash on</p>
         <p>Delivery</p>
       </div>

       <img
         src="https://images.meesho.com/images/pow/easyReturns_jamun.svg"
       />
       <div>
         <p>7-day</p>
         <p>Returns</p>
       </div>
     </div>
   </div>
 </div>
</div>
    </div>
  )
}

export default SingleProduct