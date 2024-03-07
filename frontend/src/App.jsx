import { useRef, useState, useEffect } from "react";
import { UploadFile } from "./api";
import { MdUpload } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import "./App.css";

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await UploadFile(data);
        setUrl(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL to clipboard", err);
      });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 8000);
  };

  return (
    <div
      style={{
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(45,121,9,1) 0%, rgba(0,212,255,1) 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          background: "#fff",
          maxWidth: "600px",
          width: "90%",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#04AA6D" }}
        >
          {" "}
          Simple, Secure File Transfer
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#666" }}>
          {" "}
          Upload and share download link
        </p>
        <button
          style={{
            padding: "12px 24px",
            margin: "20px 0px",
            fontSize: "1.2rem",
            backgroundColor: "#04AA6D",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "background-color 0.3s, color 0.3s, transform 0.3s",
            backgroundImage: "linear-gradient(to right, #04AA6D, #2CBBB5)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          onClick={onUploadClick}
        >
          <MdUpload style={{ marginRight: "5px" }} />
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {url && (
          <div
            style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
            className="copy-text"
          >
            <a
              className="text"
              href={url}
              rel="noreferrer"
              target="_blank"
              style={{
                fontSize: "1.1rem",
                textDecoration: "none",
                color: "#000",
                marginRight: "10px",
                border: "2px solid #04AA6D",
                borderRadius: "5px",
                padding: "7px 10px",
                display: "inline-block",
              }}
            >
              {url}
            </a>
            <button
              style={{
                padding: "10px 14px",
                fontSize: "1.2rem",
                backgroundColor: "#04AA6D",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s, transform 0.3s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              onClick={copyToClipboard}
            >
              <IoCopyOutline />
            </button>
            {copied && (
              <div
                style={{
                  marginLeft: "10px",
                  display: "inline-block",
                  padding: "7px 10px", 
                  backgroundColor: "rgba(0, 128, 0, 0.1)", 
                  border: "1px solid green", 
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    color: "green",
                    fontSize: "1.1rem",
                  }}
                >
                  Copied!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
