import Products from "../Components/Products.jsx";
import "../CSS/Products.css";
import React, { useEffect, useState, useContext } from "react";
import NavBar from "./NavBar.jsx";
import UserContext from "../Components/UserContext"; // Make sure the path is correct

const MainPage = (props) => {
	const [product, setProduct] = useState([]);
	const { userId } = useContext(UserContext);

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/products/getAllProducts")
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);

	const addToCart = (productId) => {
		if (!userId) {
			console.error("User ID is not available");
			return;
		}

		fetch(
			`http://localhost:8080/api/v1/cart/${userId}/addProduct/${productId}`,
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
	console.log("User id is :", userId);

	return (
		<>
			<NavBar />
			<div className="fullScreen">
				<div className="CategorySort">
					<h1>Filter Products</h1>
					<button>Show All products</button>
					<button>only show furniture</button>
					<button>only show books</button>
					<button>only show food</button>
					<button>only show eletronics</button>
				</div>

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
			</div>
		</>
	);
};

export default MainPage;
