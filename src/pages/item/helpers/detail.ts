import { Toast } from 'antd-mobile';
import { CHILD_COUNT_TIPS, NETWORK_ERROR_TIPS, TIMEDOWN_LIMIT } from '@/utils/data';
import { validateOrder } from '@/services/order';
import { ModalView } from '@/pages/components/ModalView';
import { getUnBindURL } from '@/utils/base';
import storage from '@/utils/storage';

const IconMap = {
  0: 'traffic',
  1: 'right',
  2: 'safe',
  3: 'leaf',
  4: 'heart',
  5: 'global',
};

const TimeDownBegin = TIMEDOWN_LIMIT || 3600 * 24; // 1 day

/**
 * 处理获取到的详情数据可以直接使用
 * @param res
 * @returns {{res: *, data: {skuList: [], timetext: string, courseVideo, detailHtml: string, promoteStatus, currentIsVideo: boolean, skuDetail: (*|{}), tags: string[] | [], descs: string[] | [], timedown: number, detail: (*|{}), carouselList: [], formattext: string}}}
 */
const processItemDetail = (res: { data: ProductDetail }) => {
  const data = res.data || {};
  const {
    userId,
    videoUrl,
    productLabel = '',
    skuList = [],
    productDesc = '',
    promoteStatus,
    flashSaleEndSec,
    flashSaleStartSec,
  } = data;
  let { detailHtml = '', imageUrls = [] } = data;
  //
  detailHtml = detailHtml || '';
  detailHtml = detailHtml.replace(/(\s+|:\s*?)(\d+\.?\d+?)px/gi, (a, b, c) => {
    if (!c) {
      //
      return a;
    }

    return [b, (parseFloat(c) * 2) / 100, 'rem'].join('');
  });

  const tags = productLabel ? productLabel.split(/[,，]/) : [];
  const descs = productDesc ? productDesc.split(/[,，]/) : [];

  if (videoUrl) {
    // 视频作为第一项
    imageUrls = [videoUrl, ...imageUrls];
  }

  let timetext = '';
  let formattext = '';
  let timedown = flashSaleEndSec - flashSaleStartSec;
  // 促销未开始
  if (promoteStatus === 1) {
    //
    timetext = '距开始仅剩';
    formattext = '{hour}:{minute}:{second}';
    timedown = flashSaleStartSec;
  } else if (promoteStatus === 2) {
    // 促销中
    timetext = '距结束仅剩';
    // formattext = '{day}天 {hour}:{minute}:{second}';
    formattext = '{hour}:{minute}:{second}';
    timedown = flashSaleEndSec;
  }
  // 显示有库存sku
  const skuDetail =
    skuList.find((item) => {
      //
      return !!item.stock;
    }) ||
    skuList[0] ||
    {};
  // TODO DEBUG
  /* content.activityName = '老用户优惠';
  content.promotionValue = '245';
  content.promotionActivityEndTime = 1585205582526; */

  return {
    data: {
      detail: data,
      userId,
      courseVideo: videoUrl,
      currentIsVideo: !!videoUrl,
      carouselList: imageUrls,
      tags,
      descs,
      detailHtml,
      skuList,
      skuDetail,
      promoteStatus,
      timetext,
      timedown,
      formattext,
    },
    res,
  };
};

