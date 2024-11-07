import "./App.css";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { useState } from "react";

function App() {
		const [userMessage, setUserMessage] = useState("")
    const [messageResponse, setMessageResponse] = useState(null)
    const myProcess = "EIRymq4W1WZPxZBktGzbi4XXkH29aUYwhrzjbn4WOhE"
    
    const handleMessageChange = (event) => {
        setUserMessage(event.target.value);
    };
    
    async function sendAOMessage() {
		    const response = await message({
		        process: myProcess,
		        tags: [{ name: "Action", value: "Dumify" }],
		        signer: createDataItemSigner(window.arweaveWallet),
		        data: userMessage
		    })
		    const r = await result({
		        message: response,
		        process: myProcess
		    });
		    setMessageResponse(r.Messages[0].Data)
    }
    
    return (
        <ArweaveWalletKit config={{
		        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
		        ensurePermissions: true
		    }}>
				    <div className="App">
						    <h1>dumnotes</h1>
						    <ConnectButton profileModal={true} />
						    <input 
								    type="text"
								    value={userMessage}
								    onChange={handleMessageChange}
								    placeholder="Hello World!" 
								 />
								 <button onClick={sendAOMessage}>send message</button>
								 <p>{messageResponse || ""}</p>
					  </div>
			  </ArweaveWalletKit>
	  );
}

export default App;