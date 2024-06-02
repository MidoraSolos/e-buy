import React from "react";
import "../CSS/SignIn.css";

import { Link } from "react-router-dom";

const SignIn = () => {
	return (
		<div className="SignUp template d-flex justify-content-center align-items-center vh-100 bg-primary">
			<div className="form_containter p-5 rounded bg-white">
				<form>
					<h3 className="text-center">Sign In</h3>
					<div className="mb-2">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							placeholder="Enter Email"
							className="form-control"
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							placeholder="Enter Password"
							className="form-control"
						/>
					</div>
					<div className="mb-2">
						<input
							type="checkbox"
							className="custom-control custom-checkbox"
							id="check"
						/>
						<label htmlFor="check" className="custom-input-label ms-2">
							Remember me
						</label>
					</div>
					<div className="d-grid ">
						<Link to="/MainPage" className="ms-2 link btn btn-primary textSize">
							Sign In
							{/* <button className="btn btn-primary">Sign In</button> */}
						</Link>
					</div>
				</form>
				<p className="text-end mt-2">
					Forget{" "}
					<a href="" className="">
						Password?
					</a>{" "}
					<Link to="/SignUp" className="ms-2">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};
export default SignIn;
