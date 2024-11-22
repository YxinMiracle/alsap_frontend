// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 返回item的Map形数据, 这可以用来规定下拉框的选择 GET /api/item/all */
export async function getAllItemMapDataUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapLongItem_>('/api/item/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据ItemId删除对应的Item，需要管理员权限 POST /api/item/delete */
export async function deleteItemByItemIdUsingPost(
  body: API.ItemDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/item/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Item查询信息返回ItemVo信息 POST /api/item/list/page */
export async function getItemByPageUsingPost(
  body: API.ItemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageItemVo_>('/api/item/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** item更新,只有管理员 POST /api/item/update */
export async function updateItemUsingPost(
  body: API.ItemUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/item/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
