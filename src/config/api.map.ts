/**
 * api映射处理，包含权限配置
 */

import server from './base';

const {
  MALL_BASE_URL,
  ORDER_BASE_URL,
  PAY_BASE_URL,
  DELIVERY_BASE_URL,
  REDEEMCODE_BASE_URL,
} = server;

export default {
  // 商品相关
  '/api/item/auth': {
    method: 'GET',
    action: '/product/auth-url',
    baseURL: MALL_BASE_URL,
  },
  '/api/item/detail': {
    action: '/product/detail',
    method: 'GET',
    key: 'API_GET_PRODUCT_DETAIL',
    baseURL: MALL_BASE_URL,
  },
  '/api/item/userInfo': {
    action: '/wxmp/get-user-info',
    method: 'GET',
    key: 'API_GET_WXMP_USER_INFO',
    baseURL: MALL_BASE_URL,
  },
  // 地址相关
  '/api/address/list': {
    action: '/address/get-userAddress',
    method: 'GET',
    key: 'API_GET_ADDRESS_LIST',
    baseURL: ORDER_BASE_URL,
  },
  '/api/address/detail': {
    action: '/address/get-userAddressById',
    method: 'GET',
    key: 'API_GET_ADDRESS_DETAIL',
    baseURL: ORDER_BASE_URL,
  },
  '/api/address/province': {
    action: '/address/get-province',
    method: 'GET',
    key: 'API_GET_ADDRESS_PROVINCE',
    baseURL: ORDER_BASE_URL,
  },
  '/api/address/region': {
    action: '/address/get-region',
    method: 'GET',
    key: 'API_GET_ADDRESS_REGION',
    baseURL: ORDER_BASE_URL,
  },
  '/api/address/create': {
    action: '/address/create-userAddress',
    method: 'POST',
    key: 'API_CREATE_ADDRESS',
    baseURL: ORDER_BASE_URL,
  },
  '/api/address/update': {
    action: '/address/update-userAddress',
    method: 'POST',
    key: 'API_UPDATE_ADDRESS',
    baseURL: ORDER_BASE_URL,
  },
  '/api/address/delete': {
    action: '/address/delete-userAddress',
    method: 'POST',
    key: 'API_DELETE_ADDRESS',
    serialized: true,
    baseURL: ORDER_BASE_URL,
  },
  // 订单相关
  '/api/order/postOrder': {
    action: '/order/postOrder/{orderId}',
    method: 'GET',
    key: 'API_ORDER_GET_POSTER',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/validate': {
    action: '/place-order/validate',
    method: 'POST',
    key: 'API_ORDER_CREATE_VALIDATE',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/create': {
    action: '/place-order/create',
    method: 'POST',
    key: 'API_ORDER_CREATE',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/list': {
    action: '/order/list',
    method: 'POST',
    key: 'API_GET_ORDER_LIST',
    serialized: true,
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/detail': {
    action: '/order/detail/{orderId}',
    method: 'GET',
    key: 'API_GET_ORDER_DETAIL',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/pay/detail': {
    action: '/order/get-paid-order-info',
    method: 'GET',
    key: 'API_GET_ORDER_PAY_DETAIL',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/pay/pay-methods': {
    action: '/pay/pay-platform-list',
    method: 'POST',
    key: 'API_GET_PAY-PLATFORM-LIST',
    baseURL: PAY_BASE_URL,
  },
  '/api/refund/list': {
    action: '/order-request/list/{orderId}',
    method: 'GET',
    key: 'API_GET_ORDER_REFUND_LIST',
    baseURL: ORDER_BASE_URL,
  },
  '/api/refund/detail': {
    action: '/order-request/detail/{id}',
    method: 'GET',
    key: 'API_GET_ORDER_REFUND_DETAIL',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/address/list': {
    action: '/order/get-address',
    method: 'GET',
    key: 'API_GET_ORDER_ADDRESS_LIST',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/address/update': {
    action: '/order/modify-address',
    method: 'POST',
    key: 'API_GET_ORDER_ADDRESS_UPDATE',
    baseURL: ORDER_BASE_URL,
  },
  '/api/order/pay': {
    action: '/pay/create-wechatOrderJSAPI',
    method: 'POST',
    key: 'API_ORDER_TO_PAY',
    baseURL: PAY_BASE_URL,
  },
  '/api/order/get-alipay-html': {
    action: '/pay/create-wap-alipay-order',
    method: 'POST',
    key: 'API_GET_ALIPAY_HTML',
    prefix: 'noRight/api/fe',
    baseURL: PAY_BASE_URL,
  },
  '/api/order/get-alipay-qrcode': {
    action: '/pay/create-qr-alipay-order',
    method: 'POST',
    key: 'API_GET_ALIPAY_QRCODE',
    baseURL: PAY_BASE_URL,
  },
  '/api/order/get-alipay-token': {
    action: '/pay/get-pay-order-token',
    method: 'POST',
    key: 'API_GET_ALIPAY_TOKEN',
    baseURL: PAY_BASE_URL,
  },
  '/api/order/query-pay-result': {
    action: '/pay/pull-pay-result',
    method: 'GET',
    key: 'API_QUERY_WECHAT_ORDER',
    baseURL: PAY_BASE_URL,
  },
  // 物流相关
  '/api/delivery/list': {
    action: '/delivery/getDeliveryRecordByOrderId',
    method: 'GET',
    key: 'API_DELIVERY_LIST',
    baseURL: DELIVERY_BASE_URL,
  },
  '/api/delivery/detail': {
    action: '/delivery/getDeliveryRecordById',
    method: 'GET',
    key: 'API_DELIVERY_DETAIL',
    baseURL: DELIVERY_BASE_URL,
  },
  // 激活码相关
  '/api/exchange/code/validate': {
    action: '/redeem-code/redeem-validate/{redeemCode}',
    method: 'GET',
    key: 'API_EXCHANGE_CODE_DETAIL',
    baseURL: ORDER_BASE_URL,
  },
  '/api/exchange/code/detail': {
    action: '/redeem-code/redeem-detail/{redeemCode}',
    method: 'GET',
    key: 'API_EXCHANGE_CODE_DETAIL',
    baseURL: ORDER_BASE_URL,
  },
  '/api/exchange/code/active': {
    action: '/redeem-code/redeem',
    method: 'POST',
    key: 'API_EXCHANGE_CODE_ACTIVE',
    baseURL: ORDER_BASE_URL,
  },
  //
  '/api/activate/code': {
    action: '/redeemcode/sendSmsForRedeemCodeSearch',
    method: 'GET',
    key: 'API_ACTIVATE_CODE',
    baseURL: REDEEMCODE_BASE_URL,
  },
  '/api/activate/check': {
    action: 'redeemcode/checkVCode',
    method: 'GET',
    key: 'API_ACTIVATE_CHECK',
    baseURL: REDEEMCODE_BASE_URL,
  },
  '/api/activate/query': {
    action: '/redeemcode/searchRedeemCodeByPhone',
    method: 'GET',
    key: 'API_ACTIVATE_QUERY',
    baseURL: REDEEMCODE_BASE_URL,
  },

  '/api/wx/config': {
    action: '/wxmp/create-signature',
    baseURL: MALL_BASE_URL,
  },
  '/api/order/hot-user-info': {
    baseURL: ORDER_BASE_URL,
    action: '/hot-order/get-hot-user-info',
  },
} as ApiMap;
