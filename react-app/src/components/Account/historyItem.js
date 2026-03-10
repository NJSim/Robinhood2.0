function HistoryItem({transaction}){
    return (
			<div id="transaction-info">
				<div>
					<h1 style={{ fontSize: 25 }}>
						{transaction.asset_symbol}
						{transaction.buy ? (
							<p
								style={{
									color: "#00C806",
									display: "inline",
									fontSize: 16,
									paddingLeft: 7,
								}}
							>
								Buy
							</p>
						) : (
							<p
								style={{
									color: "#FF5000",
									display: "inline",
									fontSize: 16,
									paddingLeft: 7,
								}}
							>
								Sell
							</p>
						)}
					</h1>
					<h5>{transaction.created_at}</h5>
				</div>
				<div style={{ margin: "0 0 0 auto" }}>
					<h2 style={{ margin: 0, textAlign: "right" }}>
						${(transaction.order_price * transaction.shares).toFixed(2)}
					</h2>
					<h6 style={{ margin: 0 }}>
						{transaction.shares > 1
							? `${transaction.shares} shares `
							: `${transaction.shares} share `}
						at ${transaction.order_price}
					</h6>
				</div>
			</div>
		);
}

export default HistoryItem;
