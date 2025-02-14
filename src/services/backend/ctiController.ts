// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加Cti情报 POST /api/cti/add */
export async function addCtiReportUsingPost(
  body: API.CtiAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/cti/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据CtiId删除对应的Cti，需要管理员权限 POST /api/cti/delete */
export async function deleteCtiByCtiIdUsingPost(
  body: API.CtiDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/cti/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ctiId获取对应的cti详情信息 POST /api/cti/detail */
export async function getDetailCtiUsingPost(
  body: API.CtiDetailQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCtiDetailVo_>('/api/cti/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCtiDetailEntityData POST /api/cti/detail/entity */
export async function getCtiDetailEntityDataUsingPost(
  body: API.CtiDetailEntityRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCtiDetailEntityVo_>('/api/cti/detail/entity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据Cti查询信息返回CtiVo信息 POST /api/cti/list/page */
export async function getCtiByPageSentinelUsingPost(
  body: API.CtiQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCtiVo_>('/api/cti/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 从es中查询cti相关的数据 POST /api/cti/search/page/es/vo */
export async function searchCtiVoByPageUsingPost(
  body: API.CtiEsQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCtiVo_>('/api/cti/search/page/es/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取模型已经标注好的数据 POST /api/cti/word/label/page/ */
export async function getPageCtiWordLabelListUsingPost(
  body: API.CtiModelWordLabelResultDto,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCtiWordLabelVo_>('/api/cti/word/label/page/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
