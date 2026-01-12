export type UserMode = "owner" | "staff";

export interface SettingsData {
  acceptCardPayments?: boolean;
  qrCodePayments?: boolean;
  cashPayments?: boolean;
  defaultTaxRate?: string | number;
  userMode?: UserMode;
  language?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
  darkMode?: boolean;
}

export interface SettingsState {
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
}