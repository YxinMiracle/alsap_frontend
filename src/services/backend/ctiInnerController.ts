// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 内部请求，用于添加ctiChunk POST /api/inner/cti/add/chunk */
export async function addCtiChunkUsingPost(
  body: API.CtiChunkAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/inner/cti/add/chunk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 内部请求，用于添加cti实体 POST /api/inner/cti/add/entity */
export async function addCtiEntityUsingPost(
  body: API.CtiEntityInnerAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/inner/cti/add/entity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 内部请求，用于根据id改变内容 POST /api/inner/cti/update/content */
export async function updateCtiContentByCtiIdUsingPost(
  body: API.CtiUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/inner/cti/update/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
