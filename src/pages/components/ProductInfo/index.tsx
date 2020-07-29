/**
 * 商品信息组件
 */
import React from 'react';
import Image from '@/pages/components/Image';
import { Flex } from 'antd-mobile';

import css from './index.less';

const Index: React.FC<any> = ({ info }) => {
  const { orderItem, orderItems } = info;
  const items = orderItem || orderItems[0] || {};
  const handleTitle = (productTitle: string) => {
    return productTitle.length > 26 ? `${productTitle.substr(0, 27)}...` : productTitle;
  };

  return (
    <Flex className={css.skuDetail} align="start">
      <div className={css.skuImageWp}>
        <Image className={css.skuImage} alt="" src={items.imageUrl} />
      </div>
      <Flex.Item className={css.info}>
        <div className={css.skuTitle}>{handleTitle(items.productTitle)}</div>
        <div>
          <span className={css.skuSelectItem}>{items.skuName}</span>
        </div>
      </Flex.Item>
      <div className={css.skuNum}>
        <div className={css.text}>
          {info.payWay !== 301 && '￥'}
          {items.promotionPrice}
          {info.payWay === 301 && '学豆'}
        </div>
        <div className={css.numText}>x{items.quantity}</div>
      </div>
    </Flex>
  );
};

export default Index;
