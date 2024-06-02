import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Products({ imgUrl, productName, text, price }) {
	return (
		<Card>
			<Card.Img variant="top" src={`/${imgUrl}`} />
			<Card.Body>
				<Card.Title>{productName}</Card.Title>
				<Card.Text>{text}</Card.Text>
				<Card.Text>{price}</Card.Text>

				<Link to="/" className=" btn btn-primary">
					Sign In
				</Link>
			</Card.Body>
		</Card>
	);
}
