"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToggleSwitch from "@/components/settings/ToggleSwitch";
import Section from "@/components/shared/Section";
import SettingItem from "@/components/settings/SettingItem";
import { useDebouncedCallback } from "use-debounce";
import {
  taxRateOptions,
  languageOptions,
  currencyOptions,
  dateFormatOptions,
  timeFormatOptions,
} from "@/consts/settings";
import ConnectAccountCard from "@/components/settings/ConnectAccountCard";
import UserModeOption from "@/components/settings/UserModeOption";
import { SettingsState } from "@/types/settings";
import Dropdown from "@/components/shared/Dropdown";
import { useBankQRCodes } from "@/lib/hooks/useBankQRCodes";
import { updateSettings } from "@/app/actions/settings";

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
  });

  const { qrCodes, refresh: refreshQRCodes } = useBankQRCodes();
  const uploadedBanks = new Set(qrCodes.map((qr) => qr.bankName));

  // Debounced save settings to database
  const saveSettings = useDebouncedCallback(async (newSettings: SettingsState) => {
    try {
      await updateSettings(newSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, 500);

  const updateSetting = useCallback(
    (key: keyof SettingsState, value: SettingsState[keyof SettingsState]) => {
      setSettings((prev) => {
        const newSettings = { ...prev, [key]: value };
        saveSettings(newSettings);
        return newSettings;
      });
    },
    [saveSettings]
  );

  // Load settings on mount
  useEffect(() => {
    let cancelled = false;

    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (!response.ok) return;
        const data = await response.json();

        if (!cancelled) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    void loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUploadSuccess = () => {
    refreshQRCodes();
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-black">Settings</h1>

      <Section title="Payment Settings" description="Upload your bank QR codes to accept payments">
        {BANKS.map((bank) => (
          <ConnectAccountCard
            key={bank.name}
            name={bank.name}
            img={bank.img}
            isUploaded={uploadedBanks.has(bank.name)}
            onUploadSuccess={handleUploadSuccess}
          />
        ))}

        <div className="mt-4">
          <SettingItem label="QR Code Payments" sublabel="Enable QR scanning for quick checkout">
            <ToggleSwitch
              checked={settings.qrCodePayments}
              onChange={(checked) => updateSetting("qrCodePayments", checked)}
            />
          </SettingItem>

          <SettingItem label="Cash Payments" sublabel="Accept cash and track cash transactions">
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
              onValueChange={(value: string) => updateSetting("defaultTaxRate", value)}
              options={taxRateOptions}
            />
          </SettingItem>
        </div>
      </Section>

      <Section
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
      </Section>

      <Section
        title="Display & Interface"
        description="Customize how your POS system looks and behaves"
      >
        <SettingItem label="Language" sublabel="Choose your preferred language">
          <Dropdown
            value={settings.language}
            onValueChange={(value) => updateSetting("language", value)}
            options={languageOptions}
          />
        </SettingItem>

        <SettingItem label="Currency" sublabel="Default currency for transactions">
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

        <SettingItem label="Dark Mode" sublabel="Use dark theme for reduced eye strain" isLast>
          <ToggleSwitch
            checked={settings.darkMode}
            onChange={(checked) => updateSetting("darkMode", checked)}
          />
        </SettingItem>
      </Section>
    </div>
  );
};

export default SettingsContent;
