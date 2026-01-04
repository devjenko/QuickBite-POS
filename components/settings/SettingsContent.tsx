"use client";

import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import SettingsSection from "./SettingsSection";
import SettingItem from "./SettingItem";
import Select, { SelectOption } from "./Select";
import ConnectAccountCard from "./ConnectAccountCard";
import UserModeOption from "./UserModeOption";

type UserMode = "owner" | "staff";

interface SettingsState {
  // Payment Settings
  stripeConnected: boolean;
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
    stripeConnected: false,
    acceptCardPayments: true,
    qrCodePayments: true,
    cashPayments: true,
    enableTipping: true,
    defaultTaxRate: "7",

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

  // Handler functions
  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleStripeConnect = () => {
    console.log("Connecting to Stripe...");
    updateSetting("stripeConnected", true);
  };

  const handleStripeDisconnect = () => {
    console.log("Disconnecting from Stripe...");
    updateSetting("stripeConnected", false);
  };

  // Options for dropdowns
  const taxRateOptions: SelectOption[] = [
    { value: "0", label: "0%" },
    { value: "5", label: "5%" },
    { value: "7", label: "7%" },
    { value: "10", label: "10%" },
    { value: "custom", label: "Custom" },
  ];

  const languageOptions: SelectOption[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
  ];

  const currencyOptions: SelectOption[] = [
    { value: "usd", label: "USD ($)" },
    { value: "eur", label: "EUR (€)" },
    { value: "gbp", label: "GBP (£)" },
    { value: "jpy", label: "JPY (¥)" },
    { value: "cad", label: "CAD ($)" },
  ];

  const dateFormatOptions: SelectOption[] = [
    { value: "mm-dd-yyyy", label: "MM/DD/YYYY" },
    { value: "dd-mm-yyyy", label: "DD/MM/YYYY" },
    { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
  ];

  const timeFormatOptions: SelectOption[] = [
    { value: "12h", label: "12-hour (2:30 PM)" },
    { value: "24h", label: "24-hour (14:30)" },
  ];

  return (
    <>
      <h1 className="mb-8 text-black">Settings</h1>

      {/* Payment Settings Section */}
      <SettingsSection
        title="Payment Settings"
        description="Manage your payment processing and transaction preferences"
      >
        <ConnectAccountCard
          isConnected={settings.stripeConnected}
          onConnect={handleStripeConnect}
          onDisconnect={handleStripeDisconnect}
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
            label="Enable Tipping"
            sublabel="Show tip options at checkout"
          >
            <ToggleSwitch
              checked={settings.enableTipping}
              onChange={(checked) => updateSetting("enableTipping", checked)}
            />
          </SettingItem>

          <SettingItem
            label="Default Tax Rate"
            sublabel="Applied to all menu items unless overridden"
            isLast
          >
            <Select
              value={settings.defaultTaxRate}
              onChange={(value) => updateSetting("defaultTaxRate", value)}
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
            <Select
              value={settings.language}
              onChange={(value) => updateSetting("language", value)}
              options={languageOptions}
            />
          </SettingItem>

          <SettingItem
            label="Currency"
            sublabel="Default currency for transactions"
          >
            <Select
              value={settings.currency}
              onChange={(value) => updateSetting("currency", value)}
              options={currencyOptions}
            />
          </SettingItem>

          <SettingItem label="Date Format" sublabel="How dates are displayed">
            <Select
              value={settings.dateFormat}
              onChange={(value) => updateSetting("dateFormat", value)}
              options={dateFormatOptions}
            />
          </SettingItem>

          <SettingItem label="Time Format" sublabel="12-hour or 24-hour clock">
            <Select
              value={settings.timeFormat}
              onChange={(value) => updateSetting("timeFormat", value)}
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