const handleConfirm = (properties: any, callbacks: any) => {
  const {
    skuDetail,
    promoteStatus,
    buyNum,
    query,
    currentBuyNumKey,
    productId,
    _ca,
    _ss,
    _ppl,
  } = properties;
  const { toConfirm, setActionSheetVisible, doRequest, doRequestAfter } = callbacks;
  const skuId = skuDetail.id;
  const unitPrice = parseFloat(promoteStatus === 2 ? skuDetail.promotionPrice : skuDetail.price);
  const num = parseInt(buyNum, 10);
  if (!num) {
    //
    return Toast.fail('购买数量不能为0');
  }
  const totalPrice = num * unitPrice;
  const params = {
    quantity: buyNum,
    skuId,
    totalAmount: totalPrice,
  };
  //
  if (toConfirm.requesting) {
    return console.log('to confirm requesting ...');
  }
  toConfirm.requesting = true;
  //
  validateOrder(params).then(({ data, resultCode, errorMsg }) => {
    //
    toConfirm.requesting = false;
    if (!(resultCode || data)) {
      //
      return Toast.fail(errorMsg || NETWORK_ERROR_TIPS);
    }
    // 3001 子账号购买
    if (resultCode === 3001) {
      //
      setActionSheetVisible(false);
      //
      return ModalView.show({
        title: '提示',
        content: CHILD_COUNT_TIPS.ORDER_CREATE,
        footer: [
          {
            text: '暂不解绑',
            onCancel: () => {},
          },
          {
            text: '解绑账号',
            onOk: () => {
              const url = getUnBindURL(window.location.href);
              //
              return window.location.replace(url);
            },
          },
        ],
      });
    }
    // 价格发生变化
    if (resultCode === 1001) {
      Toast.fail('抱歉，价格已发生变化!');

      toConfirm.requesting = true;
      //
      return doRequest(query).then(({ data }: { data: ProductDetail }) => {
        //
        toConfirm.requesting = false;
        //
        doRequestAfter(data);
      });
    }
    //
    if (resultCode !== 200) {
      // 验证提示
      return Toast.fail(errorMsg || '抱歉，验证未通过!');
    }
    setActionSheetVisible(false);
    //
    // @ts-ignore
    storage.set(currentBuyNumKey, buyNum);

    const ca = _ca ? `_ca=${_ca}` : undefined;
    const ss = _ss ? `_ss=${_ss}` : undefined;
    const ppl = _ppl ? `_ppl=${_ppl}` : undefined;
    const encParams = [ca, ss, ppl].filter((v) => !!v).join('&');

    // history.push(
    //   `/order/create?productId=${productId}&buyNum=${buyNum}&skuId=${params.skuId}&${encParams}`,
    // );
  });
};

const processItemOrder = (
  res: { data: ProductDetail },
  query: { skuId: string; buyNum: string },
) => {
  const { skuId } = query;
  const buyNum = parseInt(query.buyNum, 10) || 1;

  // 返回数据处理
  const data = res.data || {};
  const { skuList = [], flashSaleEndSec, flashSaleStartSec, promoteStatus } = data;
  const skuDetail =
    skuList.find((item) => {
      //
      return `${item.id}` === `${skuId}`;
    }) ||
    skuList[0] ||
    {};

  // 原价
  const unitPrice = skuDetail.price;
  const productPrice = parseFloat((skuDetail.price * buyNum).toFixed(2));

  // 根据当前sku价格调整是否使用促销活动
  const productPromotionResp = data.productPromotionResp || {};
  const { promotionValue } = productPromotionResp;
  const currentSkuSavePrice = parseFloat((skuDetail.price - skuDetail.promotionPrice).toFixed(2));
  // 限时优惠价格大于活动优惠时
  if (promotionValue && currentSkuSavePrice > promotionValue) {
    //
    data.hasActivityPromoting = false;
  }

  // 促销中才有优惠价格
  // 有用户活动
  const savePrice =
    promoteStatus === 2 || data.hasActivityPromoting
      ? parseFloat((currentSkuSavePrice * buyNum).toFixed(2))
      : 0;
  // 优惠后的价格
  const discountPrice = parseFloat((productPrice - savePrice).toFixed(2));
  // console.log(discountPrice,savePrice,productPrice,promoteStatus,content.hasActivityPromoting);
  // 加上运费的合计价格，即最后支付价格
  const totalPrice = parseFloat((discountPrice + data.freight || 0).toFixed(2));

  // 配送状态
  const { shipmentType } = data;
  let timedown = flashSaleEndSec - flashSaleStartSec;
  // 促销未开始
  if (promoteStatus === 1) {
    timedown = flashSaleStartSec;
  } else if (promoteStatus === 2) {
    timedown = flashSaleEndSec;
  }

  return {
    data: {
      detail: data,
      buyNum,
      skuId: skuId || skuDetail.id,
      skuDetail,
      unitPrice,
      productPrice,
      totalPrice,
      discountPrice,
      savePrice,
      shipmentType,
      timedown,
      completed: !!flashSaleEndSec,
    },
    res,
  };
};

export { IconMap, TimeDownBegin, CHILD_COUNT_TIPS, NETWORK_ERROR_TIPS };

export default {
  handleConfirm,
  processItemDetail,
  processItemOrder,
};
