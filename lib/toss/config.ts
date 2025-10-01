// Toss Payments 설정

export const TOSS_CONFIG = {
  clientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!,
  secretKey: process.env.TOSS_SECRET_KEY!,
  securityKey: process.env.TOSS_SECURITY_KEY!,
  apiBaseUrl: 'https://api.tosspayments.com/v1',
} as const;

// Base64 인코딩된 Secret Key (서버 사이드 API 호출용)
export const getAuthHeader = () => {
  const secretKey = TOSS_CONFIG.secretKey + ':';
  const encodedKey = Buffer.from(secretKey).toString('base64');
  return `Basic ${encodedKey}`;
};
