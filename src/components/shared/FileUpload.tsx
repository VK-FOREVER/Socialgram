import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { FileUploaderProps } from "@/types";

const FileUpload = ({ fieldChange, fileUrl }: FileUploaderProps) => {
  const [files, setFiles] = useState<string>("" || fileUrl);
  const options = {
    apiKey: "free",
    maxFileCount: 1,
    styles: {
      colors: {
        primary: "#377dff",
      },
    },
  };

  console.log({ fieldChange, fileUrl });

  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) => setFiles(uploadedFiles[0].fileUrl)}
    onComplete={(files) => console.log(files)}
    width="600px"
    height="375px"
  />;

  const MyUploadedFiles = ({ files }: any) =>
    files.map((file: any) => {
      const { filePath, accountId } = file;
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
