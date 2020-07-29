import React from 'react';
import * as ReactDOM from 'react-dom';

import classnames from 'classnames';

import Icon from '../IconFont';
import styles from './index.less';

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

const Tips = props => {
  const { text, icon, className } = props;
  //
  const duration = parseInt(props.duration, 10) || 2000;
  //
  if (duration) {
    //
    const t = setTimeout(() => {
      //
      close();
      //
      clearTimeout(t);
    }, duration);
  }
  //
  return (
    <div className={classnames(styles.tipsWp, className, styles.visible)}>
      <div className={styles.tipsZone}>
        {icon !== false ? <Icon type="alert" wrapped width={36} height={36} /> : null}
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
};

//
Tips.show = function(props) {
  //
  if (div) {
    //
    return;
  }
  div = document.createElement('div');
  document.body.appendChild(div);
  //
  if (typeof props === 'string') {
    props = {
      text: props,
    };
  }
  //
  ReactDOM.render(React.createElement(Tips, props), div);
};
Tips.hide = function() {
  close();
};

export default Tips;
