import storage from '@woulsl/storage';
import session from '@woulsl/storage/session';

export const USER_TOKEN_KEY = '_U_TOKEN';

let currentTokenValue = null;

// 设置user token
export function setUserToken(token) {
  //
  if (!token) {
    //
    return console.log('no token value');
  }
  //
  currentTokenValue = token;

  storage.set(USER_TOKEN_KEY, token);
}

// 获取user token
export function getUserToken() {
  //
  if (currentTokenValue) {
    return currentTokenValue;
  }
  //
  const token = storage.get(USER_TOKEN_KEY);
  //
  currentTokenValue = token;
  //
  return token;
}

//
export { storage, session };
// 改写，添加用户token
const defaults = storage => {
  //

  const methods = {};
  //
  ['get', 'set', 'remove'].forEach(method => {
    methods[method] = function(...args) {
      //
      const key = args[0];
      const token = getUserToken() || '';
      //
      args[0] = [token, key].join('|');
      //
      return storage[method].apply(null, args);
    };
  });

  //
  return {
    ...methods,
    clear: storage.clear,
  };
};
//
export default defaults(storage);
