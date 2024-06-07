import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
				<Nav.Link href="/">Home</Nav.Link>

				<Form className="d-flex">
					<Form.Control
						type="search"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
					/>
					<Button variant="outline-success">Search</Button>
				</Form>
				<Nav.Link href="/Cart">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32.402"
						height="32"
						viewBox="0 0 32.402 32"
						id="cart"
					>
						<path d="M6 30a2 2 1080 1 0 4 0 2 2 1080 1 0-4 0zm18 0a2 2 1080 1 0 4 0 2 2 1080 1 0-4 0zM-.058 5a1 1 0 0 0 1 1H3.02l1.242 5.312L6 20c0 .072.034.134.042.204l-1.018 4.58A.997.997 0 0 0 6 26h22.688a1 1 0 0 0 0-2H7.248l.458-2.06c.1.016.19.06.294.06h18.23c1.104 0 1.77-.218 2.302-1.5l3.248-9.964C32.344 8.75 31.106 8 30 8H6c-.156 0-.292.054-.438.088l-.776-3.316A1 1 0 0 0 3.812 4H.942a1 1 0 0 0-1 1zm6.098 5h23.81l-3.192 9.798c-.038.086-.07.148-.094.19-.066.006-.17.012-.334.012H8v-.198l-.038-.194L6.04 10z"></path>
					</svg>
				</Nav.Link>
				<Nav.Link href="/login">Log Out</Nav.Link>
			</Container>
		</Navbar>
	);
};

export default NavBar;
