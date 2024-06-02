import React from "react";

import Products from "../Components/Products.jsx";
import "../CSS/Products.css";
const MainPage = (props) => {
	return (
		<div className="ProjectContainers">
			<Products
				imgUrl="src/assets/ebuy.png"
				productName="Laptop"
				price="$100"
				text="28 Inch Laptop with 1ms Refresh Time"
			/>
		</div>
	);
};
export default MainPage;
