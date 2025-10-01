import { TOSS_CONFIG, getAuthHeader } from './config';
import { PaymentRequest, PaymentResponse, CancelRequest } from './types';

// 결제 승인 API
export async function confirmPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/payments/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '결제 승인 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment confirmation error:', error);
    throw error;
  }
}

// 결제 조회 (paymentKey로)
export async function getPaymentByKey(paymentKey: string): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/payments/${paymentKey}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '결제 조회 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment fetch error:', error);
    throw error;
  }
}

// 결제 조회 (orderId로)
export async function getPaymentByOrderId(orderId: string): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/payments/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '결제 조회 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment fetch by orderId error:', error);
    throw error;
  }
}

// 결제 취소 API
export async function cancelPayment(
  paymentKey: string,
  cancelData: CancelRequest
): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${TOSS_CONFIG.apiBaseUrl}/payments/${paymentKey}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cancelData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '결제 취소 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment cancellation error:', error);
    throw error;
  }
}

// 가상계좌 발급 (이미 승인된 결제에서 가상계좌 정보 조회)
export async function getVirtualAccount(paymentKey: string): Promise<PaymentResponse> {
  try {
    const payment = await getPaymentByKey(paymentKey);

    if (!payment.virtualAccount) {
      throw new Error('가상계좌 정보가 없습니다');
    }

    return payment;
  } catch (error) {
    console.error('Virtual account fetch error:', error);
    throw error;
  }
}
