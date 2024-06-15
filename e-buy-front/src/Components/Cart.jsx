import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../CSS/CartPage.css";
import NavBar from "./NavBar";
import UserContext from "../Components/UserContext"; // Import the UserContext
import AddBalance from "./AddBalance";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Cart = () => {
	const { userId } = useContext(UserContext); // Access userId from context
	const [cart, setCart] = useState(null);
	const [error, setError] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);
	const [balance, setBalance] = useState(0);
	const [purchaseSuccess, setPurchaseSuccess] = useState(false);

	let usersId = JSON.parse(localStorage.getItem("currentUser")).id;
	let cartId = JSON.parse(localStorage.getItem("currentUser")).cart.id;

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await fetch(
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

	useEffect(() => {
		const storedBalance = localStorage.getItem("balance");
		if (storedBalance) {
			setBalance(parseFloat(storedBalance));
		}
	}, []);

	const removeProduct = async (productId) => {
		try {
			const response = await fetch(
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

	const openAddBalance = () => {
		setIsAddBalanceOpen(true);
	};

	const closeAddBalance = () => {
		setIsAddBalanceOpen(false);
	};

	const addFunds = (amount) => {
		const newBalance = balance + amount;
		setBalance(newBalance);
		localStorage.setItem("balance", newBalance.toString());
		closeAddBalance();
	};
	const handlePurchase = async () => {
		if (cart.cartProducts.length > 0) {
			if (balance >= totalPrice) {
				try {
					const response = await fetch(
						`http://localhost:8080/api/v1/cart/${usersId}/${cartId}/removeProducts`,
						{
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					if (response.ok) {
						// Purchase successful, deduct totalPrice from balance
						const newBalance = balance - totalPrice;
						localStorage.setItem("balance", newBalance.toString());
						setBalance(newBalance);
						setCart(null); // Clear cart after successful purchase
						setPurchaseSuccess(true);
						Swal.fire({
							title: "Checkout Successful",
							text: "Add more prducts to checkout again",
							icon: "success",
							confirmButtonText: "Ok",
						});
					} else {
						setError("Failed to remove products from cart");
					}
				} catch (error) {
					console.error("Error removing products from cart:", error);
					setError("Error removing products from cart");
				}
			} else {
				Swal.fire({
					title: "Insufficient funds",
					text: "Add Extra Funds To Balance",
					icon: "error",
					confirmButtonText: "Ok",
				});
				// alert("Add Money to your account balance");
				// setShowAddMoneyMessage(true);
			}
		}
	};

	return (
		<>
			<NavBar openAddBalance={openAddBalance} balance={balance} />
			<div className="cart-container">
				<div className="header">
					<Link to="/mainPage" className="return-link btn btn-danger">
						Return to shopping
					</Link>
				</div>
				<h1 className="cart-title">Cart</h1>
				{error ? (
					<h2 className="cart-error">{error}</h2>
				) : purchaseSuccess ? (
					<div className="purchase-success">
						<p className="add-money-message">Purchase successful!</p>
						<Link to="/mainPage" className="btn btn-primary">
							Continue Shopping
						</Link>
					</div>
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
							<button
								onClick={handlePurchase}
								className="purchase-btn btn btn-primary"
							>
								Purchase Items
							</button>
						</div>
					</>
				) : (
					<h2>Loading...</h2>
				)}
			</div>
			{isAddBalanceOpen && (
				<AddBalance closeAddBalance={closeAddBalance} addFunds={addFunds} />
			)}
		</>
	);
};

export default Cart;
