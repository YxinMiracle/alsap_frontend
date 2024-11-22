// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据Cti查询信息返回CtiVo信息 POST /api/ttp/config */
export async function getTtpConfigByCtiIdUsingPost(
  body: API.TtpQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/ttp/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** downloadTtpConfigById GET /api/ttp/download */
export async function downloadTtpConfigByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadTtpConfigByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/ttp/download', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
