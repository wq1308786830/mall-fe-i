/**
 * 一位数的字符串头部添加0
 * 如：'1' => '01'
 * @param num
 */
function zeroFill(num: number) {
  return num > 9 ? `${num}` : `0${num}`;
}

interface DateFormat {
  [key: string]: any;
}

export const fromTimeStampToDate = (
  timestamp: number | string,
  formated = 'YYYY-MM-DD HH:mm:ss',
) => {
  //
  if (!timestamp) {
    return '';
  }
  //
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const formatMap: DateFormat = {
    YYYY: year,
    MM: zeroFill(month),
    DD: zeroFill(day),
    HH: zeroFill(hour),
    mm: zeroFill(minute),
    ss: zeroFill(second),
  };

  // 正则替换返回格式化后的日期
  return formated.replace(/\w+/g, function(...args) {
    const format = args[0];
    if (format) {
      return formatMap[format] || '';
    }

    return '';
  });
};

export default {
  fromTimeStampToDate,
};
