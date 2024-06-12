import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import { Link } from "react-router-dom";

import "../CSS/ProductView.css";
import NavBar from "./NavBar";

const ProductView = (props) => {
	const [product, setProduct] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		fetch(`http://localhost:8080/api/v1/products/getSingleProduct/${id}`)
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);
	// const productinfo = [...product];
	console.log("Special product is :", product);
	// console.log("Special product is :", productinfo);
	// console.log("Special product is :", product[0].name);

	return (
		<>
			<NavBar />
			<div className="ProductContainer">
				<img src={product.image} className="Image" alt={product.name} />
				<div className="content">
					<h1 className="Name">{product.name}</h1>
					<h2 className="Price">{product.price}</h2>
					<p className="description">{product.description}</p>
					<Link to="/mainPage" className=" link btn btn-danger textSize">
						Back to shop
						{/* <button className="btn btn-primary">Sign In</button> */}
					</Link>
				</div>
			</div>
		</>
	);
};

export default ProductView;
