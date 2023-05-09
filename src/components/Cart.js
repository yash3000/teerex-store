import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { IconButton, Stack, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./Cart.css";

export const generateCartItemsFrom = (cartItems, productDetails) => {
  let cartProducts = [];
  if (cartItems && cartItems.length && productDetails.length) {
    for (var cartItem of cartItems) {
      var product = productDetails.find((product) => {
        return product.id === cartItem.productId
      });
      cartProducts.push({
        productId: cartItem.productId,
        price: cartItem.productPrice,
        quantity: cartItem.quantity,
        imageURL: product.imageURL,
        name: product.name,
        type: product.type,
        currency: product.currency,
        color: product.color,
        gender: product.gender,
        maxQuantity: product.quantity
      });
    }
  }
  return cartProducts;
};

const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="medium" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="medium" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

const Cart = ({ cartDetails, setCartDetailsAndUpload, productDetails }) => {
  // For showing cart details
  var { cartItems, totalPrice } = cartDetails;
  	// For error snackbar
	const { enqueueSnackbar } = useSnackbar();

  const [cartItemsWithProductDetails, setCartItemsWithProductDetails] = useState(generateCartItemsFrom(cartItems, productDetails));

  const handleQuantity = (id, quantity, maxQuantity, type) => {
    if (quantity < maxQuantity) {
      var cart = JSON.parse(JSON.stringify(cartDetails));
      let product = cart.cartItems.find((cartItem) => {
        return cartItem.productId === id;
      });
      product.quantity = quantity;
      if(product.quantity === 0){
        cart.cartItems = cart.cartItems.filter(function(cartItem){
          return cartItem.productId !== id
        });
      }
      cart.totalPrice = type === "increase" ? cart.totalPrice+product.productPrice : cart.totalPrice-product.productPrice;
      cart.totalQuantity = type === "increase" ? cart.totalQuantity+1 : cart.totalQuantity-1;
      setCartDetailsAndUpload(cart);
      setCartItemsWithProductDetails(generateCartItemsFrom(cart.cartItems, productDetails))
    } else {
      console.log("Maximum quantity reached. Cannot add more of this product.");
      enqueueSnackbar("Maximum quantity reached. Cannot add more of this product.",
        {
          variant: "error",
        }
      );
    }
  }

  if (!cartItemsWithProductDetails.length) {
    return (
      <>
        <Typography
          variant="h6"
          color="textPrimary"
          sx={{ fontWeight: "bold" }}
          mb={1}
        >
          Shopping Cart
        </Typography>
        <Box className="cart empty">
          <ShoppingCartOutlined className="empty-cart-icon" />
          <Box color="#aaa" textAlign="center">
            Cart is empty. Add more items to the cart to checkout.
          </Box>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box className="cart">
        <Typography
          variant="h6"
          color="textPrimary"
          sx={{ fontWeight: "bold" }}
          my={1}
        >
          Shopping Cart
        </Typography>
        {cartItemsWithProductDetails.map((item) => (
          <Box
            display="flex"
            alignItems="flex-start"
            padding="1rem"
            key={item.productId}
          >
            <Box className="image-container">
              <img
                // Add product image
                src={item.imageURL}
                // Add product name as alt eext
                alt={item.name}
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="6rem"
              paddingX="1rem"
            >
              <div>{item.name}</div>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ItemQuantity
                  // Add required props by checking implementation
                  value={item.quantity}
                  handleAdd={() =>
                    handleQuantity(item.productId, item.quantity + 1, item.maxQuantity, "increase")
                  }
                  handleDelete={() =>
                    handleQuantity(item.productId, item.quantity - 1, item.maxQuantity, "decrease")
                  }
                />
                <Box padding="0.5rem" fontWeight="700">
                  Rs.{item.price * item.quantity}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Divider />
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            Rs.{totalPrice}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
