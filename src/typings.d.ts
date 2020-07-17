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

interface RequestOptions {
  method: string;
  baseURL: string;
  data?: any;
}

interface ApiMap {
  [key: string]: ApiMapItem;
}

interface ExtensiveObject {
  [key: string]: any;
}

interface RcForm {
  getFieldsValue: Function;
  getFieldValue: Function;
  getFieldInstance: Function;
  setFieldsValue: Function;
  setFields: Function;
  setFieldsInitialValue: Function;
  getFieldDecorator: Function;
  getFieldProps: Function;
  getFieldsError: Function;
  getFieldError: Function;
  isFieldValidating: Function;
  isFieldsValidating: Function;
  isFieldsTouched: Function;
  isFieldTouched: Function;
  isSubmitting: Function;
  submit: Function;
  validateFields: Function;
  resetFields: Function;
}

interface IndexProps {
  location: {
    search: string;
    query: {
      campaignId?: string;
      token?: string;
      linkId?: string;
      channel?: string;
    };
  };
}

interface ResponseProps {
  status?: number;
  resultCode: number;
  errorMsg: string;
}

interface OptionsProps {}

interface SuccessProps {}

interface ContentComponentProps {
  loadText: string;
  loadImage: string;
  textCls: string;
  imageCls: string;
}

/**
 * 组件信息
 */
interface ComponentInfo {
  campaignId: string; // 活动id
  moduleContent: string; // 组件内容
  moduleSubType: number; // 组件子类型
  moduleType: number; // 组件类型
}

/**
 * 活动信息
 */
interface Campaign {
  campId: string; // 活动id
  campaignTitle: string; // 活动title
  campaignType: number; // 活动类型
  hasIntroduce?: boolean; // 有无介绍页
}

interface CampaignResp extends Campaign {
  pageData: ComponentInfo[];
  skuData: SkuProps[];
}

interface ContextWithReducer<T> {
  state: T;
  dispatch: Function;
}

interface SkuProps {
  btnIcon: string; // 按钮图片
  campaignSkuName: string; // sku营销名称
  campaignSkuUrl: string; // sku营销图片
  courseId: string; // 课程编号
  saleTitle: string; // 课程名称
  needShip: boolean; // 需要发货
  originalPrice: number; // 划线价
  price: number; // sku价格
  skuId: string; // skuId
  id: number; // 售货单id
}

interface SoldSkuProps {
  id: number; // 售货单id
  paidAmount: number | null; // 已支付金额(单位:分)
  settleFee: number | null; // 订单总金额(单位:分)
  courseId: string; // 课程编号
  saleTitle: string; // 销售商品名称(课程名称)
  payStateInt: number; // 支付状态(2:待支付|3:已支付)
  needShip: boolean; // 需要发货
  skuId: string; // skuId
}

interface SkuDetailProps {
  campaignId: string; // 活动id
  countDownType: number; // 倒计时类型(0:无倒计时|1:时间倒计时|2:名额倒计
  courseSaleUrl: string; // 营销图片
  campaignSkuName: string; // sku营销名称
  courseId: string; // 课程编号
  courseName: string; // 课程名称
  needShip: boolean; // 需要发货
  originalPrice: number; // 划线价
  price: number; // sku价格
  skuId: string; // skuId
}

interface PersonCountState {
  left: number; // 剩余名额
  total?: number; // 总名额
}

interface TimeLeft {
  deltaHours?: number; // 剩余小时
  deltaMinutes: number; // 剩余分钟
  deltaSeconds: number; // 剩余秒
}

interface SkuModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: Function;
  skuList: SkuProps[];
  title?: string;
  tips?: string;
}

interface AddressSrc {
  value: number;
  label: string;
  children: AddressSrc[];
}

/**
 * 确认支付页的url参数
 */
interface ConfirmPageQuery {
  sid: string; // sku id
  campId: string; // 活动id
  token: string; // 预览活动的token
  linkId: string; // 正式活动的链接id
  csId: string; // 课程id
  preOId: string; // 订单id
  ordId: string; // h5支付后redirect_url添加的预付单id
  chCode: string; // checkCode用于后续查询支付结果
  pToken: string; // 支付的token
  vPhone: string; // 支付的手机号
  vCode: string; // 支付的验证码
  enPrm: string; // encode后的参数
}

interface HandledRes extends ExtensiveObject {
  status: string;
  loadingText?: string;
}

interface ErrorProps {
  title: string;
  description: string;
  subTitle: string;
  subDescription: string;
}

interface TeacherInfo {
  active: boolean; // 是否激活
  nickname: string;
  courseName: string;
  wechatQr: string;
  'wechatQr-aliyun': string; // aliyun真实图片地址
  hasNewCourse: boolean; // 是否为新领的课程(true:新领的课|false:老的课)
  miniMpName: string; // 小程序名称
  miniMpQrCode: string; // 小程序二维码
}

interface TeacherOtherResult {
  courseName: string;
  status: string;
  description: string;
}

interface TeacherResult {
  imgUrl: string;
  teachers: TeacherInfo[];
}

interface ErrInfo {
  errCode?: number;
  errMsg: string;
  description: string;
}

interface Info {
  url: string;
  name: string;
}

interface AddressFormState {
  id?: number | null;
  name: string;
  phone: string;
  districtCode: Array<number>;
  districtName: string[];
  addressDetail: string;
  isDefault: boolean;
}

interface AddressFormProps {
  form: RcForm;
  orderParams: any;
  formState: AddressFormState;
}

interface ActiveModalState {
  visible: boolean;
  data: SkuProps[];
}

interface WeChatInfo {
  info: Info | null;
}

interface CodeVerifyProps {
  phoneCode: { phone: string; code: string };
  onPhoneCodeChange: Function;
  location: { pathname: string };
}

interface PayLoadingProps {
  visible: boolean;
  onClose: () => void;
  onPaid: () => void;
  toRePay: () => void;
}

interface ModalCommonProps {
  visible: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  cancelText?: string;
  onClose?: () => void;
  onOk?: () => void;
}

interface ConfirmProps {
  location: {
    pathname: string;
    query: ConfirmPageQuery;
  };
}

interface SkuListProps {
  skuList: SkuProps[];
  onSelect: Function;
}

interface PhoneItem {
  phone: string;
  time: string;
}

interface FrontErrorResp {
  flagCode: number;
  frontUserResp: { avatarUrl: string; nickname: string };
  frontAppletResp: { url: string; name: string };
}

interface ActivateModalProps {
  needShip: boolean;
  courseName: string;
  courseId: string;
  soldNoteId: number;
  setActivateModal: React.Dispatch<React.SetStateAction<ModalCommonProps>>;
}

interface QRCodeModal {
  qrCode: string;
  visible: boolean;
  onClose: () => void;
}
