import { Button, Stack } from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ hideCartDetail, showCart, totalQuantity }) => {

  return (
    <Box className="header">
      <Box className="header-title">
        TeeRex Store
      </Box>
      <Stack direction="row" spacing={1} alignItems="center" className="header-stack">
        <Button
          onClick={hideCartDetail}
        >
          Products
        </Button>
        <Button
          variant="contained"
          sx={{backgroundColor:"primary"}}
          onClick={showCart}
        >
          Cart <AddShoppingCartOutlined sx={{ml:1}}/>
        </Button>
        {totalQuantity && <div
        className="cart-totalQuantity"
        >
        {totalQuantity}
        </div>}
      </Stack>
    </Box>
  );
};

export default Header;

//Not sure of onClick callback function provided to "Back to explore" BTN;

//Error after Login API successfully loads the products page -
//index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
