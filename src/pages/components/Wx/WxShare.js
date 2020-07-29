import { getWxCofnig } from '@/services/wx.config';
import { Toast } from 'antd-mobile';

// 兼容iOS9
const wx = require('./jweixin-1.6.0');

const defaultJsApiList = [
  'onMenuShareAppMessage',
  'onMenuShareTimeline',
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'showMenuItems',
];

export function WxConfigInit(jsApiList = []) {
  //
  getWxCofnig({
    url: window.location.href,
  }).then(function ({ data }) {
    //
    data = data || {};
    //
    if (!data.appId) {
      //
      return console.log('no appid');
    }
    wx.config({
      ...data,
      jsApiList: [...defaultJsApiList, ...jsApiList],
    });
    wx.error(function (res) {
      console.log('err', res);
    });
  });
}

function WxShare(props, inited) {
  const { title, desc, link, isShowTipToast = true } = props;
  let { imgUrl } = props;
  //
  if (/^\/\//.test(imgUrl)) {
    //
    imgUrl = [window.location.protocol, imgUrl].join('');
  }
  //
  wx.ready(() => {
    //
    wx.checkJsApi({
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 需要检测的JS接口列表
      success(res) {
        //
        const { checkResult } = res;
        console.log('check js api result', res);
        const options = {
          title, // 分享标题
          desc, // 分享描述
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success(res) {
            // 分享成功
            console.log('share success');
          },
        };
        //
        if (checkResult.updateAppMessageShareData) {
          wx.updateAppMessageShareData(options);
          wx.updateTimelineShareData(options);
          //
          if (inited) {
            return;
          }

          isShowTipToast && Toast.show('请点击右上角【...】分享');
          //
          wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:favorite'], // 要显示的菜单项，所有menu项见附录3
          });
        }
        //
        if (inited) {
          return;
        }
        //
        wx.onMenuShareAppMessage(options);
        wx.onMenuShareTimeline(options);
      },
    });
  });
}

export default WxShare;
