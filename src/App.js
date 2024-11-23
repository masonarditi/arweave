//import "globals.css";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { useState } from "react";
import React from 'react';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
  } from "./components/ui/card";
import { Button } from "./components/ui/button";
import UploadAndDisplayImage from "./components/ui/DisplayAndUploadImage"

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
		
		<div>
		
        <ArweaveWalletKit config={{
		    permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
			ensurePermissions: true
		    }}>
			<div className="text-left">
			  <div className="flex items-center ml-1">
                    <h1>Arweave Museum Archive</h1>
			  </div>
			  <Card>
				<CardHeader>
					<CardTitle>This is a header</CardTitle></CardHeader>
					<CardDescription>this is descript</CardDescription>
			  </Card>

			  <Button>Click me baby</Button>
			  <div>
				<Map searchQuery={searchQuery} />

			  </div>
				<h1>dumnotes</h1>
				<ConnectButton profileModal={true}/>
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

			<div className="App">
				<UploadAndDisplayImage /> 
			</div>
		</ArweaveWalletKit>
		</div>
	  );
}

export default App;