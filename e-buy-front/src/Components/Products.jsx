// import React from "react";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import { Link } from "react-router-dom";

// export default function Products({
// 	imgUrl,
// 	productName,
// 	text,
// 	price,
// 	id,
// 	addToCart,
// }) {
// 	return (
// 		<Card>
// 			<Card.Body>
// 				<Link to={`/ProductView/${id}`}>
// 					<Card.Img id="img" variant="top" src={imgUrl} />
// 					<Card.Title>{productName}</Card.Title>
// 					<Card.Text id="price">{price}</Card.Text>
// 					<Card.Text>{text}</Card.Text>
// 				</Link>
// 				<div className="d-grid ">
// 					<Button className="btn btn-danger textSize" onClick={addToCart}>
// 						Add to cart
// 					</Button>
// 				</div>
// 			</Card.Body>
// 		</Card>
// 	);
// }

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Products({ imgUrl, productName, text, price, id }) {
  const handleAddToCart = async (productId) => {
    try {
      const cartId = 1; // Assuming you're working with cart ID 1 for now
      const response = await fetch(
        `http://localhost:8080/api/v1/cart/${cartId}/addProduct/${productId}`,
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
