/**
 * 生成随机电话号
 */
export const generatePhone = () => {
  const phoneHeadSeed = [183, 183, 185, 188, 182, 188, 199, 183, 186, 189];

  const index = Math.floor(Math.random() * 10);
  const randomTail = `${Math.random()}`;
  const phoneTail = randomTail.substr(2, 3);

  return `${phoneHeadSeed[index]}*****${phoneTail}`;
};

/**
 * 生成时间，如：5分钟前，1小时前
 * @param startTime 进入页面的时间戳（毫秒）
 */
export const generateTime = (startTime: number) => {
  const deltaTime = Date.now() - startTime;

  const minuteUnit = 1000 * 60;
  const minutes = Math.ceil(deltaTime / minuteUnit);

  let timeText = '';
  if (minutes >= 60) {
    timeText = `1小时前`;
  } else {
    timeText = `${minutes}分钟前`;
  }

  return timeText;
};

/**
 * 检测浏览器环境是否是微信
 * eg：
 */
export const isWXBrowser = () => {
  const ua = window.navigator.userAgent;
  const reg = /MicroMessenger/i;
  return reg.test(ua);
};

/**
 * 检测浏览器环境是否是百度app
 * eg：
 */
export const isBaiduBoxApp = () => {
  const ua = window.navigator.userAgent;
  const reg = /baiduboxapp/i;
  return reg.test(ua);
};

/**
 * 判断是否是数组
 * @param data
 */
export const isArray = (data: any): boolean => {
  if (!Array.isArray) {
    return Object.prototype.toString.call(data) === '[object Array]';
  }
  return isArray(data);
};

export const closest = (el: any, selector: any) => {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

/**
 * 点击穿透bug fix
 * @param e
 */
export const onWrapTouchStart = (e: any) => {
  // fix touch to scroll background page on iOS
  if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
    return;
  }
  const pNode = closest(e.target, '.am-modal-content');
  if (!pNode) {
    e.preventDefault();
  }
};

/**
 * 验证手机号
 * @param phone
 */
export const phoneVerifier = (phone: string) => {
  const phoneReg = /^1\d{10}$/;

  return phoneReg.test(phone);
};

/**
 * 验证验证码
 * @param code
 */
export const codeVerifier = (code: string) => {
  const codeReg = /\d{6}/;

  return codeReg.test(code);
};

/**
 * 是否是图片
 * @param str
 */
export const isImg = (str: string) => /\.(png|jpg|jpeg|gif|svg|webp)$/.test(str);

export const throttle = (fun: Function, delay: number, time: number) => {
  let timeout: number;
  let startTime = new Date().getTime();

  return () => {
    const curTime = new Date().getTime();

    clearTimeout(timeout);
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= time) {
      fun.apply(null, [fun, delay, time]);
      startTime = curTime;
      // 没达到触发间隔，重新设定定时器
    } else {
      timeout = setTimeout(fun, delay);
    }
  };
};

/**
 * 图片懒加载
 * @param imgList
 */
const defaultImg =
  'https://jojopublic.tinman.cn/mall/mall-cashback/activity/image/202005/ebc61a7170424bb7bff0afc5c01f7f6e.png';
export const lazyLoad = ({ imgList }: { imgList: NodeListOf<HTMLImageElement> }) => {
  const num = imgList.length;
  const seeHeight = document.documentElement.clientHeight; // 可见区域高度
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部高度

  for (let i = 0; i < num; i += 1) {
    let halfHeight = 0;
    if (i >= 1) {
      halfHeight = imgList[i - 1].offsetHeight;
    }
    if (imgList[i].offsetTop - halfHeight < seeHeight + scrollTop) {
      if (imgList[i].getAttribute('src') === defaultImg) {
        const srcUrl = imgList[i].getAttribute('data-src') || '';
        imgList[i].setAttribute('src', srcUrl);
      }
    }
  }
};
