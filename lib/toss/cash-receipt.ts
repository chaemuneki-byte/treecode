import { TOSS_CONFIG, getAuthHeader } from './config';
import { CashReceiptRequest, CashReceiptInfo } from './types';

// 현금영수증 발급
export async function issueCashReceipt(data: CashReceiptRequest): Promise<CashReceiptInfo> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/cash-receipts`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '현금영수증 발급 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Cash receipt issue error:', error);
    throw error;
  }
}

// 현금영수증 조회
export async function getCashReceipt(receiptKey: string): Promise<CashReceiptInfo> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/cash-receipts/${receiptKey}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '현금영수증 조회 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Cash receipt fetch error:', error);
    throw error;
  }
}

// 현금영수증 취소
export async function cancelCashReceipt(
  receiptKey: string,
  cancelReason: string
): Promise<CashReceiptInfo> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/cash-receipts/${receiptKey}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cancelReason }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '현금영수증 취소 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Cash receipt cancellation error:', error);
    throw error;
  }
}
