import React, { useContext, useEffect, useState } from 'react'
import '../Components/CSS Files/SingleProduct.css'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import api from "./ApiConfig";

const SingleProduct = () => {
  const [allowUpdate, setAllowUpdate] = useState(false);
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [singleProductData, setSingleProductData] = useState({});
  const [productData, setProductData] = useState({name: "", price: "", image: "", category: ""});
  const router = useNavigate();

  useEffect(() => {
    if (id) {
        async function getSingleProductData() {
            try {
                const response = await api.post('/get-single-product-data', { productId: id })
                if (response.data.success) {
                    setSingleProductData(response.data.product)
                }
            } catch (error) {

            }
        }
        getSingleProductData()
    }
}, [id])

  // console.log(singleProductData, "singleProductData");

// ----------------------------**addCart**------------------------------------------

  async function addToCart(productId) {
    console.log(productId)
      try {
          const response = await api.post("/add-to-cart", {
            productId,
            userId: state?.user?._id,
          });
          
          if (response.data.success) {
            toast.success("Product added successfully to cart!!");
          }
        
      } catch (error) {
        console.log(error);
      }
    
  }

  
// ----------------------------**addCart**------------------------------------------




// ----------------------------**UpdateProduct**------------------------------------------

  function uptoDate() {
    setAllowUpdate(true);
  }

  function closeUpate() {
    setAllowUpdate(false);
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setProductData({ ...productData, [name]: value });

  }

  async function handleSubmit (e,productId) {
    e.preventDefault();
// async function uptoDate (productId){
  try {
    const token = JSON.parse(localStorage.getItem("token"));
        const response = await api.post("/update-your-product", {token, productId, productData });
        if (response.data.success) {
          setProductData({name: "", price: "", image: "", category: ""  })
            toast.success(response.data.message)
            
        } else {
            toast.error(response.data.message)
        }

 } catch (error) {
  console.log(error)
 }
}

// ----------------------------**UpdateProduct**------------------------------------------


// ----------------------------**deleteProduct**------------------------------------------
        


const deleteProduct = async (productId) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token, "token here");
    const response = await api.post(
      "delete-your-product",
      {
        productId,
        token,
      }
    );
    console.log(response,"data here");
    if (response.data.success) {
      toast.success("item removed succesfully");
      setSingleProductData(response.data.user);
    } else {
      toast.error( response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

console.log(state);
   
  // ----------------------------**deleteProduct**------------------------------------------
  


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
                  value={productData.name}
                  onChange={handleChange}
                />
                <br />

                <label>Product Price :</label>
                <br />
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
                <br />
                <label>Product Category :</label>
                <br />
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                />
                <br />
                <label>Product Image :</label>
                <br />
                <input
                  type="text"
                  name="image"
                  value={productData.image}
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

     {state?.user?.role === "Seller" ? (
  <div>
    <button onClick={()=>uptoDate(productData._id)}>Update Product</button>
    <button onClick={()=>deleteProduct(singleProductData._id)}>Delete</button>
  </div>
) : (
  <div>
    <button onClick={() => addToCart(singleProductData._id)}>Add to Cart</button>
    <button>Buy Now</button>
  </div>
)}




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