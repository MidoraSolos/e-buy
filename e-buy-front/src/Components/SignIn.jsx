import React, { useState } from "react";
import "../CSS/SignIn.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const basicAuthorize = (event) => {
    event.preventDefault(); // Prevent default form submission
    const { email, password } = formData;

    fetch("http://localhost:8080/login", {
      headers: {
        Authorization: "Basic " + window.btoa(email + ":" + password),
        "Content-Type": "application/json",
      },
    })
      .then(async (resp) => {
        console.log("email =>", email);
        console.log("password =>", password);
        console.log("response => ", resp);

        if (resp.ok) {
          const data = await resp.json();
          console.log("response =>", data);
          console.log("success");
          setIsLoginSuccess(true);
          localStorage.setItem("currentUser", JSON.stringify(data));
          navigate("/");
        } else {
          console.log("fail");
          setIsLoginSuccess(false);
        }
        return resp;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="SignUp template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_containter p-5 rounded bg-white">
        <form onSubmit={basicAuthorize}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
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
          <div className="d-grid">
            <button type="submit" className="btn btn-primary textSize">
              Sign In
            </button>
            <Link to="/" className="ms-2">
              Sign In
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
