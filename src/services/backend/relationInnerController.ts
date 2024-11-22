// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addRelationData POST /api/inner/relation/add */
export async function addRelationDataUsingPost(
  body: API.RelationAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/inner/relation/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
