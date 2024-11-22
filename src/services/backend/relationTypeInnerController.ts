// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getItemIdByItemName POST /api/inner/relation/type/is_relation/${param2}/${param0}/${param1} */
export async function getItemIdByItemNameUsingPost1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getItemIdByItemNameUsingPOST1Params,
  options?: { [key: string]: any },
) {
  const { endItemId: param0, relationName: param1, startItemId: param2, ...queryParams } = params;
  return request<API.BaseResponseLong_>(
    `/api/inner/relation/type/is_relation/${param2}/${param0}/${param1}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
