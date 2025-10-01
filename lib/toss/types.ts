// Toss Payments API 타입 정의

export interface PaymentRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentResponse {
  mId: string;
  lastTransactionKey: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  taxExemptionAmount: number;
  status: PaymentStatus;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean;
  card?: CardInfo;
  virtualAccount?: VirtualAccountInfo;
  transfer?: TransferInfo;
  mobilePhone?: MobilePhoneInfo;
  giftCertificate?: GiftCertificateInfo;
  cashReceipt?: CashReceiptInfo;
  cashReceipts?: CashReceiptInfo[];
  discount?: DiscountInfo;
  cancels?: CancelInfo[];
  secret?: string;
  type: PaymentType;
  easyPay?: EasyPayInfo;
  country: string;
  failure?: FailureInfo;
  isPartialCancelable: boolean;
  receipt?: ReceiptInfo;
  checkout?: CheckoutInfo;
  currency: string;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  method: PaymentMethod;
  version: string;
}

export type PaymentStatus =
  | 'READY'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_DEPOSIT'
  | 'DONE'
  | 'CANCELED'
  | 'PARTIAL_CANCELED'
  | 'ABORTED'
  | 'EXPIRED';

export type PaymentType = 'NORMAL' | 'BILLING' | 'BRANDPAY';

export type PaymentMethod =
  | '카드'
  | '가상계좌'
  | '간편결제'
  | '휴대폰'
  | '계좌이체'
  | '문화상품권'
  | '도서문화상품권'
  | '게임문화상품권';

export interface CardInfo {
  issuerCode: string;
  acquirerCode?: string;
  number: string;
  installmentPlanMonths: number;
  isInterestFree: boolean;
  interestPayer?: string;
  approveNo: string;
  useCardPoint: boolean;
  cardType: 'credit' | 'debit' | 'gift';
  ownerType: 'personal' | 'company';
  acquireStatus: 'READY' | 'REQUESTED' | 'COMPLETED' | 'CANCEL_REQUESTED' | 'CANCELED';
  amount: number;
}

export interface VirtualAccountInfo {
  accountType: string;
  accountNumber: string;
  bankCode: string;
  customerName: string;
  dueDate: string;
  refundStatus: string;
  expired: boolean;
  settlementStatus: string;
  refundReceiveAccount?: RefundReceiveAccount;
}

export interface RefundReceiveAccount {
  bankCode: string;
  accountNumber: string;
  holderName: string;
}

export interface TransferInfo {
  bankCode: string;
  settlementStatus: string;
}

export interface MobilePhoneInfo {
  customerMobilePhone: string;
  settlementStatus: string;
  receiptUrl: string;
}

export interface GiftCertificateInfo {
  approveNo: string;
  settlementStatus: string;
}

export interface CashReceiptInfo {
  type: '소득공제' | '지출증빙';
  receiptKey: string;
  issueNumber: string;
  receiptUrl: string;
  amount: number;
  taxFreeAmount: number;
}

export interface DiscountInfo {
  amount: number;
}

export interface CancelInfo {
  cancelAmount: number;
  cancelReason: string;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  refundableAmount: number;
  easyPayDiscountAmount: number;
  canceledAt: string;
  transactionKey: string;
  receiptKey?: string;
  cancelStatus: string;
  cancelRequestId?: string;
}

export interface FailureInfo {
  code: string;
  message: string;
}

export interface EasyPayInfo {
  provider: string;
  amount: number;
  discountAmount: number;
}

export interface ReceiptInfo {
  url: string;
}

export interface CheckoutInfo {
  url: string;
}

export interface CancelRequest {
  cancelReason: string;
  cancelAmount?: number;
  refundReceiveAccount?: RefundReceiveAccount;
  taxFreeAmount?: number;
  taxExemptionAmount?: number;
  refundableAmount?: number;
}

// 빌링(자동결제) 관련 타입
export interface BillingKeyRequest {
  customerKey: string;
  authKey: string;
}

export interface BillingKeyResponse {
  mId: string;
  customerKey: string;
  billingKey: string;
  cardCompany: string;
  cardNumber: string;
  authenticatedAt: string;
}

export interface BillingPaymentRequest {
  customerKey: string;
  amount: number;
  orderId: string;
  orderName: string;
  customerEmail?: string;
  customerName?: string;
  taxFreeAmount?: number;
}

// 현금영수증 관련 타입
export interface CashReceiptRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerIdentityNumber: string;
  type: '소득공제' | '지출증빙';
  taxFreeAmount?: number;
}
