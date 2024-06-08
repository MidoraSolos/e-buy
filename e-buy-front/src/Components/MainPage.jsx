import Products from "../Components/Products.jsx";
import "../CSS/Products.css";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.jsx";

const MainPage = (props) => {
	const [product, setProduct] = useState([]);
	const [cartId, setCartId] = useState(3); //change later for user id

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/products/getAllProducts")
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);

	const addToCart = (productId) => {
		fetch(
			`http://localhost:8080/api/v1/cart/${cartId}/addProduct/${productId}`,
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

	const productinfo = [...product];
	console.log("product is :", product);

	return (
		<>
			<NavBar />
			<div className="ProjectContainers">
				{productinfo.map((productinfo) => (
					<Products
						{...productinfo}
						key={productinfo.id}
						imgUrl={productinfo.image}
						productName={productinfo.name}
						price={productinfo.price}
						text={productinfo.description.substring(0, 30) + "..."}
						addToCart={() => addToCart(productinfo.id)}
					/>
				))}
			</div>
		</>
	);
};
export default MainPage;
