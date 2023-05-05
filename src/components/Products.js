import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
	Grid,
	InputAdornment,
	TextField,
	Button
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Header from "./Header";
import Cart from "./Cart";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import { useSnackbar } from "notistack";
import "./Products.css";

const Products = () => {

	// Original products list
	const [productDetails, setProductDetails] = useState([]);
	// Filtered products list
	const [filteredProducts, setFilteredProducts] = useState([]);
	// To show cart
	const [showCart, setShowCart] = useState(false);
	// To show filters in mobile view
	const [showFilter, setShowFilter] = useState(false);
	// Timeout Id
	const [timeoutId, setTimeoutId] = useState(null);
	// Cart Details
	const [cartDetails, setCartDetails] = useState({});
	// To get screen width
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	// For error snackbar
	const { enqueueSnackbar } = useSnackbar();

	const setCartDetailsAndUpload = (cartDetails) => {
		setCartDetails(cartDetails);
	}

	// Performing initial API call and setting products and filtered products array
	const performAPICall = async () => {
		try {
			// GET call
			let response = await axios.get(`${config.endpoint}/catalogue.json`);
			//Success
			setProductDetails(response.data);
			setFilteredProducts(response.data);

		} catch (error) {
			console.log(error);
		}
	};
	//To perform API call at first
	useEffect(() => {
		performAPICall();
	}, []);

	// To get screen width
	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// Helper function for performing search. Providing filtered array on the basis of text searched.
	function applySearch(searchWords) {
		if (!searchWords.length) {
			return true
		}
		return productDetails.filter((productDetail) => {
			for (var word of searchWords) {
				if ((productDetail.name.toLowerCase().indexOf(word.toLowerCase()) > -1) || (productDetail.color.toLowerCase().indexOf(word.toLowerCase()) > -1) || (productDetail.type.toLowerCase().indexOf(word.toLowerCase()) > -1)) {
					return true;
				}
			}
			return false;
		})
	}

	// Performing search on products after debouncing.
	const performSearch = async (text) => {
		var filteredArray = applySearch(text.split(" "));
		setFilteredProducts(filteredArray);
	};

	// Function defining debouncing for searchbar.
	const debounceSearch = (event, debounceTimeout) => {
		let text = event.target.value;
		// [IF true] Clear timoutId
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}
		// Set timeout & make the API call
		let timeOut = setTimeout(() => {
			performSearch(text);
		}, 500);
		// Update set timeoutId
		setTimeoutId(timeOut);
	};

	//Function to hide cart menu
	const hideCartDetail = () => {
		setShowCart(false);
	}

	//Function to show cart menu
	const showCartDetail = () => {
		setShowCart(true);
	}

	//Function to handle Add Item to Cart button
	const handleAddToCart = (product) => {
		var cart = JSON.parse(JSON.stringify(cartDetails));
		//Checking if cart exists or not
		if (cart && cart.cartItems && cart.cartItems.length) {
			var productInCart = cart.cartItems.find((cartItem) => {
				return cartItem.productId === product.id
			});
			// Checking if product is already present in cart or not
			if (productInCart) {
				//Checking if prodict if less than available quantity
				if (productInCart.quantity < product.quantity) {
					productInCart.quantity += 1;
					cart.totalPrice += product.price;
					cart.totalQuantity += 1;
				} else {
					console.log("Maximum quantity reached. Cannot add more of this product.");
					enqueueSnackbar("Maximum quantity reached. Cannot add more of this product.",
						{
							variant: "error",
						}
					);
				}
			} else {
				// Adding item to cart
				cart.cartItems.push({
					productId: product.id,
					productPrice: product.price,
					quantity: 1
				});
				cart.totalPrice += product.price;
				cart.totalQuantity += 1;
			}
		} else {
			// Creating cart and adding item into it.
			cart.cartItems = [];
			cart.cartItems.push({
				productId: product.id,
				productPrice: product.price,
				quantity: 1
			});
			cart.totalPrice = product.price;
			cart.totalQuantity = 1;
		}
		// Setting cartDetails 
		setCartDetailsAndUpload(cart);
	}

	const performFilterSearch = (colorCheckedValues, genderCheckedValues, priceCheckedValues, typeCheckedValues) => {
		const colorCheck = (product) => {
			for (var color of colorCheckedValues) {
				if (color === product.color.toLowerCase()) {
					return true
				}
			}
		}
		const genderCheck = (product) => {
			for (var gender of genderCheckedValues) {
				if (gender === product.gender.toLowerCase()) {
					return true
				}
			}
		}
		const priceCheck = (product) => {
			for (var priceRange of priceCheckedValues) {
				var priceRangeArray = priceRange.split("-");
				if (product.price >= priceRangeArray[0] && (isNaN(priceRangeArray[1]) || product.price <= priceRangeArray[1])) {
					return true
				}
			}
		}
		const typeCheck = (product) => {
			for (var type of typeCheckedValues) {
				if (type === product.type.toLowerCase()) {
					return true
				}
			}
		}

		var filteredArray = productDetails.filter((product) => {
			var colorChecker = false, genderChecker = false, priceChecker = false, typeChecker = false;
			if (colorCheckedValues.length) {
				colorChecker = colorCheck(product)
			} else {
				colorChecker = true;
			}
			if (genderCheckedValues.length) {
				genderChecker = genderCheck(product)
			} else {
				genderChecker = true;
			}
			if (priceCheckedValues.length) {
				priceChecker = priceCheck(product)
			} else {
				priceChecker = true;
			}
			if (typeCheckedValues.length) {
				typeChecker = typeCheck(product)
			} else {
				typeChecker = true;
			}

			return colorChecker && genderChecker && priceChecker && typeChecker;
		});
		setFilteredProducts(filteredArray);
	}

	return (
		<div>
			<Header
				hideCartDetail={hideCartDetail}
				showCart={showCartDetail}
				totalQuantity={cartDetails.totalQuantity}
			/>
			{!showCart &&
				<div className="search-container">
					<TextField
						className="search-desktop"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Search color="primary" />
								</InputAdornment>
							),
						}}
						placeholder="Search for items/categories"
						name="search"
						onChange={(e) => debounceSearch(e, timeoutId)}
					/>
					{screenWidth < 600 &&
						<Button
							onClick={() => { setShowFilter(!showFilter) }}
						>
							Filter
						</Button>
					}
				</div>
			}
			<Grid container sx={{ margin: "0rem 1rem", width: "calc(100% - 2rem)" }}>
				{!showCart ? (<Grid
					item
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					{(screenWidth >= 600 || showFilter) &&
						<Grid container
							item
							spacing={1}
							direction="column"
							justifyContent="center"
							alignItems="center"
							my={2}
							sx={{ alignSelf: "start", }}
							xs={12}
							sm={4}
						>
							<Filters
								performFilterSearch={performFilterSearch}
							/>
						</Grid>
					}
					<Grid
						container
						item
						spacing={2}
						direction="row"
						justifyContent="center"
						alignItems="center"
						className="products-container"
						my={3}
						xs={12}
						sm={8}
					>
						{filteredProducts.length ? (
							filteredProducts.map((product) => (
								<Grid item key={product.id} xs={12} sm={6} md={4}>
									<ProductCard
										product={product}
										handleAddToCart={(event) => handleAddToCart(product)}
									/>
								</Grid>
							))
						) : (
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="center"
								alignItems="center"
								py={10}
							>
								<SentimentDissatisfied size={40} />
								<h4>No products found</h4>
							</Box>
						)}
					</Grid>
				</Grid>)
					: (
						<Cart
							cartDetails={cartDetails}
							setCartDetailsAndUpload={setCartDetailsAndUpload}
							productDetails={productDetails}
						/>
					)}
			</Grid>
		</div >
	);
};

export default Products;
