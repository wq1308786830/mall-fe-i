import axios from 'axios';
import base, { DEBUG_HEADER_INFO } from '@/config/base';
import apiMap from '@/config/api.map';
import { isWXBrowser } from '@/utils/helpers';

const defaultPrefix = '/api/fe';
const instance = axios.create({
  baseURL: base.MALL_BASE_URL,
  timeout: 30000, // 超时
  headers: { ...DEBUG_HEADER_INFO },
  withCredentials: true, // 默认请求是否带上cookie
  responseType: 'json', // 响应数据
});

export default function (api: string, params: any, options = {}) {
  let current = apiMap[api] || {};
  if (!isWXBrowser() && apiMap[`noRight${api}`]) {
    // 微信浏览器外且提供了不需要鉴权的接口的
    current = apiMap[`noRight${api}`];
  }

  let newBaseUrl = current.baseURL + defaultPrefix;
  if (current.prefix) {
    newBaseUrl = current.baseURL + current.prefix;
  }

  const action = current.action || api;
  const newOptions = { ...current, ...options, baseURL: newBaseUrl };
  delete newOptions.key;
  delete newOptions.action;
  delete newOptions.prefix;

  return instance(action, newOptions);
}
