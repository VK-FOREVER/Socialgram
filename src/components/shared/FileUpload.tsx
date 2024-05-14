import { UploadButton, UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { FileUploaderProps } from "@/types";

//Fix it
const FileUpload = () => {
  const [files, setFiles] = useState<string>("");
  const options = {
    apiKey: "free", // Get API keys from: www.bytescale.com
    maxFileCount: 1,
    styles: {
      colors: {
        primary: "#377dff",
      },
    },
  };

  // const MyUploadButton = ({ setFiles }: any) => (
  //   <UploadButton options={options} onComplete={setFiles}>
  //     {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
  //   </UploadButton>
  // );

  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) =>
      // console.log()
      setFiles(uploadedFiles[0].fileUrl)
    }
    onComplete={(files) => console.log(files)}
    width="600px"
    height="375px"
  />;

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
        <p key={fileUrl}>
          <a href={fileUrl} target="_blank">
            {fileUrl}
          </a>
        </p>
      );
    });

  return (
    <>
      {files.length ? (
        <MyUploadedFiles className="myUploadFiles" files={files} />
      ) : (
        <UploadDropzone className="uploadDropzone" options={options} />
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

export default FileUpload;
