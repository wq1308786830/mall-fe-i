import request from '@/utils/request';
import storage from '@/utils/storage';

import { supportBaseURL, SUPPORT_CHAT_URL } from '@/config/base';

const TEMP_SUPPORT_USER = '_ts_u';

const getRandomUserName = name => {
  name = name || '用户';
  const current = storage.get(TEMP_SUPPORT_USER);
  if (current) {
    return encodeURIComponent([name, current].join(''));
  }
  //
  const str = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    .split('')
    .sort(function() {
      return Math.random() - 0.5;
    })
    .join('')
    .toLocaleUpperCase()
    .slice(0, 6);

  storage.set(TEMP_SUPPORT_USER, str, -1);

  return encodeURIComponent([name, str].join(''));
};
/**
 * 获取客服token
 * @param {*} params
 */
export async function getSupportURL(params) {
  params = params || {};
  //
  if (!SUPPORT_CHAT_URL) {
    //
    return Promise.resolve('');
  }
  //
  const userName = getRandomUserName(params.userName);
  //
  return request(
    '',
    { userName },
    {
      baseURL: supportBaseURL,
      prefix: '',
      method: 'GET',
      action: '/api/admin/flyWhale/token/{userName}',
      removePlaceholderData: true,
      headers: {}, // 此处设置为空
      credentials: 'omit', // 需要使用该种方式才能正常
    },
  )
    .then(res => {
      if (res.code === 200) {
        const { nonce, token } = res.data;
        if (nonce && token) {
          //
          return [SUPPORT_CHAT_URL, '&token=', token, '&nonce=', nonce].join('');
        }
      }

      return '';
    })
    .catch(() => {
      return Promise.resolve('');
    });
}
