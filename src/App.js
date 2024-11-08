import "./App.css";
import * as arweaveWalletKit from "arweave-wallet-kit";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { useState } from "react";
import React from 'react';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import {
	Card,
	CardHeader,
	CardTitle,
  } from "./components/ui/card"


function App() {
		const [userMessage, setUserMessage] = useState("")
    const [messageResponse, setMessageResponse] = useState(null)
    const myProcess = "EIRymq4W1WZPxZBktGzbi4XXkH29aUYwhrzjbn4WOhE" // change with smart contract ID
    
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
        <arweaveWalletKit.ArweaveWalletKit config={{
		    permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
			ensurePermissions: true
		    }}>
			<div className="App text-left">
			  <div className="flex items-center ml-1">
                    <h1>Arweave Museum Archive</h1>
			  </div>
			  <Card>
				<CardHeader>
					<CardTitle className="text-blue-500">This is a header</CardTitle></CardHeader>
			  </Card>
			  <Map/>
				<h1>dumnotes</h1>
				<arweaveWalletKit.ConnectButton profileModal={true}/>
					<input 
						type="text"
						value={userMessage}
						onChange={handleMessageChange}
						placeholder="Hello World!" 
						className="border rounded px-2 py-1"
					/>
				<button 
					onClick={sendAOMessage}
					className="bg-blue-500 text-white px-4 py-1 rounded ml-2 hover:bg-blue-600"
				>
					send message
				</button>
				<p>{messageResponse || ""}</p>
			</div>
            <div className="text-center">
              <p>
		        Images stored on arDrive {" "}
                <a className="text-blue-500 hover:text-blue-700"
					href="https://app.ardrive.io/#/file/fec52c0d-6186-47d4-9444-cb93ac9d1891/view" //image deployed on the arDrive
					target="_blank"
					rel="noopener noreferrer">
					here
				</a>
                ! Forever!
              </p>
            </div>
		</arweaveWalletKit.ArweaveWalletKit>
	  );
}

export default App;