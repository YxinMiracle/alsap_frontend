// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getGzhLoginReceive GET /api/wx/event */
export async function getGzhLoginReceiveUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/wx/event', {
    method: 'GET',
    ...(options || {}),
  });
}

/** postGzhLoginReceive POST /api/wx/event */
export async function postGzhLoginReceiveUsingPost(options?: { [key: string]: any }) {
  return request<string>('/api/wx/event', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 根据Cti查询信息返回CtiVo信息 GET /api/wx/qrcode */
export async function createTempQrCodeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseQrCodeVo_>('/api/wx/qrcode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getTicket GET /api/wx/ticket */
export async function getTicketUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/wx/ticket', {
    method: 'GET',
    ...(options || {}),
  });
}
