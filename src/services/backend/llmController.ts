// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getLlmAnsByStream GET /api/llm/forward */
export async function getLlmAnsByStreamUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLlmAnsByStreamUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/api/llm/forward', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
