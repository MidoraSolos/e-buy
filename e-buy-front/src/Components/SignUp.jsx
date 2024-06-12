import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/SignIn.css";
import UserContext from "../Components/UserContext";

const SignUp = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [emailExists, setEmailExists] = useState(false);

	const navigate = useNavigate();
	const { setUserId } = useContext(UserContext);

	const handleChange = (e) => {
		const { name, value } = e.target;

		// Reset emailExists if the user is typing a new email
		if (name === "email") {
			setEmailExists(false);
		}

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/api/v1/signUp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			console.log("result is ", result);

			if (result.id != null) {
				// Set the user ID in context
				setUserId(result.id);

				console.log("Email is added to the database ");
				console.log("why this work ");
				console.log(result.id);

				// Clear the form and navigate to the login page after successful submission
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
				});
				console.log("Email is added to the database ");

				alert("User Made Successfully");
				localStorage.setItem("currentUser", JSON.stringify(result));
				navigate("/mainPage");
			} else {
				console.log("email already exists");
				setEmailExists(true);
			}
		} catch (error) {
			console.error("Error1:", error);
			setEmailExists(true);
		}
	};

	return (
		<div className="SignIn template d-flex justify-content-center align-items-center vh-100 bg-primary">
			<div className="form_container p-5 rounded bg-white">
				<form onSubmit={handleSubmit}>
					<h3 className="text-center">Sign Up</h3>
					<div className="mb-2">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							placeholder="Enter First Name"
							className="form-control"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							placeholder="Enter Last Name"
							className="form-control"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter Email"
							className="form-control"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						{emailExists && <p className="text-danger">Email already exists</p>}
					</div>
					<div className="mb-2">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter Password"
							className="form-control"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="d-grid">
						<button type="submit" className="btn btn-primary">
							Sign Up
						</button>
					</div>
				</form>
				<p className="text-end mt-2">
					Already Registered?
					<Link to="/" className="ms-2">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
