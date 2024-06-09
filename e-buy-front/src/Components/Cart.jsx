// import React from "react";
// import { Link } from "react-router-dom";
// import "../CSS/CartPage.css";
// import NavBar from "./NavBar";
// const Cart = () => {
// 	return (
// 		<>
// 			<NavBar />
// 			<div className="cart-container">
// 				<div className="header">
// 					<Link to="/" className="return-link btn btn-danger">
// 						Return to shopping
// 					</Link>
// 				</div>
// 				<h1 className="cart-title">Cart</h1>
// 				<h2 className="cart-subtotal">Price subtotal @ _ item(s)</h2>
// 				<div className="cart-item">
// 					<h2 className="product-name">Product Name</h2>
// 					<h4 className="product-quantity">Quantity: _</h4>
// 					<h2 className="product-price">Product Price: $</h2>
// 					<button className="remove-btn btn btn-danger">
// 						Remove from cart
// 					</button>
// 				</div>
// 				<div className="purchase-container">
// 					<button className="purchase-btn btn btn-primary">
// 						Purchase Items
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/CartPage.css";
import NavBar from "./NavBar";

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const cartId = 62; // Assuming you're working with cart ID 3 for now
				const response = await fetch(
					`http://localhost:8080/api/v1/cart/${cartId}`
				);
				if (response.ok) {
					const data = await response.json();
					setCart(data);
					// console.log(cart);
					// console.log(cart.cartProducts);
				} else {
					setError("Failed to fetch cart");
				}
			} catch (error) {
				console.error("Error fetching cart:", error);
				setError("Error fetching cart");
			}
		};

		fetchCart();
	}, []);

	const removeProduct = async (productId) => {
		try {
			const cartId = 62; // Assuming you're working with cart ID 3 for now
			const response = await fetch(
				`http://localhost:8080/api/v1/cart/${cartId}/removeProduct/${productId}`,
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
					<Link to="/" className="return-link btn btn-danger">
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
							<div key={cartProduct.id} className="cart-item">
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
						))}
						<div className="purchase-container">
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
