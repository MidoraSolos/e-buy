import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const BaseRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SignIn />}></Route>
				<Route path="/SignUp" element={<SignUp />}></Route>
			</Routes>
		</Router>
	);
};

export default BaseRouter;
