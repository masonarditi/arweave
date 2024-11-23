import React, { useState } from "react";

// Define a functional component named UploadAndDisplayImage
// ... existing imports ...

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [base64String, setBase64String] = useState(null);
  
    // Function to convert file to base64
    const convertToBase64 = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setBase64String(base64);
        console.log('Base64:', base64);
      };
      reader.readAsDataURL(file);
    };
  
    return (
      <div>
        <h1>Upload and Display Image</h1>
        <h3>using React Hooks</h3>
  
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br /> <br />
            <button onClick={() => {
              setSelectedImage(null);
              setBase64String(null);
            }}>Remove</button>
            
          </div>
        )}
  
        <br />
  
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              setSelectedImage(file);
              convertToBase64(file);
              console.log(base64String)
            }
          }}
        />
      </div>
    );
  };
  
  export default UploadAndDisplayImage;