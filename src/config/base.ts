/**
 * 全局基础配置
 */
// 全局变量通过define-plugin注入
const envDebug = process.env.ENV_DEBUG; // 本地调试
const envName = process.env.ENV_NAME; // 环境变量

// 是否调试模式，区别非正式环境
export const DEBUG = !!envName && envName !== 'pro';
// 是否开启本地调试
export const DEBUG_LOCAL = envDebug;

// 模拟调试header信息，跳过授权检测
export const DEBUG_HEADER_INFO = envDebug
  ? {
      // 'X-UAGW-userId': 29335,
      // 'X-UAGW-userId': 28163,
      // 'X-UAGW-userId': 27277,
      'X-UAGW-userId': 30737,
      'X-UAGW-authMode': 1,
    }
  : {};
//
// TODO NOTICE:  服务器地址需经过环境变量处理不建议直接导出
// 服务器端接口地址
// const MALL_BASE_URL = 'https://itemapi.tinman.cn';
// const ORDER_BASE_URL = 'https://orderapi.tinman.cn';
// const PAY_BASE_URL = 'https://payapi.tinman.cn';
// const DELIVERY_BASE_URL = 'https://deliveryapi.tinman.cn';
const MALL_BASE_URL = 'https://mall-product.tinman.cn';
const ORDER_BASE_URL = 'https://mall-order.tinman.cn';
const PAY_BASE_URL = 'https://mall-pay.tinman.cn';
const DELIVERY_BASE_URL = 'https://mall-delivery.tinman.cn';
const REDEEMCODE_BASE_URL = 'https://mall-redeemcode.tinman.cn';
//
const MALL_DEBUG_BASE_URL = `https://mall-product.${envName}.tinman.cn`;
const ORDER_DEBUG_BASE_URL = `https://mall-order.${envName}.tinman.cn`;
const PAY_DEBUG_BASE_URL = `https://mall-pay.${envName}.tinman.cn`;
const DELIVERY_DEBUG_BASE_URL = `https://mall-delivery.${envName}.tinman.cn`;
const REDEEMCODE_DEBUG_BASE_URL = `https://mall-redeemcode.${envName}.tinman.cn`;

// 激活码激活页面地址
const EXCHANGE_URL = {
  pro: 'https://jojoread.tinman.cn/page/courseGuide/view/productOrderSuccess',
  fat: 'https://jojoread.tinman.cn/beta/page/courseGuide/view/productOrderSuccess',
  dev: 'https://jojoread.tinman.cn/beta/page/courseGuide/view/productOrderSuccess',
};
// 已激活页面地址
const EXCHANGE_ACTIVED_URL = {
  pro: 'https://jojoread.tinman.cn/page/courseGuide/view/pastCourse',
  fat: 'https://jojoread.tinman.cn/beta/page/courseGuide/view/pastCourse',
  dev: 'https://jojoread.tinman.cn/beta/page/courseGuide/view/pastCourse',
};

// 子账号解绑调用 TODO:区分环境
const UNBIND_URL = {
  pro: 'https://jojoread.tinman.cn/page/userSubAccount/view/bind',
  fat: 'https://jojoread.tinman.cn/beta/page/userSubAccount/view/bind',
  dev: 'https://jojoread.tinman.cn/beta/page/userSubAccount/view/bind',
};
// 授权失效之后进入链接地址
const AUTH_SIGN_URL = 'https://jojoread.tinman.cn/page/wechatMp/portal/entrance';
const AUTH_DEBUG_SIGN_URL = 'https://jojoread.tinman.cn/page/wechatMp/portal/entrance';

// 客服链接,使用的飞鲸客服聊天
const SUPPORT_BASE_URL = 'https://jojoread.tinman.cn';
// const SUPPORT_DEBUG_BASE_URL = DEBUG_LOCAL ? '' : SUPPORT_BASE_URL;
export const SUPPORT_CHAT_URL =
  '//chat.jd.com/index.action?source=open_web&aspid=18263598730.1.3.0.1751.2&mallId=18263598730&userApp=open.19488bf0a16431ebbb300183de.customer&waiterAppId=open.19488bf0a16431ebbb300183de.waiter';
export const supportBaseURL = SUPPORT_BASE_URL; // 现在阅读通过网络方式切换
//
export default {
  MALL_BASE_URL: DEBUG ? MALL_DEBUG_BASE_URL : MALL_BASE_URL,
  ORDER_BASE_URL: DEBUG ? ORDER_DEBUG_BASE_URL : ORDER_BASE_URL,
  PAY_BASE_URL: DEBUG ? PAY_DEBUG_BASE_URL : PAY_BASE_URL,
  DELIVERY_BASE_URL: DEBUG ? DELIVERY_DEBUG_BASE_URL : DELIVERY_BASE_URL,
  REDEEMCODE_BASE_URL: DEBUG ? REDEEMCODE_DEBUG_BASE_URL : REDEEMCODE_BASE_URL,
  AUTH_SIGN_URL: DEBUG ? AUTH_DEBUG_SIGN_URL : AUTH_SIGN_URL,
  EXCHANGE_CODE_ACTIVE_URL: EXCHANGE_URL[`${envName}` || 'pro'],
  EXCHANGE_CODE_ACTIVED_URL: EXCHANGE_ACTIVED_URL[`${envName}` || 'pro'],
  UNBIND_URL: UNBIND_URL[`${envName}` || 'pro'],
};
