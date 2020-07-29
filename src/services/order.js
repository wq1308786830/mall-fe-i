import request from '@/utils/request';
// 创建订单
export async function createOrder(params) {
  //
  return request('/api/order/create', params);
}
// 创建订单之前验证
export async function validateOrder(params) {
  //
  return request('/api/order/validate', params);
}

// 获取微信支付参数
export async function getWxPayConfig(params) {
  return request('/api/order/pay', params);
}

// 获取支付宝支付form以及自动提交字符串
export function getAliPayForm(params) {
  return request('/api/order/get-alipay-html', params);
}

// 获取支付宝支付二维码
export function getAliPayQRCode(params) {
  return request('/api/order/get-alipay-qrcode', params);
}

// 获取支付宝支付二维码
export function getAliPayToken(params) {
  return request('/api/order/get-alipay-token', params);
}

// 获取支付方式
export function getPayMethods(params) {
  return request('/api/order/pay/pay-methods', params);
}

// 触发
export function getPayResult(params) {
  return request('/api/order/query-pay-result', params);
}

// 订单详情
export async function getOrderDetail(params) {
  return request('/api/order/detail', params);
}

// 海报分享详情
export async function getOrderPoster(params) {
  return request('/api/order/postOrder', params);
}

// 订单列表
export async function getOrderList(params) {
  //
  return request('/api/order/list', params);
}

// 订单退款详情
export async function getOrderRefundDetail(params) {
  //
  return request('/api/refund/detail', params);
}

// 订单退款列表
export async function getOrderRefundList(params) {
  //
  return request('/api/refund/list', params);
}

// 获取订单地址列表
export async function getOrderAddressList(params) {
  //
  return request('/api/order/address/list', params);
}
// 获取订单地址列表
export async function setOrderAddressList(params) {
  //
  return request('/api/order/address/update', params);
}

// 支付完成后获取额外信息
export async function getOrderPayDetail(params) {
  //
  return request('/api/order/pay/detail', params);
}
