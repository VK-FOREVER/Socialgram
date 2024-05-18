import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadButton } from "@bytescale/upload-widget-react";

// ---------------------------
// Configuration
// See: https://www.bytescale.com/docs/upload-widget#configuration
// ---------------------------
const options = {
  apiKey: "free", // Get API keys from: www.bytescale.com
  maxFileCount: 1,
  styles: {
    colors: {
      primary: "#377dff",
    },
  },
};

// --------------------------
// Create an upload button...
// --------------------------

const MyUploadButton = ({ setFiles }: any) => (
  <UploadButton options={options} onComplete={setFiles}>
    {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
  </UploadButton>
);

// -----------------------------
// Display the uploaded files...
// -----------------------------

const MyUploadedFiles = ({ files }: any) =>
  files.map((file: any) => {
    // Save 'filePath' to your DB, and construct URLs using UrlBuilder:
    const { filePath, accountId } = file;
    // Build an image transformation URL for the uploaded file.
    // Remove 'options' to get the URL to the original file:
    const fileUrl = UrlBuilder.url({
      filePath,
      accountId,
      options: {
        transformation: "preset",
        transformationPreset: "thumbnail",
      },
    });
    return (
      <>
        <img src={fileUrl} alt="Image" />
        <p key={fileUrl}>
          <a href={fileUrl} target="_blank">
            {fileUrl}
          </a>
        </p>
      </>
    );
  });

// ----------------------
// Run the application...
// ----------------------

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  return (
    <>
      {files.length ? (
        <MyUploadedFiles files={files} />
      ) : (
        <MyUploadButton setFiles={setFiles} />
      )}
      <a
        className="developed_by"
        href="https://www.bytescale.com/docs/upload-widget/react"
        target="_blank"
      >
        Powered by Bytescale
      </a>
    </>
  );
};

export default FileUploader;
