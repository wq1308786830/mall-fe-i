import request from '@/utils/request';
// 获取微信配置
export async function getWxCofnig(params) {
  //
  return request('/api/wx/config', params);
}
