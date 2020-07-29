import React, { useState, useEffect } from 'react';
import styles from './index.less';

const DAY = 24 * 60 * 60;
const HOUR = 60 * 60;
const MINUTE = 60;
const INIT = '00:00:00';

let COUNTDOWN = 0;

//
function zeronumber(number) {
  //
  if (number < 10) {
    //
    return ['0', number].join('');
  }

  return number;
}

function timedown(timestamp, format) {
  const day = Math.floor(timestamp / DAY);
  let rest = timestamp % DAY;
  const hour = zeronumber(Math.floor(rest / HOUR));
  rest %= HOUR;
  const minute = zeronumber(Math.floor(rest / MINUTE));
  const second = zeronumber(rest % MINUTE);

  // console.log(day, hour, minute, second);
  return format
    .replace(/\{day\}/, day)
    .replace(/\{hour\}/, hour)
    .replace(/\{minute\}/, minute)
    .replace(/\{second\}/, second);
  // return [day, '天', ' ', hour, ':', minute, ':', second].join('');
}

export default props => {
  const {
    onComplete = () => {},
    onTimeUpdate = () => {},
    text = '距结束仅剩',
    format = '{hour}:{minute}:{second}',
  } = props;
  const timestamp = parseInt(props.timestamp, 10) || 0;

  if (timestamp <= 0) {
    return null;
  }
  //
  const [current, setCurrent] = useState(INIT);

  useEffect(() => {
    const timer = setInterval(() => {
      //
      COUNTDOWN += 1;
      //
      const now = timestamp - COUNTDOWN;
      const result = timedown(now, format);
      //
      if (now <= 0) {
        //
        setCurrent(INIT);
        //
        clearInterval(timer);
        //
        onComplete(now);
        //
        return () => {
          //
          clearInterval(timer);
        };
      }
      //
      setCurrent(result);
      //
      onTimeUpdate(now, result);
    }, 1000);

    return () => {
      //
      clearInterval(timer);
    };
  }, [props.text, props.format, timestamp, format, onTimeUpdate, onComplete]);

  //
  return (
    <div className={styles.timeDownWp}>
      <div className={styles.timeDownLeft}>
        <span>{text}</span>
      </div>
      <div className={styles.timeDownRight}>
        <span>{current}</span>
      </div>
    </div>
  );
};
