// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取relation_type列表,这里的relation_type是去重的 GET /api/relationType/all */
export async function getRelationTypeNameListUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListString_>('/api/relationType/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据Item查询信息返回ItemVo信息 POST /api/relationType/list/page */
export async function getRelationTypeByPageUsingPost(
  body: API.RelationTypeQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRelationTypeVo_>('/api/relationType/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** relationType更新 POST /api/relationType/update */
export async function updateRelationTypeUsingPost(
  body: API.RelationTypeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/relationType/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
