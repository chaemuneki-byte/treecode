import { TOSS_CONFIG, getAuthHeader } from './config';
import {
  BillingKeyRequest,
  BillingKeyResponse,
  BillingPaymentRequest,
  PaymentResponse,
} from './types';

// 빌링키 발급
export async function issueBillingKey(data: BillingKeyRequest): Promise<BillingKeyResponse> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/billing/authorizations/issue`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '빌링키 발급 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Billing key issue error:', error);
    throw error;
  }
}

// 빌링키로 결제 요청
export async function requestBillingPayment(
  billingKey: string,
  paymentData: BillingPaymentRequest
): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/billing/${billingKey}`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '자동결제 요청 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Billing payment request error:', error);
    throw error;
  }
}

// 빌링키 조회
export async function getBillingKey(
  customerKey: string,
  billingKey: string
): Promise<BillingKeyResponse> {
  try {
    const response = await fetch(
      `${TOSS_CONFIG.apiBaseUrl}/billing/authorizations/${billingKey}`,
      {
        method: 'GET',
        headers: {
          'Authorization': getAuthHeader(),
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '빌링키 조회 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Billing key fetch error:', error);
    throw error;
  }
}

// 빌링키 삭제
export async function deleteBillingKey(
  customerKey: string,
  billingKey: string
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(
      `${TOSS_CONFIG.apiBaseUrl}/billing/authorizations/${billingKey}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerKey }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '빌링키 삭제 실패');
    }

    return { success: true };
  } catch (error) {
    console.error('Billing key deletion error:', error);
    throw error;
  }
}
