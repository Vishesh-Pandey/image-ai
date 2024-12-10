import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "./components/ui/skeleton";
import { Navbar } from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async () => {
    setLoading(true);
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
      setResponse(data);
    } catch (error) {
      console.log("Error is ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setResponse("");
  }, [file]);

  return (
    <>
      <Toaster />

      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 border-r-2 h-">
          <div className="grid w-full max-w-sm items-center gap-1.5">
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

          {file && (
            <div className="py-10">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full max-w-xs rounded-md shadow-md"
              />
            </div>
          )}
        </div>
        <div className="md:w-3/4 p-4">
          <div>
            <Button disabled={!file || loading} onClick={uploadFile}>
              Get Description
            </Button>
            <Button
              disabled={!response}
              className="mx-3"
              onClick={() => {
                toast("Response copied to clipboard.");
                navigator.clipboard.writeText(response);
              }}
            >
              <i className="bi bi-clipboard"></i>
            </Button>

            {loading ? (
              <div className="flex flex-col space-y-3 py-10">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <div className="py-10">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
