import "./App.css";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { useState } from "react";
import React from 'react';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS



function App() {
		const [userMessage, setUserMessage] = useState("")
    const [messageResponse, setMessageResponse] = useState(null)
    const myProcess = "EIRymq4W1WZPxZBktGzbi4XXkH29aUYwhrzjbn4WOhE" // change with smart contract ID
    
    const handleMessageChange = (event) => {
        setUserMessage(event.target.value);
    };


    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
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
              <div>
                <input
                    type="text"
                    placeholder="Search for a location"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Map searchQuery={searchQuery} />
              </div>
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
            <div className="center" style={{textAlign: 'center'}}>
              <p>
		        Images stored on arDrive {" "}
                <a className="lp-50"
		     href="https://app.ardrive.io/#/file/fec52c0d-6186-47d4-9444-cb93ac9d1891/view" //image deployed on the arDrive
		     target="_blank"
		     rel="noopener noreferrer"
                  >
				 here
		            </a>
                ! Forever!
              </p>
            </div>
			  </ArweaveWalletKit>
	  );
}

export default App;