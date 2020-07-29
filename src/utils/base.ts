import server from '../config/base';

interface ExchangeProps {
  orderId?: string;
}
export function getExchangeURL(data: ExchangeProps, url: string) {
  const { orderId } = data;
  if (!url) {
    //
    return '';
  }
  //
  return [url, '?orderNo=', orderId].join('');
}

/**
 * 进入激活
 * @param data
 * @returns {string}
 */
export function getExchangeCodeActiveURL(data: {}) {
  //
  // eslint-disable-next-line import/no-named-as-default-member
  const url = server.EXCHANGE_CODE_ACTIVE_URL;
  //
  return getExchangeURL(data, url);
}

/**
 * 直接进入已激活
 * @param data
 * @returns {string}
 */
export function getExchangeCodeActivedURL(data: {}) {
  //
  // eslint-disable-next-line import/no-named-as-default-member
  const url = server.EXCHANGE_CODE_ACTIVED_URL;
  //
  return getExchangeURL(data, url);
}

/**
 * 获取解绑地址
 * @param url
 * @returns {string}
 */
export function getUnBindURL(url: string) {
  url = url || '';
  if (!url) {
    //
    return server.UNBIND_URL;
  }
  //
  url = encodeURIComponent(url);
  //
  return [server.UNBIND_URL, '?redirectUrl=', url].join('');
}
