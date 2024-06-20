import Products from "../Components/Products.jsx";
import "../CSS/Products.css";
import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar.jsx";
import UserContext from "../Components/UserContext"; // Make sure the path is correct
import AddBalance from "./AddBalance.jsx";

const MainPage = (props) => {
	const [product, setProduct] = useState([]);
	const [filteredProduct, setFilteredProduct] = useState([]);
	const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);
	const [balance, setBalance] = useState(0);
	const { userId } = useContext(UserContext);
	let usersId = JSON.parse(localStorage.getItem("currentUser")).id;
	let cartId = JSON.parse(localStorage.getItem("currentUser")).cart.id;

	console.log(cartId);
	console.log(usersId);

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/products/getAllProducts")
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
				setFilteredProduct(data);
			})
			.catch((error) => console.error("Error fetching products:", error));

		const storedBalance = localStorage.getItem("balance");
		if (storedBalance) {
			setBalance(parseFloat(storedBalance));
		}
	}, []);
	const addToCart = (productId) => {
		fetch(
			`http://localhost:8080/api/v1/cart/${usersId}/${cartId}/addProduct/${productId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("Product added to cart:", data);
				// Optionally update UI or give feedback to user
			})
			.catch((error) => console.error("Error adding product to cart:", error));
	};

	const displayFilteredProducts = (category) => {
		if (category === "all") {
			setFilteredProduct(product); // Show all products if category is "all"
		} else {
			const filteredProducts = product.filter(
				(prod) => prod.category.name === category
			);
			console.log(
				"Filtered Products for category",
				category,
				":",
				filteredProducts
			);
			setFilteredProduct(filteredProducts);
		}
	};

	const addFunds = (amount) => {
		const newBalance = balance + amount;
		setBalance(newBalance);
		localStorage.setItem("balance", newBalance.toString());
		closeAddBalance();
	};

	const openAddBalance = () => {
		setIsAddBalanceOpen(!isAddBalanceOpen);
	};

	const closeAddBalance = () => {
		setIsAddBalanceOpen(false);
	};

	const productinfo = [...product];
	console.log("product is :", product);
	console.log("fitlered product list is :", filteredProduct);
	console.log("User id is :", userId);

	return (
		<>
			<NavBar openAddBalance={openAddBalance} balance={balance} />
			<div className="fullScreen">
				<div className="CategorySort">
					<h1>Filter Products</h1>
					<button
						onClick={() => displayFilteredProducts("all")}
						className="CategoryItems"
					>
						Show all products
					</button>
					<button
						onClick={() => displayFilteredProducts("Furniture")}
						className="CategoryItems"
					>
						Only show furniture
					</button>
					<button
						onClick={() => displayFilteredProducts("Books")}
						className="CategoryItems"
					>
						Only show books
					</button>
					<button
						onClick={() => displayFilteredProducts("Food")}
						className="CategoryItems"
					>
						Only show food
					</button>
					<button
						onClick={() => displayFilteredProducts("Electronics")}
						className="CategoryItems"
					>
						Only show electronics
					</button>
				</div>

				<div className="ProjectContainers">
					{filteredProduct.map((productinfo) => (
						<Products
							{...productinfo}
							key={productinfo.id}
							imgUrl={productinfo.image}
							productName={productinfo.name}
							price={"$" + productinfo.price}
							text={productinfo.description.substring(0, 35) + "..."}
							addToCart={() => addToCart(productinfo.id)}
						/>
					))}
				</div>
			</div>
			{isAddBalanceOpen && (
				<AddBalance closeAddBalance={closeAddBalance} addFunds={addFunds} />
			)}
		</>
	);
};

export default MainPage;
