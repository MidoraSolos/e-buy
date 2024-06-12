import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import { Link } from "react-router-dom";
import "../CSS/ProductView.css";
import NavBar from "./NavBar";
import AddBalance from "./AddBalance";

const ProductView = () => {
	const [product, setProduct] = useState([]);
	let { id } = useParams();
	const [balance, setBalance] = useState(0);

	const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);

	useEffect(() => {
		// Fetch product details
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/v1/products/getSingleProduct/${id}`
				);
				if (response.ok) {
					const data = await response.json();
					setProduct(data);
				} else {
					console.error("Failed to fetch product");
				}
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();

		// Retrieve balance from local storage
		const storedBalance = localStorage.getItem("balance");
		if (storedBalance) {
			setBalance(parseFloat(storedBalance));
		}
	}, [id]);

	const addFunds = (amount) => {
		const newBalance = balance + amount;
		setBalance(newBalance);
		localStorage.setItem("balance", newBalance.toString());
		closeAddBalance();
	};

	const openAddBalance = () => {
		setIsAddBalanceOpen(true);
	};

	const closeAddBalance = () => {
		setIsAddBalanceOpen(false);
	};

	return (
		<>
			<NavBar openAddBalance={openAddBalance} balance={balance} />
			<div className="ProductContainer">
				<img src={product.image} className="Image" alt={product.name} />
				<div className="content">
					<h1 className="Name">{product.name}</h1>
					<h2 className="Price">{product.price}</h2>
					<p className="description">{product.description}</p>
					<Link to="/mainPage" className=" link btn btn-danger textSize">
						Back to shop
					</Link>
				</div>
			</div>
			{isAddBalanceOpen && (
				<AddBalance closeAddBalance={closeAddBalance} addFunds={addFunds} />
			)}
		</>
	);
};

export default ProductView;
