import React from "react";

import Products from "../Components/Products.jsx";
import "../CSS/Products.css";
const MainPage = (props) => {
	return (
		<div className="ProjectContainers">
			<Products
				id="1"
				imgUrl="src/assets/ebuy.png"
				productName="Laptop"
				price="$100"
				text="28 Inch Laptop with 1ms Refresh Time"
			/>
			<Products
				id="3"
				imgUrl="src/assets/background1.png"
				productName="Potatoe"
				price="$670"
				text="This is a very special potatoe This is a very special potatoe This is a very special potatoe"
			/>
		</div>
	);
};
export default MainPage;
