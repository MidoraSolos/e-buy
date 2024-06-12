import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import UserContext from "../Components/UserContext"; // Adjust the import path accordingly

export default function Products({ imgUrl, productName, text, price, id }) {
	const { userId } = useContext(UserContext); // Access the user ID from the context
	let usersId = JSON.parse(localStorage.getItem("currentUser")).id;
	let cartId = JSON.parse(localStorage.getItem("currentUser")).cart.id;

	const handleAddToCart = async (productId) => {
		try {
			// if (!userId) {
			// 	console.error("User ID is not available");
			// 	return;
			// }

			const response = await fetch(
				// `http://localhost:8080/api/v1/cart/${usersId}/addProduct/${productId}`,
				`http://localhost:8080/api/v1/cart/${usersId}/${cartId}/addProduct/${productId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				console.log("Product added to cart");
			} else {
				console.error("Failed to add product to cart");
			}
		} catch (error) {
			console.error("Error adding product to cart:", error);
		}
	};

	return (
		<Card>
			<Card.Body>
				<Link to={`/ProductView/${id}`}>
					<Card.Img id="img" variant="top" src={imgUrl} />
					<Card.Title>{productName}</Card.Title>
					<Card.Text id="price">{price}</Card.Text>
					<Card.Text>{text}</Card.Text>
				</Link>
				<div className="d-grid">
					<Button
						className="link btn btn-danger textSize"
						onClick={() => handleAddToCart(id)}
					>
						Add to cart
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
