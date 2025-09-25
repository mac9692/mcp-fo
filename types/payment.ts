// 결제 관련 타입 정의

export interface PaymentRequest {
  amount: number
  productName: string
  buyerName: string
  buyerEmail: string
  buyerTel: string
  merchantUid: string
  successUrl: string
  failUrl: string
}

export interface PaymentParameterResponse {
  pgCode: string
  pgName: string
  mid: string
  timestamp: string
  signature: string
  verification: string
  mKey: string
  paymentUrl: string
}

export interface InicisPaymentData {
  version: string
  gopaymethod: string
  mid: string
  oid: string
  price: number
  timestamp: string
  signature: string
  verification: string
  mKey: string
  currency: string
  goodname: string
  buyername: string
  buyertel: string
  buyeremail: string
  returnUrl: string
  closeUrl: string
  acceptmethod: string
}

export interface TossPaymentData {
  clientKey: string
  amount: number
  orderId: string
  orderName: string
  customerName: string
  customerEmail: string
  customerMobilePhone: string
  successUrl: string
  failUrl: string
  timestamp: string
  signature: string
}

export interface NicePaymentData {
  PayMethod: string
  GoodsName: string
  Amt: number
  MID: string
  Moid: string
  BuyerName: string
  BuyerTel: string
  BuyerEmail: string
  ReturnURL: string
  VbankExpDate: string
  MallUserID: string
  timestamp: string
  signature: string
  verification: string
}