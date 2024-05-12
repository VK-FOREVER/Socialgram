import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { FileUploaderProps } from "@/types";

//Fix it
const FileUpload = ({ fileUrl, fieldChange }: FileUploaderProps) => {
  const [file, setFile] = useState<Array<string>>([]);
  const [url, setUrl] = useState<string>(fileUrl || "");

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

  const MyDropzone = ({ setFile }: any) => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }: any) => setFile(uploadedFiles[0].fileUrl)}
      onComplete={setFile}
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
      setUrl(fileUrl);
      {
        console.log(fileUrl);
      }
      return (
        <p key={fileUrl}>
          <a href={fileUrl} target="_blank">
            The file URL{fileUrl}
          </a>
        </p>
      );
    });

  // const options = {
  //   apiKey: "free", // Get API keys from: www.bytescale.com
  //   maxFileCount: 1
  // };

  // function uploadFiles() {
  //   Bytescale.UploadWidget.open(options).then(
  //     files => alert(files.length === 0
  //                    ? "No files selected."
  //                    : `Files uploaded:\n\n${files.map(x => x.fileUrl).join("\n")}`),
  //     error => alert(error)
  //   );
  // }

  return (
    <>
      {file.length > 0 ? (
        <MyUploadedFiles className="w-full" files={file} />
      ) : (
        <MyDropzone className="w-full" setFiles={setFile} />
      )}
      <div className="w-full flex justify-center items-center p-4 flex-col">
        {/* <img
          className="w-2/3 h-2/4 rounded-lg bg-cover"
          src={file[0]?.fileUrl}
          alt="file"
        /> */}
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
