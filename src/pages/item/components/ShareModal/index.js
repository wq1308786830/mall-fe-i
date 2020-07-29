import React from 'react';
import { Modal, Flex, Button } from 'antd-mobile';
import socializePng from '@/assets/images/socialize@2x.png';
import socializeFriendsPng from '@/assets/images/socialize-friends@2x.png';
import iconClosePng from '@/assets/images/btn-clouse-alert@2x.png';
import styles from './index.less';

const FlexItem = Flex.Item;

const closest = (el, selector) => {
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

const ShareModal = ({ visible, onOK, onClose }) => {
  const onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      maskClosable
      onClose={onClose}
      title="分享提示"
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <img
        className={styles.fixedClose}
        src={iconClosePng}
        alt=""
        onClick={onClose}
        role="presentation"
      />
      <div className={styles.modalContent}>
        <Flex className={styles.modalItemGroup}>
          <FlexItem className={styles.flexItemLeft}>
            <img src={socializeFriendsPng} alt="" />
          </FlexItem>
          <FlexItem className={styles.flexItemRight}>
            <h3>分享给好友</h3>
            <p>
              点击右上角的<span>...</span>按钮分享。
            </p>
          </FlexItem>
        </Flex>
        <Flex className={styles.modalItemGroup}>
          <FlexItem className={styles.flexItemLeft}>
            <img src={socializePng} alt="" />
          </FlexItem>
          <FlexItem className={styles.flexItemRight}>
            <h3>生成海报</h3>
            <p>点击生成海报按钮，进行海报图片保存。</p>
          </FlexItem>
        </Flex>
        <div>
          <Button className={styles.btnWarn} onClick={onOK}>
            生成海报
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
