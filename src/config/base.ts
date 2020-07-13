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
      // 'X-UAGW-userId': 28163,
      // 'X-UAGW-userId': 27277,
      // 'X-UAGW-userId': 29924,
      // 'X-UAGW-userId': 29210,
      'X-UAGW-userId': 15714,
      'X-UAGW-authMode': 1,
    }
  : {};
//
// TODO NOTICE:  服务器地址需经过环境变量处理不建议直接导出
// 服务器端接口地址
const MALL_BASE_URL = 'https://mall-product.tinman.cn';
const ORDER_BASE_URL = 'https://mall-order.tinman.cn';
const PAY_BASE_URL = 'https://mall-pay.tinman.cn';
const DELIVERY_BASE_URL = 'https://mall-delivery.tinman.cn';
const REDEEMCODE_BASE_URL = 'https://mall-redeemcode.tinman.cn';
const CASHBACK_BASE_URL = 'https://mall-cashback.tinman.cn';
//
const MALL_DEBUG_BASE_URL = `https://mall-product.${envName}.tinman.cn`;
const ORDER_DEBUG_BASE_URL = `https://mall-order.${envName}.tinman.cn`;
const PAY_DEBUG_BASE_URL = `https://mall-pay.${envName}.tinman.cn`;
const DELIVERY_DEBUG_BASE_URL = `https://mall-delivery.${envName}.tinman.cn`;
const REDEEMCODE_DEBUG_BASE_URL = `https://mall-redeemcode.${envName}.tinman.cn`;
const CASHBACK_DEBUG_BASE_URL = `https://mall-cashback.${envName}.tinman.cn`;
// const CASHBACK_DEBUG_BASE_URL = `http://10.100.29.197:8080`;

// 购买完的激活页面地址
const EXCHANGE_URL: ExtensiveObject = {
  fat: 'https://edu.fat.tinman.cn/active-process',
  qa: 'https://edu-qa.fat.tinman.cn/active-process',
  uat: 'https://edu.uat.tinman.cn/active-process',
  pro: 'https://edu.tinman.cn/active-process',
  dev: 'https://edu.dev.tinman.cn/active-process',
};
// 已激活页面地址
const EXCHANGE_ACTIVED_URL: ExtensiveObject = {
  pro: 'https://jojoread.tinman.cn/page/courseGuide/view/pastCourse',
  fat: 'https://jojoread.tinman.cn/beta/page/courseGuide/view/pastCourse',
  dev: 'https://jojoread.tinman.cn/beta/page/courseGuide/view/pastCourse',
};

// 子账号解绑调用 TODO:区分环境
const UNBIND_URL: ExtensiveObject = {
  pro: 'https://jojoread.tinman.cn/page/userSubAccount/view/bind',
  fat: 'https://jojoread.tinman.cn/beta/page/userSubAccount/view/bind',
  dev: 'https://jojoread.tinman.cn/beta/page/userSubAccount/view/bind',
};
// 授权失效之后进入链接地址
const AUTH_SIGN_URL = 'https://jojoread.tinman.cn/page/wechatMp/portal/entrance';
const AUTH_DEBUG_SIGN_URL = 'https://jojoread.tinman.cn/page/wechatMp/portal/entrance';

// 客服地址
const CUSTOMER_SERVICE_URL = 'https://jojoread.tinman.cn/page/flyWhale/chatWithLogin';
// 客服链接,使用的飞鲸客服聊天
export const SUPPORT_BASE_URL = 'https://jojoread.tinman.cn';
export const SUPPORT_CHAT_URL =
  '//chat.jd.com/index.action?source=open_web&aspid=18263598730.1.3.0.1751.2&mallId=18263598730&userApp=open.19488bf0a16431ebbb300183de.customer&waiterAppId=open.19488bf0a16431ebbb300183de.waiter';

export default {
  MALL_BASE_URL: DEBUG ? MALL_DEBUG_BASE_URL : MALL_BASE_URL,
  ORDER_BASE_URL: DEBUG ? ORDER_DEBUG_BASE_URL : ORDER_BASE_URL,
  PAY_BASE_URL: DEBUG ? PAY_DEBUG_BASE_URL : PAY_BASE_URL,
  DELIVERY_BASE_URL: DEBUG ? DELIVERY_DEBUG_BASE_URL : DELIVERY_BASE_URL,
  REDEEMCODE_BASE_URL: DEBUG ? REDEEMCODE_DEBUG_BASE_URL : REDEEMCODE_BASE_URL,
  CASHBACK_BASE_URL: DEBUG ? CASHBACK_DEBUG_BASE_URL : CASHBACK_BASE_URL,
  AUTH_SIGN_URL: DEBUG ? AUTH_DEBUG_SIGN_URL : AUTH_SIGN_URL,
  EXCHANGE_CODE_ACTIVE_URL: EXCHANGE_URL[`${envName}` || 'pro'],
  EXCHANGE_CODE_ACTIVED_URL: EXCHANGE_ACTIVED_URL[`${envName}` || 'pro'],
  UNBIND_URL: UNBIND_URL[`${envName}` || 'pro'],
  CUSTOMER_SERVICE_URL: CUSTOMER_SERVICE_URL,
};
