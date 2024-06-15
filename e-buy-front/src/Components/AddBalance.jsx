import React, { useState } from "react";
import "../CSS/AddBalance.css";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AddBalance = ({ closeAddBalance, addFunds }) => {
	const [customAmount, setCustomAmount] = useState("");

	const handleCustomAmountChange = (e) => {
		setCustomAmount(e.target.value);
	};

	const handleAddCustomAmount = () => {
		const amount = parseFloat(customAmount);
		if (!isNaN(amount) && amount > 0) {
			addFunds(amount);
			setCustomAmount("");
		} else {
			Swal.fire({
				title: "Enter Valid Amount",

				icon: "error",
				confirmButtonText: "Ok",
			});
		}
	};

	return (
		<div className="balance-section">
			<div className="balance-content">
				<h2>Add Funds</h2>
				<button onClick={() => addFunds(20)}>$20</button>
				<button onClick={() => addFunds(50)}>$50</button>
				<button onClick={() => addFunds(100)}>$100</button>
				<button onClick={() => addFunds(500)}>$500</button>
				<div className="custom-amount">
					<input
						type="number"
						value={customAmount}
						onChange={handleCustomAmountChange}
						placeholder="Enter custom amount"
					/>
					<button onClick={handleAddCustomAmount}>Add Custom Amount</button>
				</div>
				<button onClick={closeAddBalance}>Cancel</button>
			</div>
		</div>
	);
};

export default AddBalance;
