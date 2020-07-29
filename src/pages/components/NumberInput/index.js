import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { Flex } from 'antd-mobile';
import Icon from '../IconFont';

import styles from './index.less';

export default props => {
  // const inputRef = null;
  const { readOnly, onChange = function() {} } = props;
  let { number = 1, minNumber = 1, maxNumber = 100 } = props;
  //
  number = parseInt(number, 10) || 1;
  minNumber = parseInt(minNumber, 10) || 1;
  maxNumber = parseInt(maxNumber, 10) || 1;

  // 不能超过最大库存量
  number = number >= maxNumber ? maxNumber : number;
  // console.log(number,minNumber,maxNumber);
  //
  const [currentNumber, setCurrentNumber] = useState(number);

  const [minDisabled, setMinDisabled] = useState(true);
  const [maxDisabled, setMaxDisabled] = useState(false);
  //
  useEffect(() => {
    //
    setCurrentNumber(number);
    setMinDisabled(number <= minNumber);
    setMaxDisabled(number >= maxNumber);
  }, [props.number, props.maxNumber, props.minNumber, number, minNumber, maxNumber]);

  const change = current => {
    //
    if (current !== currentNumber) {
      //
      onChange(current);
    }

    if (current <= minNumber) {
      //
      setMinDisabled(true);
    } else if (current >= maxNumber) {
      //
      setMaxDisabled(true);
    } else {
      //
      setMaxDisabled(false);
      setMinDisabled(false);
    }
  };
  //
  const decrease = () => {
    let current = currentNumber;
    current -= 1;
    //
    if (current <= minNumber) {
      current = minNumber;
    }

    //
    setCurrentNumber(current);
    //
    change(current);
  };

  //
  const increase = () => {
    let current = currentNumber;
    current += 1;
    //
    if (current >= maxNumber) {
      current = maxNumber;
    }
    //
    setCurrentNumber(current);
    //
    change(current);
  };

  return (
    <Flex className={styles.numberInput}>
      <div
        onClick={decrease}
        className={classnames(styles.decrease, minDisabled ? styles.disabled : '')}
      >
        <Icon type="decrease" width={64} height={64} />
      </div>
      <Flex.Item className={styles.input}>
        <input type="number" value={currentNumber} readOnly={readOnly} />
      </Flex.Item>
      <div
        onClick={increase}
        className={classnames(styles.increase, maxDisabled ? styles.disabled : '')}
      >
        <Icon type="increase" width={64} height={64} />
      </div>
    </Flex>
  );
};
