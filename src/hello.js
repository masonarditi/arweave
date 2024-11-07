import "./App.css";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";

function App() {
		return (
		    <ArweaveWalletKit config={{
			      permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
			      ensurePermissions: true
			  }}>
				    <div className="App">
						    <h1>dumnotes</h1>
						    <ConnectButton profileModal={true} />
						</div>
				</ArweaveWalletKit>
		);
}

export default App;