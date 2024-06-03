import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../Components/MainPage";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const BaseRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<SignIn />}></Route>
				<Route path="/SignUp" element={<SignUp />}></Route>
				<Route path="/" element={<MainPage />}></Route>
			</Routes>
		</Router>
	);
};

export default BaseRouter;
