import request from '@/utils/request';

export const getItemDetail = (params: any) => request('/api/item/detail', params);
