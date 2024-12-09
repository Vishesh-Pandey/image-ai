import { useState } from "react";

import "./App.css";

function App() {
  const [file, setFile] = useState(0);
  const [response, setResponse] = useState("");

  const uploadFile = async () => {
    try {
      const response = await fetch(
        "https://yy7hxj3veyehvuimd66jw42vuy0bvzmj.lambda-url.us-east-1.on.aws"
      );
      const data = await response.text();
      console.log("Data is ", data);
      setResponse(data);
    } catch (error) {
      console.log("Something went wrong ", error);
    }

    console.log("Fetching description");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        "https://yy7hxj3veyehvuimd66jw42vuy0bvzmj.lambda-url.us-east-1.on.aws/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.text();
      console.log("Data is ", data);
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
