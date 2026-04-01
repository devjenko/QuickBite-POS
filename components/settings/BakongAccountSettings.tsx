"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SettingItem from "@/components/settings/SettingItem";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const BakongAccountSettings: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [savedAccountId, setSavedAccountId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [showInput, setShowInput] = useState<boolean>(false);

  // Load saved Bakong account ID on mount
  useEffect(() => {
    const loadBakongAccountId = async () => {
      try {
        const response = await fetch("/api/khqr/settings");

        // Handle authentication errors silently - user might not be on settings page yet
        if (response.status === 401) {
          console.debug("User not authenticated yet");
          setIsInitialLoading(false);
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to load settings (${response.status})`);
        }

        const data = await response.json();
        setSavedAccountId(data.bakongAccountId || null);
      } catch (error) {
        console.debug("Error loading Bakong account ID:", error instanceof Error ? error.message : error);
        // Don't show error to user - settings can still work
        // setSavedAccountId remains null and user can add one
      } finally {
        setIsInitialLoading(false);
      }
    };

    void loadBakongAccountId();
  }, []);

  const validateFormat = (accountId: string): boolean => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return pattern.test(accountId);
  };

  const handleSave = async () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      toast.error("Please enter a Bakong account ID");
      return;
    }

    if (!validateFormat(trimmedValue)) {
      toast.error("Invalid format. Use format: name@bankcode (e.g., brandon_jenkins@bkrt)");
      return;
    }

    setIsLoading(true);

    try {
      console.log("[BakongAccountSettings] Saving account ID:", trimmedValue);
      const response = await fetch("/api/khqr/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bakongAccountId: trimmedValue }),
      });

      console.log("[BakongAccountSettings] Response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Failed to save Bakong account ID";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseErr) {
          console.error("[BakongAccountSettings] Failed to parse error response:", parseErr);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("[BakongAccountSettings] Successfully saved:", data);

      setSavedAccountId(data.bakongAccountId);
      setInputValue("");
      setShowInput(false);
      toast.success("Bakong account ID saved successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save Bakong account ID";
      console.error("[BakongAccountSettings] Error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setInputValue(savedAccountId || "");
    setShowInput(true);
  };

  const handleCancel = () => {
    setInputValue("");
    setShowInput(false);
  };

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner className="size-5 text-[var(--Grey)]" />
      </div>
    );
  }

  return (
    <SettingItem
      label="Bakong Account ID"
      sublabel="Enter your Bakong account for dynamic QR code generation"
    >
      <div className="flex flex-col gap-3 w-full">
        {!showInput && savedAccountId ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm font-mono text-[var(--Black)] bg-[var(--LightGrey)] p-2 rounded">
                {savedAccountId}
              </p>
            </div>
            <Button
              onClick={handleEdit}
              variant="grey"
              className="whitespace-nowrap"
              disabled={isLoading}
            >
              Change
            </Button>
          </div>
        ) : null}

        {showInput && (
          <div className="flex flex-col gap-3 w-full">
            <Input
              type="text"
              placeholder="e.g., mystore@ababank"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <p className="text-xs text-[var(--Grey)]">
              Format: name@bankcode (e.g., mystore@ababank, restaurant@acleda)
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                variant="dark"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Spinner className="size-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                onClick={handleCancel}
                variant="grey"
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {!showInput && !savedAccountId && (
          <Button
            onClick={handleEdit}
            variant="dark"
            disabled={isLoading}
          >
            Add Bakong Account ID
          </Button>
        )}
      </div>
    </SettingItem>
  );
};

export default BakongAccountSettings;
