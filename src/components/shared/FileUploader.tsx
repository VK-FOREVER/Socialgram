import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState("");
  const [dropFile, setDropFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (file: FileWithPath[]) => {
      console.log(file);
      setDropFile(file);
      fieldChange(file);
      setFileUrl(URL.createObjectURL(file[0]));
    },
    [dropFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer  ${
        isDragActive && " border-2 shadow-md shadow-blue-400 border-blue-800"
      }`}
    >
      <input {...getInputProps()} className="cursor-pointer " />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="Image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag Photo to replace.</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" alt="Upload Files Here" />

          <h3 className="base-medium text-light-2 mb-2 mt-6 ">
            Drag your Images here.
          </h3>

          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button className="shad-button_dark_4">
            Select file form computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;