import { useSelector } from "react-redux";
import loadingSpinner from "../../images/green-loading-spinner.gif";
function Account () {
    const user = useSelector((state) => state.session.user);
    const portfolio = useSelector((state) => state.portfolio.portfolio)
    if (!user && !portfolio) {
        return (
					<div id="loading">
						<img src={loadingSpinner} alt="Loading..." />
					</div>
				);
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>Current Account Value: {user.buying_pwr}</h1>
            <button>Delete Account</button>
            <p>Deleting an account will liquidate all assets and transfer them to your bank.</p>
        </div>
    )
}

export default Account
