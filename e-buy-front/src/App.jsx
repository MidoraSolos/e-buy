import React from "react";
import "./CSS/App.css";

import BaseRouter from "./Routes/BaseRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./Components/UserContext";

function App() {
	return (
		<>
			<UserProvider>
				<BaseRouter />
			</UserProvider>
		</>
	);
}

export default App;
