
import jwt from 'jsonwebtoken';
import UserModal from '../Modals/User.modal.js';
import ProductModal from '../Modals/Product.modal.js';

export const addCart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) throw new Error("Token and Product id is required.")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModal.findById({ _id: userId })

        user?.cart.push(productId);

        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const { token } = req.body;

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedData?.userId;

        const user = await UserModal.findById(userId)


        if (user) {
            var finalData = [];
            for (var i = 0; i < user.cart.length; i++) {
                // console.log(user.cart[i])
                const product = await ProductModal.findById(user.cart[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, products: finalData })
        }
        throw new Error("User not found.")

    } catch (error) {
        return res.status(500).json({ status: "error", message: error })
    }
}

export const removeCartItem = async (req, res) => {
    try {
      const { token, productId } = req.body;
      // console.log(token , productId);

      if (!token || !productId) {
        return res.status(400).json({ success: false, message: "userId and token are required" });
      }

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedData?.userId;
      const user = await UserModal.findById({ _id: userId });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const cart = user?.cart;
      const removeIndex = cart.indexOf(productId);
      console.log(cart);

      if (removeIndex === -1) {
        return res.status(404).json({ success: false, message: "Product not found in cart" });
      }
      cart.splice(removeIndex, 1);

      await user.save();

      return res.status(200).json({ success: true, user: user });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };