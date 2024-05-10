import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState, useEffect } from "react";
import { UrlBuilder } from "@bytescale/sdk";

const FileUpload = () => {
  const [files, setFiles] = useState<Array<any>>([]);
  const options = {
    apiKey: "free",

    maxFileCount: 1,
    showFinishButton: true,

    styles: {
      colors: {
        primary: "#377dff",
      },
    },
  };

  const MyDropzone = ({ setFiles }: any) => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }: any) =>
        console.log(
          `Files: ${uploadedFiles.map((x: any) => x.fileUrl).join("\n")}`
        )
      }
      onComplete={setFiles}
      width="600px"
      height="375px"
    />
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
        <MyUploadedFiles files={files} />
      ) : (
        <MyDropzone setFiles={setFiles} />
      )}
      <div className="w-full flex justify-center items-center p-4 flex-col">
        <img
          className="w-2/3 h-2/4 rounded-lg bg-cover"
          src={files[0].fileUrl}
          alt="file"
        />
        <a
          className="developed_by  flex justify-start w-full my-2 text-sm"
          href="https://www.bytescale.com/docs/upload-widget/react"
          target="_blank"
        >
          Powered by Bytescale
        </a>
      </div>
    </>
  );
};

export default FileUpload;
