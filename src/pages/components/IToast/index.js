/**
 * 针对商城业务的通用toast组件
 */
import React from 'react';
import * as ReactDOM from 'react-dom';

import toastSuccess from '@/assets/images/toast-success@2x.png';
import css from './index.less';

const IToast = ({ content, duration, icon, callBack, showMask = true }) => {
  setTimeout(() => {
    IToast.close();
    callBack();
  }, duration * 1000);

  return (
    <>
      {showMask && <div className={css.iToastMask} />}
      <div className={css.iToast}>
        <div className={css.content}>
          <p>
            <img src={icon} alt="" />
          </p>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

let iToast = null;

IToast.success = (content, duration, callBack = () => {}) => {
  if (iToast) {
    return;
  }

  iToast = document.createElement('div');
  document.body.appendChild(iToast);

  ReactDOM.render(
    React.createElement(IToast, { content, duration, icon: toastSuccess, callBack }),
    iToast,
  );
};

IToast.close = () => {
  if (!iToast) {
    return;
  }

  ReactDOM.unmountComponentAtNode(iToast);

  if (iToast && iToast.parentNode) {
    iToast.parentNode.removeChild(iToast);
  }

  iToast = null;
};

export default IToast;
