// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getGraphDataByCtiId POST /api/graph/cti */
export async function getGraphDataByCtiIdUsingPost(
  body: API.CtiGraphQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListGraphVo_>('/api/graph/cti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getNodeRelCtiData POST /api/graph/node/rel */
export async function getNodeRelCtiDataUsingPost(
  body: API.CtiNodeRelCtiQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseNodeRelCtiVo_>('/api/graph/node/rel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
