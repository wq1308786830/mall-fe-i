import Capture, { loadImg } from './capture';
import Processor, { IconMap, TimeDownBegin, CHILD_COUNT_TIPS, NETWORK_ERROR_TIPS } from './detail';

const { handleConfirm, processItemDetail, processItemOrder } = Processor;
const { capture } = Capture;

export default {
  capture,
  loadImg,
  handleConfirm,
  processItemDetail,
  processItemOrder,
  IconMap,
  TimeDownBegin,
  CHILD_COUNT_TIPS,
  NETWORK_ERROR_TIPS,
};
