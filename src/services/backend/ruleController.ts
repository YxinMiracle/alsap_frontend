// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createRule POST /api/rule/create */
export async function createRuleUsingPost(
  body: API.CtiRuleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/rule/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** removeRuleByRuleId POST /api/rule/delete */
export async function removeRuleByRuleIdUsingPost(
  body: API.CtiRuleDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/rule/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** downloadRuleById GET /api/rule/download */
export async function downloadRuleByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadRuleByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/rule/download', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getRuleByCtiId POST /api/rule/list */
export async function getRuleByCtiIdUsingPost(
  body: API.CtiRuleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCtiRules_>('/api/rule/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
