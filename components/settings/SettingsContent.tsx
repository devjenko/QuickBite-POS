"use client";

import React, { useState, useEffect } from "react";
import ToggleSwitch from "@/components/settings/ToggleSwitch";
import SettingsSection from "@/components/settings/SettingsSection";
import SettingItem from "@/components/settings/SettingItem";
import {
  taxRateOptions,
  languageOptions,
  currencyOptions,
  dateFormatOptions,
  timeFormatOptions,
} from "@/consts/settings";
import ConnectAccountCard from "@/components/settings/ConnectAccountCard";
import UserModeOption from "@/components/settings/UserModeOption";
import { UserMode } from "@/types/settings";
import Dropdown from "../shared/Dropdown";

interface SettingsState {
  acceptCardPayments: boolean;
  qrCodePayments: boolean;
  cashPayments: boolean;
  defaultTaxRate: string;
  userMode: UserMode;
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  darkMode: boolean;
  soundEffects: boolean;
}

const BANKS = [
  { name: "ABA Pay", img: "/logos/aba_bank_logo.webp" },
  { name: "Wing Money", img: "/logos/wing_bank_logo.webp" },
];

const SettingsContent: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    acceptCardPayments: true,
    qrCodePayments: true,
    cashPayments: true,
    defaultTaxRate: "0",
    userMode: "owner",
    language: "en",
    currency: "usd",
    dateFormat: "mm-dd-yyyy",
    timeFormat: "12h",
    darkMode: false,
    soundEffects: true,
  });

  const [uploadedBanks, setUploadedBanks] = useState<Set<string>>(new Set());
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/bank-qr");
        if (!response.ok) return;
        const data = await response.json();

        if (!cancelled) {
          setUploadedBanks(
            new Set(data.qrCodes.map((qr: { bankName: string }) => qr.bankName))
          );
        }
      } catch (error) {
        console.error("Failed to fetch uploaded banks:", error);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const handleUploadSuccess = () => {
    setReloadToken((token) => token + 1);
  };

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <h1 className="mb-8 text-black">Settings</h1>

      {/* Payment Settings Section */}
      <SettingsSection
        title="Payment Settings"
        description="Upload your bank QR codes to accept payments"
      >
        {BANKS.map((bank) => (
          <ConnectAccountCard
            key={bank.name}
            name={bank.name}
            img={bank.img}
            isUploaded={uploadedBanks.has(bank.name)}
            onUploadSuccess={handleUploadSuccess}
          />
        ))}

        <div>
          <SettingItem
            label="Accept Card Payments"
            sublabel="Allow customers to pay with credit/debit cards"
          >
            <ToggleSwitch
              checked={settings.acceptCardPayments}
              onChange={(checked) =>
                updateSetting("acceptCardPayments", checked)
              }
            />
          </SettingItem>

          <SettingItem
            label="QR Code Payments"
            sublabel="Enable QR scanning for quick checkout"
          >
            <ToggleSwitch
              checked={settings.qrCodePayments}
              onChange={(checked) => updateSetting("qrCodePayments", checked)}
            />
          </SettingItem>

          <SettingItem
            label="Cash Payments"
            sublabel="Accept cash and track cash transactions"
          >
            <ToggleSwitch
              checked={settings.cashPayments}
              onChange={(checked) => updateSetting("cashPayments", checked)}
            />
          </SettingItem>

          <SettingItem
            label="Default Tax Rate"
            sublabel="Applied to all menu items unless overridden"
            isLast
          >
            <Dropdown
              value={settings.defaultTaxRate}
              onValueChange={(value: string) =>
                updateSetting("defaultTaxRate", value)
              }
              options={taxRateOptions}
            />
          </SettingItem>
        </div>
      </SettingsSection>

      {/* User Modes Section */}
      <SettingsSection
        title="User Modes"
        description="Control access levels and permissions for different users"
      >
        <UserModeOption
          title="Owner Mode"
          description="Add / remove menu items. View detailed analytics and personal information on the dashboard. Full access to all settings and financial reports."
          isActive={settings.userMode === "owner"}
          onClick={() => updateSetting("userMode", "owner")}
        />

        <UserModeOption
          title="Staff Mode"
          description="Add / remove menu items disabled, limited viewable dashboard information. Only order taking / checking out allowed. No access to financial data or system settings."
          isActive={settings.userMode === "staff"}
          onClick={() => updateSetting("userMode", "staff")}
        />
      </SettingsSection>

      {/* Display & Interface Section */}
      <SettingsSection
        title="Display & Interface"
        description="Customize how your POS system looks and behaves"
      >
        <div>
          <SettingItem
            label="Language"
            sublabel="Choose your preferred language"
          >
            <Dropdown
              value={settings.language}
              onValueChange={(value) => updateSetting("language", value)}
              options={languageOptions}
            />
          </SettingItem>

          <SettingItem
            label="Currency"
            sublabel="Default currency for transactions"
          >
            <Dropdown
              value={settings.currency}
              onValueChange={(value) => updateSetting("currency", value)}
              options={currencyOptions}
            />
          </SettingItem>

          <SettingItem label="Date Format" sublabel="How dates are displayed">
            <Dropdown
              value={settings.dateFormat}
              onValueChange={(value) => updateSetting("dateFormat", value)}
              options={dateFormatOptions}
            />
          </SettingItem>

          <SettingItem label="Time Format" sublabel="12-hour or 24-hour clock">
            <Dropdown
              value={settings.timeFormat}
              onValueChange={(value) => updateSetting("timeFormat", value)}
              options={timeFormatOptions}
            />
          </SettingItem>

          <SettingItem
            label="Dark Mode"
            sublabel="Use dark theme for reduced eye strain"
          >
            <ToggleSwitch
              checked={settings.darkMode}
              onChange={(checked) => updateSetting("darkMode", checked)}
            />
          </SettingItem>

          <SettingItem
            label="Sound Effects"
            sublabel="Play sounds for button clicks and notifications"
            isLast
          >
            <ToggleSwitch
              checked={settings.soundEffects}
              onChange={(checked) => updateSetting("soundEffects", checked)}
            />
          </SettingItem>
        </div>
      </SettingsSection>
    </>
  );
};

export default SettingsContent;
