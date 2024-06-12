import React, { useState } from "react";
import "../CSS/AddBalance.css"; // Make sure to style your component

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
			alert("Please enter a valid amount.");
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
