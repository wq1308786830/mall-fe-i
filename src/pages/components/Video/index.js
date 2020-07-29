import React, { useState } from 'react';
import classnames from 'classnames';

import videoPlayIcon from '@/assets/images/play-video@2x.png';
import styles from './index.less';

export default (props) => {
  const { src, cover, className, onEnded = () => {} } = props;

  if (!src) {
    //
    return null;
  }
  //
  let video = null;

  const [playing, setPlaying] = useState(false);

  const videoRef = (el) => {
    //
    video = el;
  };
  // 暂停
  const pause = () => {
    setPlaying(false);
  };
  // 结束
  const ended = () => {
    //
    setPlaying(false);
    //
    if (onEnded) {
      //
      onEnded();
    }
  };
  // 播放
  const play = () => {
    if (!video) {
      //
      return;
    }
    //
    if (!playing) {
      //
      video.play();
    } else {
      //
      video.pause();
    }
    //
    const delay = setTimeout(() => {
      //
      setPlaying(!playing);
      clearTimeout(delay);
    }, 100);
  };

  return (
    <>
      <div className={classnames(styles.videoWp, className)}>
        <div
          className={classnames(styles.poster, playing ? styles.visible : styles.invisible)}
          onClick={play}
        >
          <img className={styles.playBtn} src={videoPlayIcon} alt="" />
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={src}
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          controls
          ref={videoRef}
          poster={cover}
          x5-playsinline="true"
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          onPause={pause}
          onEnded={ended}
        />
      </div>
    </>
  );
};
