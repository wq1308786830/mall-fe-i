/**
 *
 */
import React from 'react';
import { Flex } from 'antd-mobile';
import { categoryTypeQRSRC } from '@/pages/order/state';
import Icon from '@/pages/components/IconFont';
import Image from '@/pages/components/Image';
import { ModalView } from '@/pages/components/ModalView';

import css from './index.less';

const Index: React.FC<DetailList> = ({ subItems, type }) => {
  // 进入小程序
  const toQr = ({ categoryType }: SubItem) => {
    if (type === 'order') {
      const qr = categoryTypeQRSRC[categoryType];
      if (!qr) {
        //
        return console.log('no qr src');
      }
      const content = qr.url ? (
        <div className={css.qrUrlWrap}>
          {typeof qr.text === 'function' ? (
            <div
              onClick={() => {
                window.location.href = qr.url;
              }}
              className={css.text}
            >
              {qr.text()}
            </div>
          ) : (
            <div className={css.text}>{qr.text}</div>
          )}
          <Image src={qr.src} alt="" />
        </div>
      ) : (
        <div className={css.qrWrap}>
          <div className={css.text}>
            <div>长按识别二维码</div>
            <div>进入 {qr.name} 小程序查看课程</div>
          </div>
          <Image src={qr.src} alt="" />
        </div>
      );

      return ModalView.show({
        title: qr.title || '',
        content,
        closable: true,
        maskClosable: true,
        footer: [],
      });
    }
  };

  // const refundTypeText = (subItem: SubItem) => {
  //   const detailType = refundDetail ? refundDetail.requestType : '';
  //   const index = subItem.requestType || detailType;
  //   return refundRequestTypeText[index] || '';
  // };

  return (
    <div className={css.detailListZone}>
      <div className={css.lineThroughText}>
        <span>包含以下课程及实物</span>
        <span />
      </div>
      <div className={css.listWrap}>
        {subItems.map((subItem, index) => {
          return (
            <div className={css.bottom} key={subItem.id}>
              <Flex
                className={css.item}
                onClick={() => {
                  toQr(subItem);
                }}
              >
                <div className={css.index}>
                  <span className={css.dot}>{index + 1}</span>
                </div>
                <Flex.Item>
                  <span className={css.skuName}>
                    {subItem.skuName.length > 16
                      ? `${subItem.skuName.substr(0, 16)}...`
                      : subItem.skuName}
                  </span>
                  {categoryTypeQRSRC[subItem.categoryType] && (
                    <Icon className={css.arrayRed} type="arrayRightRed" wrapped />
                  )}
                  {subItem.gift && <span className={css.sign}>赠品</span>}
                  {subItem.itemType === 1 && <span className={css.sign}>实物</span>}
                  {/* {type === 'refund' && <span className={css.number}>x{subItem.quantity || '1'}</span>} */}
                </Flex.Item>
                <div className={css.info}>
                  {subItem.quantity && (
                    <span className={css.number}>x{subItem.quantity || '1'}</span>
                  )}

                  {/* {type === 'refund' && ( */}
                  {/*  <>{refundTypeText(subItem)}</> */}
                  {/* )} */}
                </div>
              </Flex>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
