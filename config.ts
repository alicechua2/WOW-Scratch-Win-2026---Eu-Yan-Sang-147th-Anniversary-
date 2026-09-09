import { WidgetConfig } from './types';

export const widgetConfig: WidgetConfig = {
  voucherOptions: [
    { label: 'RM5 OFF', code: 'EYS147-RM5-DUMMY' },
    { label: 'RM10 OFF', code: 'EYS147-RM10-DUMMY' },
    { label: 'RM20 OFF', code: 'EYS147-RM20-DUMMY' },
    { label: 'RM50 OFF', code: 'EYS147-RM50-DUMMY' },
    { label: 'RM100 OFF', code: 'EYS147-RM100-DUMMY' },
    { label: 'RM1000 OFF', code: 'EYS147-RM1000-DUMMY' },
  ],
  correctAnswerIsYes: true,
  validUntil: '31/10/2026',
  storeUrl: 'https://www.euyansang.com.my/en_MY/home'
};
