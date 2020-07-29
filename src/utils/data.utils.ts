/**
 * 多少时间之前数据处理
 * @param timestamp
 * @param now
 */
export const dealTimeText = (timestamp: number, now?: number) => {
  now = now || Date.now();
  // 秒前
  let current = Math.floor((now - timestamp) / 1000); // s
  if (current <= 0) {
    //
    return '1秒前';
  }
  if (current < 60) {
    //
    return [current, '秒前'].join('');
  }
  // 分钟前
  current = Math.floor(current / 60); // minute
  if (current < 60) {
    //
    return [current, '分钟前'].join('');
  }

  // 小时前
  current = Math.floor(current / 60); // hour
  if (current < 24) {
    //
    return [current, '小时前'].join('');
  }
  // *天前
  current = Math.floor(current / 24); // day
  if (current < 3) {
    return [current, '天前'].join('');
  }
  //
  return '3天前';
};
