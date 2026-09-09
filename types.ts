export interface VoucherOption {
  label: string;
  code: string;
}

export interface UserDetails {
  fullName: string;
  email: string;
  ic: string;
}

export interface WidgetConfig {
  voucherOptions: VoucherOption[];
  correctAnswerIsYes: boolean;
  validUntil: string;
  storeUrl: string;
}
