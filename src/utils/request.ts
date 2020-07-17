import axios from 'axios';
import { Cookies } from 'react-cookie';
import qs from 'query-string';
import base, { DEBUG_HEADER_INFO } from '@/config/base';
import apiMap from '@/config/api.map';
import { isWXBrowser } from '@/utils/helpers';

const defaultPrefix = '/api/fe';
const cookies = new Cookies();

const authToken = cookies.get('authToken');
const deviceId = cookies.get('deviceId');
const packageName = cookies.get('packageName');
const instance = axios.create({
  baseURL: base.MALL_BASE_URL,
  timeout: 30000, // 超时
  headers: {
    ...DEBUG_HEADER_INFO,
    'TM-UserAgent-appUserAuthToken': authToken,
    'TM-UserAgent-deviceUniqueIdentifier': deviceId,
    'TM-UserAgent-appBundleIdentifier': packageName,
  },
  withCredentials: true, // 默认请求是否带上cookie
  responseType: 'json', // 响应数据
});

export default function (api: string, params: any, customOptions?: ApiMapItem) {
  let current = apiMap[api] || {};
  if (!isWXBrowser() && apiMap[`noRight${api}`]) {
    // 微信浏览器外且提供了不需要鉴权的接口的
    current = apiMap[`noRight${api}`];
  }

  let newBaseUrl = current.baseURL + defaultPrefix;
  if (current.prefix) {
    newBaseUrl = current.baseURL + current.prefix;
  }

  let action = current.action || api;
  const newOptions = { ...current, ...customOptions, baseURL: newBaseUrl };

  if (['GET', 'DELETE'].includes(newOptions.method as string)) {
    const qsParams = qs.stringify(params);
    action = `${action}?${qsParams}`;
  } else {
    // POST PUT PATCH
    newOptions.data = params;
  }
  delete newOptions.key;
  delete newOptions.action;
  delete newOptions.prefix;

  return instance(action, newOptions);
}
