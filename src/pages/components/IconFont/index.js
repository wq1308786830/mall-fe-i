import React from 'react';
import classnames from 'classnames';

import { ReactComponent as IconShare } from '@/pages/components/IconFont/icon/icon-share.svg';
import { ReactComponent as IconDecrease } from '@/pages/components/IconFont/icon/icon-decrease.svg';
import { ReactComponent as IconIncrease } from '@/pages/components/IconFont/icon/icon-increase.svg';
import { ReactComponent as IconArrayRight } from '@/pages/components/IconFont/icon/icon-arrow-right.svg';
import { ReactComponent as IconArrowRightWhite } from '@/pages/components/IconFont/icon/arrow-rightwhite.svg';
import { ReactComponent as IconArrayRightRed } from '@/pages/components/IconFont/icon/icon-arrow-right-red.svg';
import { ReactComponent as IconArrayDown } from '@/pages/components/IconFont/icon/icon-arrow-down.svg';
import { ReactComponent as IconAlert } from '@/pages/components/IconFont/icon/icon-alert.svg';
// 商品详情label图标
import { ReactComponent as IconTraffic } from '@/pages/components/IconFont/icon/icon-traffic.svg';
import { ReactComponent as IconRight } from '@/pages/components/IconFont/icon/icon-right.svg';
import { ReactComponent as IconSafe } from '@/pages/components/IconFont/icon/icon-safe.svg';
import { ReactComponent as IconLeaf } from '@/pages/components/IconFont/icon/icon-leaf.svg';
import { ReactComponent as IconHeart } from '@/pages/components/IconFont/icon/icon-heart.svg';
import { ReactComponent as IconGlobal } from '@/pages/components/IconFont/icon/icon-global.svg';

// 订单详情顶部图标
import { ReactComponent as IconBill1 } from '@/pages/components/IconFont/icon/icon-bill1.svg';
import { ReactComponent as IconBill2 } from '@/pages/components/IconFont/icon/icon-bill2.svg';
import { ReactComponent as IconBill3 } from '@/pages/components/IconFont/icon/icon-bill3.svg';
import { ReactComponent as IconBill4 } from '@/pages/components/IconFont/icon/icon-bill4.svg';
import { ReactComponent as IconBill5 } from '@/pages/components/IconFont/icon/icon-bill5.svg';

// 发货列表快递图标
import { ReactComponent as IconDelivery } from '@/pages/components/IconFont/icon/icon-delivery.svg';
import { ReactComponent as IconLocation } from '@/pages/components/IconFont/icon/icon-location.svg';
import styles from './index.less';

export const IconFront = {
  right: IconRight,
  safe: IconSafe,
  traffic: IconTraffic,
  share: IconShare,
  decrease: IconDecrease,
  increase: IconIncrease,
  arrayRight: IconArrayRight,
  arrayRightRed: IconArrayRightRed,
  arrowRightWhite: IconArrowRightWhite,
  arrayDown: IconArrayDown,
  global: IconGlobal,
  leaf: IconLeaf,
  delivery: IconDelivery,
  location: IconLocation,
  heart: IconHeart,
  bill1: IconBill1,
  bill2: IconBill2,
  bill3: IconBill3,
  bill4: IconBill4,
  bill5: IconBill5,

  alert: IconAlert,

  IconRight,
  IconTraffic,
  IconShare,
  IconDecrease,
  IconIncrease,
  IconArrayRight,
  IconArrayRightRed,
  IconArrayDown,
  IconGlobal,
  IconSafe,
  IconLeaf,
  IconHeart,
  IconBill1,
  IconBill2,
  IconBill3,
  IconBill4,
  IconBill5,
  IconDelivery,
  IconLocation,
  IconAlert,
};

export default (props) => {
  const { type, wrapped, width = 32, height = 32, style, className } = props;
  const Icon = IconFront[type] ? IconFront[type] : 'span';
  // 是否包裹一层
  if (wrapped) {
    //
    return (
      <span className={classnames(styles.icon, styles[type], className)}>
        <Icon width={width} height={height} style={style} />
      </span>
    );
  }
  return <Icon className={classnames(className)} width={width} height={height} style={style} />;
};
