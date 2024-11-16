import { useState } from "react";

import "./App.css";

function App() {
  const [file, setFile] = useState(0);
  const [response, setResponse] = useState("");

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  return (
    <>
      <div>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          name="file"
        />
        <button onClick={uploadFile}>Get Description</button>
        <div>{response}</div>
      </div>
    </>
  );
}

export default App;
