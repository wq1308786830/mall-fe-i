import classnames from 'classnames';
import * as React from 'react';
import Dialog from 'rmc-dialog';
import styles from './index.less';

const prefixCls = 'am-action-sheet';
const rootCls = classnames(`${prefixCls}-container`);

export default props => {
  const { children, visible, transitionName, maskTransitionName, maskClosable, close } = props;
  //
  return (
    <Dialog
      visible={visible}
      title=""
      footer=""
      prefixCls={prefixCls}
      className={rootCls}
      transitionName={transitionName || styles.amSlideUp}
      maskTransitionName={maskTransitionName || styles.amFade}
      onClose={close}
      maskClosable={maskClosable}
    >
      {children}
    </Dialog>
  );
};
