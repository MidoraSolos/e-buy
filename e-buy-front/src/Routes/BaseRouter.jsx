import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../Components/MainPage";
import ProductView from "../Components/ProductView";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";

const BaseRouter = () => {
	return (
		<Router>
			{/* <NavBar></NavBar> */}
			<Routes>
				<Route path="/" element={<SignIn />}></Route>
				<Route path="/SignUp" element={<SignUp />}></Route>
				<Route path="/mainPage" element={<MainPage />}></Route>
				<Route path="/ProductView/:id" element={<ProductView />}></Route>
				<Route path="/Cart" element={<Cart />}></Route>
			</Routes>
		</Router>
	);
};

export default BaseRouter;
