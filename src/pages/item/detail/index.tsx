import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { Carousel, Flex } from 'antd-mobile';
import classnames from 'classnames';
import storage from '@/utils/storage';
import WxShare, { WxConfigInit } from '@/pages/components/Wx/WxShare';
import Video from '@/pages/components/Video';
import TimeDown from '@/pages/components/TimeDown';
import ActionSheet from '@/pages/components/ActionSheet';
import NumberInput from '@/pages/components/NumberInput';
import Image from '@/pages/components/Image';
import PageLoading, { LoadHandle, LoadStatus } from '@/components/PageLoading';
import ShareModal from '@/pages/item/components/ShareModal';
import { fromTimeStampToDate } from '@/utils/dateUtils';
import { dealTimeText } from '@/utils/data.utils';
import { getItemDetail, getHotUserInfo } from '@/services/item';
import { getSupportURL } from '@/services/base';

import LogoImg from '@/assets/images/mall-logo.png';

import { SHARE_DETAIL_URL_KEY, ITEM_DETAIL_URL } from '@/utils/constants';
import { REQUEST_FAILED_MAX_COUNT } from '@/utils/data';
import { useQuery } from '@/config/routers';
import { shipmentTypeText } from '../../order/state';

import Helpers from '../helpers';
import styles from './index.less';

const { TimeDownBegin, processItemDetail, handleConfirm } = Helpers;

let flashTimer: any = 0;
let REQUEST_FAILED_CURRENT_COUNT = 0;
let requestId: any = null;
let isFirst: boolean = true; // 是否需要播放动效（默认初始首次需要播放）
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;

// 统一入口请求
const doRequest = async (query: { productId: string; _ss: string; _ppl: string; _ca: string }) => {
  const res = await getItemDetail(query);
  // 返回数据处理
  return processItemDetail(res);
};

