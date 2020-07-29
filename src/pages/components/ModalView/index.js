import React from 'react';
import { Modal } from 'antd-mobile';
import classnames from 'classnames';

import * as ReactDOM from 'react-dom';
import styles from './index.less';

//
let div = null;
//
function close() {
  //
  if (!div) {
    return;
  }
  // 卸载组件及其子组件
  ReactDOM.unmountComponentAtNode(div);
  if (div && div.parentNode) {
    //
    div.parentNode.removeChild(div);
  }
  //
  div = null;
}

export const ModalView = options => {
  const { content, closable, onClose } = options;
  const footer = options.footer || [];
  footer.map(item => {
    item.onPress = () => {
      //
      if (item.onOk) {
        //
        const result = item.onOk();
        if (!result) {
          //
          close();
        }
      }
      if (item.onCancel) {
        //
        close();
        //
        item.onCancel();
      }
    };
    //
    return item;
  });

  //
  if (onClose) {
    //
    options.onClose = () => {
      //
      close();
      //
      onClose();
    };
  }

  return (
    <Modal
      closable={false}
      popup
      title
      visible
      footer
      onClose={
        closable
          ? () => {
              close();
            }
          : null
      }
      {...options}
      className={classnames(styles.modalAlert)}
    >
      {content}
    </Modal>
  );
};

//
ModalView.show = function(props) {
  //
  if (div) {
    //
    return;
  }
  div = document.createElement('div');
  document.body.appendChild(div);
  //
  ReactDOM.render(React.createElement(ModalView, props), div);
};
//
ModalView.hide = function() {
  //
  close();
};

export default ModalView;
