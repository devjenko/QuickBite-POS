"use client";
import { Button } from "../../ui/Button";
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

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          // Set max dimensions
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (width * MAX_HEIGHT) / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Enable high-quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG with good quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Could not compress image"));
                return;
              }
              const compressedReader = new FileReader();
              compressedReader.onloadend = () => {
                resolve(compressedReader.result as string);
              };
              compressedReader.onerror = reject;
              compressedReader.readAsDataURL(blob);
            },
            "image/jpeg",
            0.9
          );
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const compressedImage = await compressImage(file);
        setImage(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
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
