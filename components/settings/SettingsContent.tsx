"use client";

import React, { useState } from "react";
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
import { toast } from "sonner";
import { UserMode } from "@/types/settings";
import Dropdown from "../shared/Dropdown";
import ConnectAccountModal from "./ConnectAccountModal";

interface SettingsState {
  // Payment Settings
  ABAConnected: boolean;
  WingConnected: boolean;
  acceptCardPayments: boolean;
  qrCodePayments: boolean;
  cashPayments: boolean;
  enableTipping: boolean;
  defaultTaxRate: string;

  // User Mode
  userMode: UserMode;

  // Display & Interface
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  darkMode: boolean;
  soundEffects: boolean;
}

const SettingsContent: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    // Payment Settings
    ABAConnected: false,
    WingConnected: false,
    acceptCardPayments: true,
    qrCodePayments: true,
    cashPayments: true,
    enableTipping: true,
    defaultTaxRate: "0",

    // User Modes
    userMode: "owner",

    // Display & Interface
    language: "en",
    currency: "usd",
    dateFormat: "mm-dd-yyyy",
    timeFormat: "12h",
    darkMode: false,
    soundEffects: true,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [merchantId, setMerchantId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handler functions
  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleABAConnect = () => {
    setIsLoading(true);
    console.log("Connecting to ABA...");

    try {
    } catch (error) {}
  };

  const handleABADisconnect = () => {
    console.log("Disconnecting from ABA...");
    updateSetting("ABAConnected", false);
  };

  const handleWingConnect = () => {
    console.log("Connecting to Wing...");
    updateSetting("WingConnected", true);
  };

  const handleWingDisconnect = () => {
    console.log("Disconnecting from Wing...");
    updateSetting("WingConnected", false);
  };

  return (
    <>
      <h1 className="mb-8 text-black">Settings</h1>

      {/* Payment Settings Section */}
      <SettingsSection
        title="Payment Settings"
        description="Manage your payment processing and transaction preferences"
      >
        <ConnectAccountCard
          name="ABA Merchant"
          img="/logos/aba_bank_logo.webp"
          isConnected={settings.ABAConnected}
          onConnect={() => setIsOpen(true)}
          onDisconnect={handleABADisconnect}
        />

        <ConnectAccountModal
          title="Connect ABA PayWay Account"
          description="Enter your ABA PayWay Merchant credentials to start accepting payments"
          helpText="Don't have an ABA Merchant account yet?"
          helpLink={{
            text: "Download the ABA Merchant App here",
            href: "https://www.ababank.com/en/aba-merchant-app/",
          }}
          fields={[
            {
              label: "Merchant ID",
              placeholder: "eg., eh629400",
              type: "text",
              required: true,
              value: merchantId,
              onChange: setMerchantId,
            },
            {
              label: "API Key",
              placeholder: "Your API Key",
              type: "password",
              required: true,
              value: apiKey,
              onChange: setApiKey,
            },
          ]}
          onConnect={handleABAConnect}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />

        <ConnectAccountCard
          isConnected={settings.WingConnected}
          onConnect={handleWingConnect}
          onDisconnect={handleWingDisconnect}
          name="Wing Merchant"
          img="/logos/wing_bank_logo.webp"
        />

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
