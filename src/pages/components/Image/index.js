import React from 'react';

import DefaultImageSrc from '@/assets/images/mall-no-content.png';

function Image(props) {
  const { src, alt = '', className, style } = props;

  const onError = (res) => {
    console.log(res);
  };

  //
  return (
    <img
      src={src || DefaultImageSrc}
      alt={alt}
      onError={onError}
      className={className}
      style={style}
    />
  );
}

export default Image;
