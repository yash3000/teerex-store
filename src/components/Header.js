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
          sx={{ backgroundColor: "primary" }}
          onClick={showCart}
        >
          Cart <AddShoppingCartOutlined sx={{ ml: 1 }} />
        </Button>
        {totalQuantity && (totalQuantity !== 0) ?
          (<div className="cart-totalQuantity">
            {totalQuantity}
          </div>)
          :(<></>)
        }
      </Stack>
    </Box>
  );
};

export default Header;
