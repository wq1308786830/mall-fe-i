/**
 * 子账号提示文字
 * @type {{ORDER_LIST: string, ORDER_CREATE: string}}
 */
export const CHILD_COUNT_TIPS = {
  ORDER_CREATE: '你当前是子账号状态，不能单独购买商品，如需购买商品，需要解绑账号后重试',
  ORDER_LIST: '你当前是子账号状态，无法查看订单数据，如需要查看自己的订单，请解绑账号后再试',
};

// 网络加载错误提示
export const NETWORK_ERROR_TIPS = '你的网络开小差了,请检查网络重试';

// 显示促销倒计时时间限定范围
export const TIMEDOWN_LIMIT = 3600 * 24; // 1 day

// 失败请求最大次数
export const REQUEST_FAILED_MAX_COUNT = 5;
