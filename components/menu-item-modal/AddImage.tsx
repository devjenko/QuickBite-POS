"use client";
import { Button } from "../ui/Button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, Dispatch, SetStateAction, useState } from "react";
const AddImage = ({
  image,
  setImage,
}: {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Convert file to base64 without any cropping or compression
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleReset = () => {
    setSelectedFile(null);
    setImage(null);
  };
  if (!selectedFile && !image) {
    return (
      <div className="w-full">
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors"
        >
          <span className="text-sm text-muted-foreground">Choose an image</span>
        </label>
        <Input
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          type="file"
        />
      </div>
    );
  }
  if (image) {
    return (
      <div className="space-y-4">
        <div className="relative w-32 h-32">
          <Image
            alt="Cropped"
            fill
            src={image}
            unoptimized
            className="object-cover rounded"
          />
        </div>
        <Button
          onClick={handleReset}
          size="icon"
          type="button"
          variant="default"
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    );
  }
  return null;
};
export default AddImage;
