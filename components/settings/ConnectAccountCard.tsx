"use client";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import { Upload } from "lucide-react";

interface ConnectAccountCardProps {
  name: string;
  img: string;
  isUploaded: boolean;
  onUploadSuccess: () => void;
}

const ConnectAccountCard: React.FC<ConnectAccountCardProps> = ({
  name,
  img,
  isUploaded,
  onUploadSuccess,
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bankName", name);

      const response = await fetch("/api/bank-qr/upload", {
        method: "POST",
        body: formData,
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || "Upload failed");
      }

      if (!response.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      toast.success(`${name} QR code uploaded successfully`);
      onUploadSuccess();
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload QR code";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <ContentWrapper className="mb-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex items-center justify-center shrink-0 w-16 h-16 bg-[var(--LightGrey)] rounded-sm overflow-hidden">
            <Image
              width={60}
              height={60}
              src={img}
              alt={`${name} logo`}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold text-[var(--Black)] mb-1">
              {name}
            </div>
            <div className="text-xxsmall text-[var(--Grey)] mb-2">
              {isUploaded
                ? `Your ${name} QR code is uploaded and ready to accept payments`
                : `Upload your ${name} QR code to accept payments from customers`}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xxxsmall font-medium ${
                  isUploaded
                    ? "bg-[var(--Green)] bg-opacity-10 text-[var(--White)]"
                    : "bg-[var(--Red)] bg-opacity-10 text-[var(--White)]"
                }`}
              >
                {isUploaded ? "Uploaded" : "Not Uploaded"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="dark"
            disabled={uploading}
            className="min-w-[120px] justify-center"
          >
            {uploading ? (
              <>
                <Spinner className="size-4" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="size-4" />
                <span>Upload</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ConnectAccountCard;
