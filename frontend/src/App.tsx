import { useState } from "react";

import "./App.css";

import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async () => {
    setLoading(true);
    console.log("Fetching description");
    const formData = new FormData();
    if (file !== null) {
      formData.append("file", file);
    }
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
    setLoading(false);
  };

  return (
    <>
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            onChange={(e) => {
              if (e.target.files !== null) {
                setFile(e.target.files[0]);
              }
            }}
            id="picture"
            type="file"
          />
        </div>

        <Button onClick={uploadFile}>Get Description</Button>

        {loading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
