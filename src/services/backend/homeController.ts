// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getHomeCtiTotalCount GET /api/home/home/view/ctiTotalCount */
export async function getHomeCtiTotalCountUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseHomeViewDataVo_>('/api/home/home/view/ctiTotalCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getHomeScoItemsCount GET /api/home/home/view/scoItemsCount */
export async function getHomeScoItemsCountUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseHomeViewDataVo_>('/api/home/home/view/scoItemsCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getHomeSdoItemsCount GET /api/home/home/view/sdoItemsCount */
export async function getHomeSdoItemsCountUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseHomeViewDataVo_>('/api/home/home/view/sdoItemsCount', {
    method: 'GET',
    ...(options || {}),
  });
}
