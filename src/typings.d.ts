/**
 * 接口对象定义
 */
interface ApiMapItem {
  action: string;
  method?:
    | 'GET'
    | 'POST'
    | 'get'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'
    | undefined; // default to get
  baseURL: string;
  key?: string;
  prefix?: string;
  data?: string;
  serialized?: boolean;
}

interface ApiMap {
  [key: string]: ApiMapItem;
}

interface IProps<T> {
  location: { query: T };
}

interface ExtensiveObject {
  [key: string]: any;
}

interface HandledRes extends ExtensiveObject {
  status: string;
  loadingText?: string;
}

interface ProductInfo {
  productTitle: string; // 商品名称
  shareImageUrl: string; // 分享缩略图
  shareName: string; // 分享描述
}

/**
 * 当前用户的用户优惠信息
 */
interface ProductPromotionResp {
  activityName: string; // 指定活动名称
  minPromotionAmount: number; // 最低售价(单位:元)
  promotionActivityEndTime: number; // 指定用户优惠结束时间
  promotionValue: number; // 指定用户优惠金额(立减金额，单位:元)
  skuSamePrice: boolean; // 全部sku统一售价
}

/**
 * sku商品对应的指定用户活动信息
 */
interface SkuPromotionResp {
  activityPromotionName: string; // 指定用户优惠名称
  activityPromotionPrice: number; // 指定用户优惠价格,单位分
  activityPromotionValue: number; // 指定用户优惠金额,单位分
  limitedTimePromotionPrice: number; // 限时优惠价,单位分
  promotionType: number; // 优惠类型。1立减，2限时优惠
}

/**
 * 单个sku商品
 */
interface SkuSaleResp {
  id: number; // sku id
  imageUrl: string; // sku图片
  price: number; // sku售价
  promotionPrice: number; // sku优惠价
  skuName: string; // sku名称
  skuPromotionResp?: SkuPromotionResp; // sku商品对应的指定用户活动信息
  stock: number; // sku库存
}

interface PageDetail {
  hasActivityPromoting: boolean; // 该用户是否有用户促销活动（判断：有对应活动名和活动价格）
  freight: number; // 运费(单位:元)
  originalPriceMax: number; // 商品最大划线价(单位:元)
  originalPriceMin: number; // 商品最小划线价(单位:元)
  priceMax: number; // 商品最大价格(单位:元)
  priceMin: number; // 商品最小价格(单位:元)
  productPromotionResp: ProductPromotionResp; // 用户优惠
  productState: number; // 商品状态:3-售卖中,4-已下架
  productTitle: string; // 商品长标题
  projectId?: number; // 项目ID
  promotionPriceMax: number; // 商品最大优惠价格(单位:元)
  promotionPriceMin: number; // 商品最小优惠价格(单位:元)
  shareImageUrl: string; // 分享图URL
  shareName: string; // 分享文案
  shipmentType: number; // 配送模式:1-无需配送,2-普通快递
  stock: number | null; // 库存数量
  videoHeadImageUrl: string; // 视频封面图URL
}

/**
 * 处理后的商品详情数据
 */
interface ProductDetail extends PageDetail {
  id: number; // 商品ID
  userId: number | null; // 用户id
  courseVideo: string;
  promoteStatus: -1 | 0 | 1 | 2; // 0默认值未开始，或结束，1促销开始，2促销中
  flashSaleEndSec: number; // 限时优惠距当前的结束秒数,0表示当前没有限时优惠
  flashSaleStartSec: number; // 限时优惠距当前的开始秒数
  imageUrls: string[];
  detailHtml: string; // 详情图html字符串
  productDesc: string; // 商品说明（多个以’,’隔开）
  productLabel: string; // 营销标签（多个以’,’隔开）
  productName: string; // 商品短标题
  projectId: number; // 项目ID
  skuList: SkuSaleResp[]; // sku商品列表
  videoUrl: string; // 视频URL
}

interface ProcessedDetail {
  detail: PageDetail;
  carouseVideo: string;
  currentIsVideo: boolean;
  detailHtml: string;
  carouselList: string[]; // 商品的轮播图
  skuList: SkuSaleResp[]; // sku商品列表
  tags: string[]; // 营销标签通过productLabel计算出
  descs: string[]; // 商品说明通过productDesc计算出
  skuDetail: SkuSaleResp;
  promoteStatus: number;
  timetext: string;
  timedown: number;
  formattext: string;
}

interface HotUserOrigin {
  orderCreationTime: number;
  userId: number;
  userName: string;
}

interface HotUser extends HotUserOrigin {
  time: string;
  id: number;
  user: string;
}

interface AddressInfo {
  addressDetail: string;
  areaRegionId: number;
  areaRegionName: string;
  cityRegionId: number;
  cityRegionName: string;
  id: number;
  isDefault: boolean;
  provinceRegionId: number;
  provinceRegionName: string;
  recipientName: string;
  recipientPhone: string;
  streetRegionId: number | null;
  streetRegionName: string | null;
  userId: number;
}

interface SubItem {
  id: string;
  skuName: string;
  categoryType: string;
  gift: string;
  itemType: number;
  quantity: string;
  requestType?: string;
}

interface RefundDetail {
  requestType: string;
}

interface DetailList {
  type: string;
  subItems: SubItem[];
  refundDetail?: RefundDetail;
}
