// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getItemIdByItemName POST /api/inner/item/${param0} */
export async function getItemIdByItemNameUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getItemIdByItemNameUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { itemName: param0, ...queryParams } = params;
  return request<API.BaseResponseLong_>(`/api/inner/item/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
