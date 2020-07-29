/**
 * 微信支付在ios设备上不刷新，会导致支付出现问题
 * 目前ios 13上有这个问题
 * @constructor
 */

import { session } from '@/utils/storage';
//
export const WxPayHack = page => {
  // iPhone OS 10_3_1
  const ua = window.navigator.userAgent;
  // const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko)
  // const ua = 'Mozilla/5.0 (iPad; CPU OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13D15
  // MicroMessenger/7.0.9(0x17000929) NetType/WIFI Language/zh_CN';
  // Version/10.0 Mobile/14E304 Safari/602.1';
  const reg = /(?:iphone|ipad)[^\d]+os\s(\d+)(?:_\d+)?/i;
  if (reg.test(ua)) {
    const res = reg.exec(ua);
    if (res && res[1]) {
      const version = parseInt(res[1], 10);
      if (version >= 9) {
        //
        const key = ['_tmp', page].join('_');
        const current = session.get(key);
        if (!current) {
          //
          session.set(key, Date.now());
          window.location.reload();
        }
      }
    }
  }
};

function WxPay(config, callback) {
  function onBridgeReady() {
    //
    config.package = config.packageValue;
    delete config.packageValue;
    //
    WeixinJSBridge.invoke('getBrandWCPayRequest', config, res => {
      // 支付成功
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        return callback && callback('ok');
      }

      // 用户取消支付
      if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        return callback && callback('oh');
      }

      // 支付失败
      if (res.err_msg === 'get_brand_wcpay_request:fail') {
        return callback && callback('oh');
      }
    });
  }

  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      //
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      //
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    //
    onBridgeReady();
  }
}

export default WxPay;
