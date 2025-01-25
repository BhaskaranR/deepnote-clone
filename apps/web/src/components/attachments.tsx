"use client";

import { useUpload } from "@/hooks/use-upload";
import { cn } from "@deepnote-clone/ui/cn";
import { useToast } from "@deepnote-clone/ui/use-toast";
import { stripSpecialCharacters } from "@deepnote-clone/utils";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

type Attachment = {
  id?: string;
  type: string;
  name: string;
  size: number;
};

type ReturnedAttachment = {
  path: string[];
  name: string;
  size: number;
  type: string;
};

type Props = {
  prefix: string;
  data?: Attachment[];
  teamId: string;
  onUpload: (files: ReturnedAttachment[]) => void;
};

export function Attachments({ prefix, data, teamId, onUpload }: Props) {
  const { toast } = useToast();
  const [files, setFiles] = useState<Attachment[]>([]);
  const { uploadFile } = useUpload();

  const handleOnDelete = async (id: string) => {
    setFiles((files) => files.filter((file) => file?.id !== id));
    // await deleteAttachmentAction(id);
  };

  const onDrop = async (acceptedFiles: Array<Attachment>) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((a) => ({
        name: stripSpecialCharacters(a.name),
        size: a.size,
        type: a.type,
        isUploading: true,
      })),
    ]);

    const uploadedFiles = await Promise.all(
      acceptedFiles.map(async (acceptedFile) => {
        const filename = stripSpecialCharacters(acceptedFile.name);

        const { path } = await uploadFile({
          bucket: "projects",
          path: [teamId, "projects", prefix, filename],
          file: acceptedFile,
        });

        return {
          path,
          name: filename,
          size: acceptedFile.size,
          type: acceptedFile.type,
        };
      }),
    );

    onUpload(uploadedFiles);
  };

  const handleOnSelectFile = (file) => {
    const filename = stripSpecialCharacters(file.name);

    const item = {
      name: filename,
      size: file.data.size,
      type: file.data.content_type,
      path: file.data.file_path,
    };

    setFiles((prev) => [item, ...prev]);
    onUpload([item]);
  };

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: ([reject]) => {
      if (reject?.errors.find(({ code }) => code === "file-too-large")) {
        toast({
          duration: 2500,
          variant: "error",
          title: "File size to large.",
        });
      }

      if (reject?.errors.find(({ code }) => code === "file-invalid-type")) {
        toast({
          duration: 2500,
          variant: "error",
          title: "File type not supported.",
        });
      }
    },
    maxSize: 3000000, // 3MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div>
      <div
        className={cn(
          "mt-4 w-full h-[120px] text-center flex flex-col justify-center space-y-1 transition-colors text-[#606060]",
          isDragActive && "bg-secondary text-primary",
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>
            <p className="text-xs">Import files</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <Upload className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-xs text-dark-gray">Upload CSVs, Parquet files or images. Files are shared with notebooks in this project.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}



