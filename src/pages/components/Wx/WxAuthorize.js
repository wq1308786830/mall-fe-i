import React, { useEffect } from 'react';
// import wx from 'jweixin-sdk-official';
import { getWxCofnig } from '@/services/wx.config';

// 兼容iOS9
const wx = require('./jweixin-1.6.0');

function init() {
  //
  getWxCofnig({}).then(function(config) {
    //
    wx.ready(() => {
      //
      wx.config(config);
    });
  });
}

function WxAuthorize() {
  //
  useEffect(() => {
    // 获取微信配置
    init();
  }, []);
  //
  return <></>;
}

WxAuthorize.getInitialProps = async () => {
  return init();
};

export default WxAuthorize;
