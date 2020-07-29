import request from '@/utils/request';
import { TIMEDOWN_LIMIT } from '@/utils/data';

const TimeDownBegin = TIMEDOWN_LIMIT || 3600 * 24; // 1 day

export async function getItemDetail(params) {
  // 请求商品详情数据
  const res = await request('/api/item/detail', params);
  // 将数据处理提升到这里
  // 返回数据处理
  const data = res.data || {};
  const { productState, stock } = data;
  let { flashSaleEndSec, flashSaleStartSec } = data;

  // 限时优惠距当前的结束秒数,0表示当前没有限时优惠
  flashSaleEndSec = parseInt(flashSaleEndSec, 10) || 0;
  // 限时优惠距当前的开始秒数
  flashSaleStartSec = parseInt(flashSaleStartSec, 10) || 0;

  let promoteStatus = 0; // 未开始，或结束
  // 已下架，或者库存为0
  if (productState !== 4 && stock) {
    if (flashSaleStartSec && flashSaleStartSec <= TimeDownBegin) {
      promoteStatus = 1; // 促销开始
    } else if (!flashSaleStartSec && flashSaleEndSec > 0) {
      promoteStatus = 2; // 促销中
    }
  }
  // 是否指定用户促销活动
  // {activityName:"老用户专心",promotionValue:"1000"}
  const productPromotionResp = data.productPromotionResp || {};
  const hasActivityPromoting =
    productPromotionResp.activityName && productPromotionResp.promotionValue;
  // 促销状态处理
  data.promoteStatus = promoteStatus;
  data.flashSaleEndSec = flashSaleEndSec;
  data.flashSaleStartSec = flashSaleStartSec;
  data.hasActivityPromoting = hasActivityPromoting;

  res.data = data;

  return res;
}

/**
 * 获取商品信息与个人信息组合为生成海报所需信息
 * @param params { productId<'商品id'>, forShare<'是否用来分享'> }
 * @returns {Promise<unknown[]>}
 */
export function getShareDetail(params) {
  return Promise.all([getItemDetail(params), request('/api/item/userInfo')]);
}
/**
 * 获取当前商品购买用户列表
 */
export async function getHotUserInfo() {
  //
  return request('/api/order/hot-user-info');
}
