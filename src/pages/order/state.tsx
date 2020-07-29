import React from 'react';
import YuwenQrSrc from '@/assets/images/minprogram/yuwen.png';
import ShuxueQrSrc from '@/assets/images/minprogram/shuxue.png';
import ShiziQrSrc from '@/assets/images/minprogram/shizi.png';
// import PinyinQrSrc from '@/assets/images/minprogram/pinyin.png';

export const changeTypeText = {
  '0': '', // 正常订单（非转单订单）
  '1': '', // 已转单（转单方）
  '2': '转单', // 转单订单（被转单方）
};
//
export const orderRequestStateText = {
  '0': '无退款',
  '1': '退款中',
  '2': '退款成功',
};
// 订单状态文字
export const orderStateText = {
  '101': '待付款',
  '102': '待发货',
  '103': '部分发货',
  '104': '已发货',
  '105': '交易完成',
  '201': '交易关闭',
};
// 订单状态图标
export const orderStateIcon = {
  '101': 'bill1',
  '102': 'bill2',
  '103': 'bill3',
  '104': 'bill3',
  '105': 'bill4',
  '201': 'bill5',
  '1': '', // 退款中
  '2': 'bill4', // 已退款
};
// 订单配送方式
export const shipmentTypeText: { [key: string]: string } = {
  '1': '无需配送',
  '2': '快递配送',
};

export const refundRequestTypeText: { [key: string]: string } = {
  '1': '',
  '2': '仅退款',
  '3': '退款退货',
};
// 退款状态
export const refundRequestStateText = {
  '0': '',
  '101': '待审核',
  '102': '已通过',
  '201': '已拒绝',
  '202': '已撤销',
};
// 退款状态对应时间
export const refundrequestStateTimeText = {
  '0': '',
  '101': '创建时间',
  '102': '通过时间',
  '201': '拒绝时间',
  '202': '撤销时间',
};
// 退款状态对应文字
export const refundTypeText = {
  '2': '仅退款',
  '3': '退款退货',
};
// 商品课程类型
export const categoryTypeQRSRC: { [key: string]: any } = {
  // 语文
  '101': {
    name: '叫叫阅读课',
    src: YuwenQrSrc,
  },
  // 数学
  '102': {
    name: '叫叫数学',
    src: ShuxueQrSrc,
  },
  // 识字
  '201': {
    name: '叫叫识字',
    title: '下载【叫叫识字】APP',
    src: ShiziQrSrc,
    text: () => (
      <>
        <span>点击下载</span>或者扫码下载，注册登录后可兑换和查看识字课程
      </>
    ),
    url: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tinmanarts.JoJoSherlock',
  },
  // 拼音
  '202': {
    name: '叫叫阅读课',
    src: YuwenQrSrc,
  },
};

export default {
  changeTypeText,
  orderRequestStateText,
  orderStateText,
  orderStateIcon,
  shipmentTypeText,
  refundRequestTypeText,
  refundRequestStateText,
  refundrequestStateTimeText,
  refundTypeText,
  categoryTypeQRSRC,
};
