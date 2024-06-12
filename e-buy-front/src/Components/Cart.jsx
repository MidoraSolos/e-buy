import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../CSS/CartPage.css";
import NavBar from "./NavBar";
import UserContext from "../Components/UserContext"; // Import the UserContext

const Cart = () => {
	const { userId } = useContext(UserContext); // Access userId from context
	// console.log(userId);
	const [cart, setCart] = useState(null);
	const [error, setError] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);

	let usersId = JSON.parse(localStorage.getItem("currentUser")).id;
	let cartId = JSON.parse(localStorage.getItem("currentUser")).cart.id;

	useEffect(() => {
		const fetchCart = async () => {
			try {
				// Use userId instead of hardcoding cartId
				const response = await fetch(
					// `http://localhost:8080/api/v1/cart/${userId}`
					`http://localhost:8080/api/v1/cart/${usersId}/${cartId}`
				);
				if (response.ok) {
					const data = await response.json();
					setCart(data);
				} else {
					setError("Failed to fetch cart");
				}
			} catch (error) {
				console.error("Error fetching cart:", error);
				setError("Error fetching cart");
			}
		};

		fetchCart();
	}, [userId]); // Trigger useEffect whenever userId changes

	useEffect(() => {
		if (cart) {
			let total = 0;
			for (const cartProduct of cart.cartProducts) {
				total += cartProduct.price;
			}
			setTotalPrice(total);
		}
	}, [cart]);

	const removeProduct = async (productId) => {
		try {
			// Use userId instead of hardcoding cartId
			const response = await fetch(
				// `http://localhost:8080/api/v1/cart/904/removeProduct/${productId}`,
				`http://localhost:8080/api/v1/cart/${usersId}/${cartId}/removeProduct/${productId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setCart(data);
			} else {
				setError("Failed to remove product from cart");
			}
		} catch (error) {
			console.error("Error removing product from cart:", error);
			setError("Error removing product from cart");
		}
	};

	return (
		<>
			<NavBar />
			<div className="cart-container">
				<div className="header">
					<Link to="/mainPage" className="return-link btn btn-danger">
						Return to shopping
					</Link>
				</div>
				<h1 className="cart-title">Cart</h1>
				{error ? (
					<h2 className="cart-error">{error}</h2>
				) : cart ? (
					<>
						<h2 className="cart-subtotal">
							Price subtotal @ {cart.cartProducts.length} item(s)
						</h2>
						{cart.cartProducts.map((cartProduct) => (
							<div key={cartProduct.id} className="cartProduct">
								<div className="productImage">
									<img src={cartProduct.image} alt="image" />
								</div>
								<div className="cart-item">
									<h2 className="product-name">{cartProduct.name}</h2>
									<h4 className="product-quantity">Quantity: 1</h4>
									<h2 className="product-price">
										Product Price: ${cartProduct.price}
									</h2>
									<button
										onClick={() => removeProduct(cartProduct.id)}
										className="remove-btn btn btn-danger"
									>
										Remove from cart
									</button>
								</div>
							</div>
						))}
						<div className="purchase-container">
							<h2 className="total-price">
								Total Price: ${totalPrice.toFixed(2)}
							</h2>
							<button className="purchase-btn btn btn-primary">
								Purchase Items
							</button>
						</div>
					</>
				) : (
					<h2>Loading...</h2>
				)}
			</div>
		</>
	);
};

export default Cart;
