import Products from "../Components/Products.jsx";
import "../CSS/Products.css";
import React, { useEffect, useState } from "react";

const MainPage = (props) => {
	const [product, setProduct] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/api/v1/products/getAllProducts")
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);
	const productinfo = [...product];
	console.log("product is :", product);

	return (
		<div className="ProjectContainers">
			{productinfo.map((productinfo) => (
				<Products
					{...productinfo}
					id={productinfo.id}
					imgUrl={productinfo.image}
					productName={productinfo.name}
					price={productinfo.price}
					text={productinfo.description.substring(0, 30) + "..."}
				/>
			))}
		</div>
	);
};
export default MainPage;
