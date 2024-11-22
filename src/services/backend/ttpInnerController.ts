// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 内部请求，用于添加ttp POST /api/inner/ttp/add */
export async function addCtiTtpUsingPost(
  body: API.TtpAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/inner/ttp/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
