"use client";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from "@/components/ui/shadcn-io/image-crop";
import { Button } from "../ui/Button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";
import { Label } from "radix-ui";
const AddImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };
  const handleReset = () => {
    setSelectedFile(null);
    setCroppedImage(null);
  };
  if (!selectedFile) {
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
  if (croppedImage) {
    return (
      <div className="space-y-4">
        <Image
          alt="Cropped"
          height={100}
          src={croppedImage}
          unoptimized
          width={100}
        />
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
  return (
    <div className="space-y-4 ">
      <ImageCrop
        aspect={1}
        file={selectedFile}
        maxImageSize={1024 * 1024} // 1MB
        onChange={console.log}
        onComplete={console.log}
        onCrop={setCroppedImage}
      >
        <ImageCropContent className="max-w-md" />
        <div className="flex items-center gap-2">
          <ImageCropApply />
          <ImageCropReset />
          <Button
            onClick={handleReset}
            size="icon"
            type="button"
            variant="default"
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      </ImageCrop>
    </div>
  );
};
export default AddImage;
