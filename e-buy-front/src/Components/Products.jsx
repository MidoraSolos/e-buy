import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Products({ imgUrl, productName, text, price, id }) {
	return (
		<Card>
			<Card.Body>
				<Link to={`/signup/${id}`}>
					<Card.Img id="img" variant="top" src={imgUrl} />

					<Card.Title>{productName}</Card.Title>
					<Card.Text id="price">{price}</Card.Text>
					<Card.Text>{text}</Card.Text>
					{/* <h3>View</h3> */}
				</Link>

				<div className="d-grid ">
					<Link to="/login" className=" link btn btn-danger textSize">
						Add to cart
						{/* <button className="btn btn-primary">Sign In</button> */}
					</Link>
				</div>
			</Card.Body>
		</Card>
	);
}