const Detail: React.FC<IProps<{
  productId: string;
  buyNum: string;
  _ss: string;
  _ca: string;
  _ppl: string;
}>> = () => {
  const query = qs.parse(useLocation().search);
  const router = useHistory();
  const { productId } = query;
  const FLASH_TIME_GAP = 3000;
  const currentBuyNumKey = ['currentBuyNum', productId].join(':');

  const [loadOptions, setLoadOptions] = useState({});
  const [loadQuery, setLoadQuery] = useState({});

  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [buyNum, setBuyNum] = useState(1);
  const [currentCarouselNum, setCurrentCarouselNum] = useState(1);

  const [hideExpensivePrice, setHideExpensivePrice] = useState(false); // 当前价格大于等于划线价则隐藏划线价
  const [supportURL, setSupportURL] = useState('');
  const [flashNode, setFlashNode] = useState<React.ReactElement | null>(null);

  const [pageData, setPageData] = useState<ProcessedDetail>({
    detail: {
      hasActivityPromoting: false, // 该用户是否有用户促销活动（判断：有对应活动名和活动价格）
      freight: -1, // 运费(单位:元)
      originalPriceMax: -1, // 商品最大划线价(单位:元)
      originalPriceMin: -1, // 商品最小划线价(单位:元)
      priceMax: -1, // 商品最大价格(单位:元)
      priceMin: -1, // 商品最小价格(单位:元)
      productPromotionResp: {
        activityName: '', // 指定活动名称
        minPromotionAmount: -1, // 最低售价(单位:元)
        promotionActivityEndTime: -1, // 指定用户优惠结束时间
        promotionValue: -1, // 指定用户优惠金额(立减金额，单位:元)
        skuSamePrice: false, // 全部sku统一售价
      }, // 用户优惠
      productState: -1, // 商品状态:3-售卖中,4-已下架
      productTitle: '', // 商品长标题
      promotionPriceMax: -1, // 商品最大优惠价格(单位:元)
      promotionPriceMin: -1, // 商品最小优惠价格(单位:元)
      shareImageUrl: '', // 分享图URL
      shareName: '', // 分享文案
      shipmentType: -1, // 配送模式:1-无需配送,2-普通快递
      stock: -1, // 库存数量
      videoHeadImageUrl: '', // 视频封面图URL
    },
    carouseVideo: '',
    currentIsVideo: false,
    carouselList: [],
    tags: [],
    descs: [],
    detailHtml: '',
    skuList: [],
    skuDetail: {
      imageUrl: '',
      promotionPrice: -1,
      price: -1,
      skuName: '',
      id: -1,
      stock: -1,
    },
    promoteStatus: -1,
    timetext: '',
    timedown: -1,
    formattext: '',
  });

  const doRequestAfter = (data: any) => {
    const { detail, courseVideo } = data;
    // 此处数据经过处理字段与pageData必须一一对应
    setPageData({ ...data, carouseVideo: courseVideo });

    WxShare(
      {
        title: detail.productTitle,
        imgUrl: detail.shareImageUrl,
        link: window.location.href,
        desc: detail.shareName || '',
      },
      true,
    );
  };

  // 数据请求处理
  const doLoadRequest = useCallback(async () => {
    const { data, res } = await doRequest(query);

    setLoadQuery(query);
    setLoadOptions(LoadHandle(res, {}));
    doRequestAfter(data);

    if (data.userId) {
      gio('setUserId', data.userId);
    }
  }, [query]);

  // 活用用户列表
  const doRequestUserList = async () => {
    const res = await getHotUserInfo();
    const { data } = res || {};
    if (res.resultCode !== 200 || !(data && data.length)) {
      REQUEST_FAILED_CURRENT_COUNT += 1;
      return [];
    }
    const now = Date.now();
    // 数据处理
    Array.prototype.forEach.call(data, (item: HotUser) => {
      const { orderCreationTime, userName, userId } = item;
      // 改写重复ID
      item.time = dealTimeText(orderCreationTime, now);
      item.user = userName;
      item.id = userId;
    });

    return data || [];
  };

  // 设置本地存储数据
  const setSessions = useCallback(() => {
    // @ts-ignore
    const num = storage.get(currentBuyNumKey);

    if (num) {
      setBuyNum(num);
    } else {
      setBuyNum(parseInt(query.buyNum, 10) || 1);
    }
  }, [currentBuyNumKey, query]);

  // 轮播项
  const setFlashNodes = (currentShow: HotUser) => {
    const key = Date.now();
    let nodeEl: React.ReactElement | null;
    if (!currentShow) {
      nodeEl = null;
      setFlashNode(nodeEl);
      return;
    }

    nodeEl = (
      <div key={key} className={styles.flashZone}>
        <div className={styles.flash}>
          <div className={styles.flashContent}>
            <span className={styles.trumpet} />
            <span>
              {currentShow.user.length > 6
                ? `${currentShow.user.substr(0, 6)}...`
                : currentShow.user}
            </span>
            <span>购买了此商品</span>
            <span className={styles.time}>
              <span>&sdot;</span>
              {currentShow.time}
            </span>
          </div>
        </div>
      </div>
    );

    setFlashNode(nodeEl);
  };

  // 轮播获取数据
  const loopFlash = useCallback(async (flashData) => {
    if (flashData.length <= 0) {
      flashData = await doRequestUserList();
    }

    if (REQUEST_FAILED_CURRENT_COUNT > REQUEST_FAILED_MAX_COUNT) {
      return clearTimeout(flashTimer);
    }

    // 第一次进入需要直接播放，以免等到FLASH_TIME_GAP秒后才播放
    if (isFirst) {
      setTimeout(() => {
        setFlashNodes(flashData.shift());
        isFirst = false;
      }, 0);
    }

    flashTimer = setTimeout(() => {
      requestId = requestAnimationFrame(() => {
        setFlashNodes(flashData.shift());

        loopFlash(flashData);

        cancelAnimationFrame(requestId);
      });
    }, FLASH_TIME_GAP);
  }, []);

  useEffect(() => {
    // @ts-ignore
    storage.set(ITEM_DETAIL_URL, window.location.href);
    WxConfigInit();

    setSessions();
    doLoadRequest();
  }, [doLoadRequest, setSessions]);

  // 轮播
  useEffect(() => {
    loopFlash([]);

    return () => {
      clearInterval(flashTimer);
      flashTimer = 0;
      REQUEST_FAILED_CURRENT_COUNT = 0;
    };
  }, [loopFlash]);

  // 获取客服
  useEffect(() => {
    getSupportURL({}).then((url: string) => {
      setSupportURL(url);
    });
  }, []);

  // 用户点击分享按钮
  const onClickShowShareModal = () => {
    const { detail } = pageData;
    setShareModalVisible(true);
    WxShare({
      title: detail.productTitle,
      imgUrl: detail.shareImageUrl,
      link: window.location.href,
      desc: detail.shareName || '',
      isShowTipToast: false,
    });
  };

  // 用户点击生成海报
  const onClickShare = () => {
    setShareModalVisible(false);
    // @ts-ignore
    storage.set(SHARE_DETAIL_URL_KEY, window.location.href);
    router.push(`/item/share?productId=${productId}`);
  };

  // 用户点击确定开始下单
  const toConfirm = () => {
    const { skuDetail, promoteStatus } = pageData;
    const { _ss, _ca, _ppl } = query;
    const properties = {
      skuDetail,
      promoteStatus,
      buyNum,
      query,
      currentBuyNumKey,
      productId,
      _ca,
      _ss,
      _ppl,
    };
    const callbacks = { toConfirm, setActionSheetVisible, doRequest, doRequestAfter };
    handleConfirm(properties, callbacks);
  };

  // 购买状态处理
  const handleStatus = () => {
    const { detail } = pageData;
    // 已下架
    if (detail.productState === 4) {
      //
      return <span className={classnames(styles.btn, styles.disabled)}>已下架</span>;
    }
    // 已售罄
    if (typeof detail.stock === 'number' && !detail.stock) {
      return <span className={classnames(styles.btn, styles.disabled)}>已售罄</span>;
    }
    if (typeof detail.stock !== 'number') {
      return null;
    }

    let btnText = '限时抢购';
    // 免费领取
    if (!detail.priceMin) {
      btnText = '免费领取';
    } else if (detail.productState !== 2) {
      btnText = '立即购买';
    }

    // 限时抢购
    return (
      <span
        className={styles.btn}
        onClick={() => {
          //
          setActionSheetVisible(true);
        }}
      >
        {btnText}
      </span>
    );
  };

  const handlePrice = useMemo(() => {
    const { detail, promoteStatus } = pageData;
    // 活动对象
    const productPromotionResp = detail.productPromotionResp || {};
    const { hasActivityPromoting } = detail;

    // 有用户活动
    if (hasActivityPromoting) {
      // 相同sku
      if (productPromotionResp.skuSamePrice) {
        setHideExpensivePrice(detail.promotionPriceMin >= detail.originalPriceMax);
        return <span>{detail.promotionPriceMin}</span>;
      }

      // 不同sku，显示最低价格 起
      if (productPromotionResp.minPromotionAmount) {
        setHideExpensivePrice(productPromotionResp.minPromotionAmount >= detail.originalPriceMax);
        return (
          <span>
            {productPromotionResp.minPromotionAmount}
            <span className={styles.priceStartText}>起</span>
          </span>
        );
      }
    }

    // 显示促销价格
    if (promoteStatus === 2) {
      if (detail.promotionPriceMin === detail.promotionPriceMax) {
        setHideExpensivePrice(detail.promotionPriceMin >= detail.originalPriceMax);
        return <span>{detail.promotionPriceMin}</span>;
      }

      setHideExpensivePrice(detail.promotionPriceMin >= detail.originalPriceMax);
      return (
        <span>
          {detail.promotionPriceMin}
          <span className={styles.priceStartText}>起</span>
        </span>
      );
    }

    // 显示原价
    if (detail.priceMin === detail.priceMax) {
      setHideExpensivePrice(detail.priceMin >= detail.originalPriceMax);
      return <span>{detail.priceMin}</span>;
    }

    setHideExpensivePrice(detail.priceMin >= detail.originalPriceMax);
    return (
      <span>
        {detail.priceMin}
        <span className={styles.priceStartText}>起</span>
      </span>
    );
  }, [pageData]);

  // 价格样式处理
  const handlePriceCls = () => {
    const { promoteStatus, detail } = pageData;

    return classnames(
      styles.priceZone,
      // 限时优惠中
      promoteStatus ? styles.promoting : null,
      // 显示优惠倒计时
      // promoteStatus && timedown < TimeDownBegin ? styles.promoting : null,
      // 活动
      detail.hasActivityPromoting ? styles.activityZone : null,
    );
  };

  // 标题样式处理
  const handleTitleZoneCls = () => {
    const { promoteStatus, detail, tags } = pageData;
    // 有标签tags，并且没有限时优惠或者活动
    return classnames(
      styles.titleZone,
      tags && tags.length && !(promoteStatus || detail.hasActivityPromoting)
        ? styles.hasTagsZone
        : '',
    );
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  if (!productId) {
    return <PageLoading loadOptions={{ status: LoadStatus.Error, loadErrorText: '参数错误!' }} />;
  }

  const {
    detail,
    carouseVideo,
    carouselList,
    promoteStatus,
    timedown,
    timetext,
    formattext,
    tags,
    descs,
    skuDetail,
    skuList,
    detailHtml,
  } = pageData;
  const productPromotionResp = detail.productPromotionResp || {};

  // 右侧到期时区域显示处理
  const handleTimeZone = () => {
    // 专有用户活动
    if (detail.hasActivityPromoting) {
      return (
        <div className={styles.timeShow}>
          <div className={styles.userActivityText}>
            {productPromotionResp.activityName.length > 10
              ? `${productPromotionResp.activityName.substr(0, 10)}...`
              : productPromotionResp.activityName}
          </div>
          <div className={styles.activityEndTime}>
            {fromTimeStampToDate(productPromotionResp.promotionActivityEndTime, 'MM月DD日HH:mm')}
            结束
          </div>
        </div>
      );
    }
    // 限时促销
    if (promoteStatus && timedown < TimeDownBegin) {
      return (
        <div className={styles.timeShow}>
          <TimeDown
            text={timetext}
            timestamp={timedown}
            format={formattext}
            onComplete={() => {
              doRequest(query).then(({ data }) => {
                doRequestAfter(data);
              });
            }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className={styles.shareZone}>
        {detail.shareImageUrl ? (
          <img src={`${window.location.protocol}${detail.shareImageUrl}`} alt="" />
        ) : null}
      </div>
      <PageLoading loadOptions={loadOptions} doRequest={doLoadRequest} query={loadQuery} />
      <div className={styles.contentWp}>
        {/* 购买轮播 */}
        {flashNode}
        {/* --carousel zone-- */}
        <div className={styles.carouselOuter}>
          <Carousel
            className={styles.carouselWp}
            dots={false}
            autoplay={false}
            infinite={false}
            afterChange={(current) => {
              if (carouseVideo && current === 0) {
                setCurrentCarouselNum(current + 1);
              } else {
                setCurrentCarouselNum(current + 1);
              }
            }}
          >
            {carouselList.map((item: string, index: number) => {
              if (index === 0 && carouseVideo) {
                // 将video src由carouseVideo改为map数组中的item增加可读性
                return (
                  <Video
                    key={item}
                    src={item}
                    cover={detail.videoHeadImageUrl}
                    className={styles.carouselWp}
                  />
                );
              }

              return (
                <div key={item} className={styles.carouselWp}>
                  <img src={item} alt="" />
                </div>
              );
            })}
          </Carousel>
          <div className={styles.carouselPage}>
            <span>{currentCarouselNum}</span>/<span>{carouselList.length || 1}</span>
          </div>
        </div>
        {/* --price zone -- */}
        {/* -- 活动 --*/}
        <div className={handlePriceCls()}>
          <Flex>
            <Flex.Item className={styles.priceShow}>
              <Flex wrap="wrap">
                <div className={styles.price}>
                  <span className={styles.priceSymbol}>￥</span>
                  {handlePrice}
                </div>
                <div className={styles.promoteWp}>
                  {!promoteStatus || detail.hasActivityPromoting ? (
                    <span className={styles.promoteText}>优惠价</span>
                  ) : (
                    <span className={styles.promoteText}>限时优惠</span>
                  )}
                  {detail.originalPriceMax && !hideExpensivePrice ? (
                    <div className={styles.promotePrice}>￥{detail.originalPriceMax}</div>
                  ) : null}
                </div>
              </Flex>
            </Flex.Item>
            {handleTimeZone()}
          </Flex>
        </div>
        {/* --title zone-- */}
        <div className={handleTitleZoneCls()}>
          {tags && tags.length ? (
            <div className={styles.tagZone}>
              {tags.map((item: string) => {
                return item ? (
                  <span key={item} className={styles.officialSign}>
                    {item}
                  </span>
                ) : null;
              })}
            </div>
          ) : null}
          <Flex wrap="wrap" className={styles.titleTextWp}>
            <div className={styles.titleText}>{detail.productTitle}</div>
            <Flex.Item className={styles.share} onClick={onClickShowShareModal}>
              <div className={styles.shareIcon}>分享</div>
            </Flex.Item>
          </Flex>
        </div>
        {/* --freight zone-- */}
        {detail.freight ? (
          <div className={styles.freightZone}>
            <span>配送</span>
            <span className={styles.freightWay}>
              {shipmentTypeText[detail.shipmentType] || '快递配送'}
              <span>￥{detail.freight}</span>
            </span>
          </div>
        ) : null}
        {/* --descs zone-- */}
        {descs.length ? (
          <div className={styles.descZone}>
            <span className={styles.descTitle}>说明</span>
            {descs.map((item: string, index: number) => {
              return item ? (
                <span className={styles.descItem} key={`desc-${index}`}>
                  <span className={styles.descText}>{item}</span>
                  <span className={styles.descDot}>&sdot;</span>
                </span>
              ) : null;
            })}
          </div>
        ) : null}
        {/* --mall zone-- */}
        <div className={styles.mallZone}>
          <Flex>
            <Flex.Item>
              <Image className={styles.mallIcon} src={LogoImg} alt="" />
              <span className={styles.mallName}>叫叫阅读官方</span>
            </Flex.Item>
            {/* <Flex.Item className={styles.moreZone}>
                <span>全部宝贝</span>
                <span className={styles.moreIcon} />
              </Flex.Item> */}
          </Flex>
        </div>
        {/* --detail zone-- */}
        <div className={styles.detailZone}>
          <div dangerouslySetInnerHTML={{ __html: detailHtml }} />
        </div>

        {handleStatus() && (
          <Flex className={styles.bottomZone}>
            {supportURL ? (
              <Flex.Item className={styles.supportZone}>
                <a href={supportURL}>
                  <div className={styles.support}>客服</div>
                </a>
              </Flex.Item>
            ) : null}
            <div className={classnames(styles.btnWrap, !supportURL ? styles.noSupport : '')}>
              {handleStatus()}
            </div>
          </Flex>
        )}
      </div>
      <ActionSheet
        visible={actionSheetVisible}
        close={() => {
          setActionSheetVisible(false);
        }}
      >
        <div className={styles.actionContent}>
          <div>
            <Flex className={styles.skuDetail} align="start">
              <div className={styles.skuImageWp}>
                <Image className={styles.skuImage} alt="" src={skuDetail.imageUrl} />
              </div>
              <div>
                {/* <div className={styles.skuTitle}>{detail.productTitle}</div> */}
                <div className={styles.skuTitle}>
                  ￥
                  {promoteStatus === 2 || detail.hasActivityPromoting
                    ? skuDetail.promotionPrice || 0
                    : skuDetail.price}
                </div>
                <div>
                  <span className={styles.skuSelectText}>已选</span>
                  <span className={styles.skuSelectItem}>“{skuDetail.skuName}”</span>
                </div>
              </div>
            </Flex>
            <div className={styles.selectZone}>
              <div className={styles.title}>选择商品</div>
              <Flex className={styles.itemWp} direction="row" wrap="wrap">
                {skuList.map((item: SkuSaleResp) => {
                  let pieClassName = classnames(styles.item);

                  if (!item.stock) {
                    pieClassName = classnames(styles.item, styles.disabled);
                  } else if (item.id === skuDetail.id) {
                    pieClassName = classnames(styles.item, styles.active);
                  }

                  return (
                    <div
                      className={pieClassName}
                      key={item.id}
                      onClick={() => {
                        setPageData({ ...pageData, skuDetail: item });
                        // 购买数量超过最大库存
                        const { stock } = item;

                        if (buyNum >= stock) {
                          setBuyNum(stock || 1);
                        }
                      }}
                    >
                      {item.skuName}
                    </div>
                  );
                })}
              </Flex>
            </div>
            <Flex className={styles.numberWp}>
              <Flex.Item className={styles.title}>购买数量</Flex.Item>
              <div className={styles.numberInput}>
                <NumberInput
                  number={buyNum || 1}
                  maxNumber={skuDetail.stock ? 1 : 0}
                  minNumber={1}
                  readOnly
                  onChange={(number: number) => {
                    setBuyNum(number);
                  }}
                />
              </div>
            </Flex>
            {!skuDetail.stock ? (
              <div className={classnames(styles.confirmZone, styles.disabled)}>
                <div className={styles.confirmText}>已售罄</div>
              </div>
            ) : (
              <div className={styles.confirmZone} onClick={toConfirm}>
                <div className={styles.confirmText}>确定</div>
              </div>
            )}
          </div>
        </div>
      </ActionSheet>
      {/* 点击分享弹出 */}
      <ShareModal visible={shareModalVisible} onOK={onClickShare} onClose={closeShareModal} />
    </>
  );
};

export default Detail;
