"use client";

import { BaseModalProps } from "@/components/shared/BaseModal";
import { Input } from "@/components/ui/Input";
import BaseModal from "@/components/shared/BaseModal";
import { Label } from "@/components/ui/Label";
import Link from "next/link";

interface ConnectAccountField {
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

interface ConnectAccountModalProps extends BaseModalProps {
  fields: ConnectAccountField[];
  onConnect: (e: React.FormEvent) => void;
  helpText?: string;
  helpLink: {
    text: string;
    href: string;
  };
}

const ConnectAccountModal = ({
  isOpen,
  setIsOpen,
  onConnect,
  fields,
  isLoading,
  title,
  description,
  helpText,
  helpLink,
}: ConnectAccountModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      btnName="Connect"
      title={title}
      description={description}
      onSubmit={onConnect}
      isLoading={isLoading}
    >
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={`field-${index}`}>
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          <Input
            id={`field-${index}`}
            type={field.type || "text"}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            disabled={isLoading}
          />
        </div>
      ))}
      <div className="flex flex-col gap-4 mt-2 text-xxxsmall mb-2">
        {helpText && (
          <Link href={helpLink.href} target="__blank">
            {helpText}{" "}
            <span className="underline"> {helpLink && helpLink.text}</span>
          </Link>
        )}
      </div>
    </BaseModal>
  );
};

export default ConnectAccountModal;
