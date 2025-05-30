exports.processPayment = async (amount, orderId) => {
	try {
		await new Promise((resolve) =>
			setTimeout(resolve, Math.random() * 2000 + 1000)
		)
		const success = Math.random() > 0.3

		const transactionId = `txn_${orderId}_${Date.now()}`
		if (success) {
			return {
				success: true,
				transactionId,
				message: "Payment processed successfully",
			}
		} else {
			throw new Error("Payment failed. Insufficient funds or network error.")
		}
	} catch (error) {
		return {
			success: false,
			message: "Payment processing failed",
		}
	}
}
