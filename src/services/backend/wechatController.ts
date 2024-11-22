// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getTicket GET /api/wx/ticket */
export async function getTicketUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/wx/ticket', {
    method: 'GET',
    ...(options || {}),
  });
}
