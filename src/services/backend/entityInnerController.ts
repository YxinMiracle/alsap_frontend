// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUniqueEntity POST /api/inner/entity/unique/add */
export async function addUniqueEntityUsingPost(
  body: API.EntityAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/inner/entity/unique/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUniqueEntityIdByCtiIdAndEntityName POST /api/inner/entity/unique/entity_id */
export async function getUniqueEntityIdByCtiIdAndEntityNameUsingPost(
  body: API.UniqueEntityIdQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/inner/entity/unique/entity_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
