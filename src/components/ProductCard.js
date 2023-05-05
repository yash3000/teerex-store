import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        image={product.imageURL}
        className="card-image"
        alt="product"
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          color="textPrimary"
          sx={{ fontWeight: "bold" }}
          mb={1}
        >
          Rs.{product.price}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          className="card-button"
        >
          <AddShoppingCartOutlined /> &nbsp; ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
