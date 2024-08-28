import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import CryptoJS from 'crypto-js';

interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}

interface T1Params {
  p?: string;
  a?: string;
  n?: string;
  k?: string;
}

type IndexArray = number[];

const isDev = process.env.NODE_ENV === 'development';

const lF: string = 'zxcvbnmlkjhgfdsaqwertyuiop0987654321QWERTYUIOPLKJHGFDSAZXCVBNM';
const fne: string = lF + '-@#$%^&*+!';

const qu = (e: IndexArray = []): string => {
  return e.map((t) => fne[t]).join('');
};

const dne = (e: number, t: number) => {
  return parseInt(String(Math.random() * (t - e + 1) + e), 10);
};

const hne = (e: number): string => {
  return [...Array(e)].map(() => lF[dne(0, 61)]).join('');
};

const pne = (e: Record<string, any> | string): string => {
  let t: string = '';
  if (typeof e === 'object') {
    t = Object.keys(e)
      .map((n) => `${n}=${e[n]}`)
      .sort()
      .join('&');
  } else if (typeof e === 'string') {
    t = e.split('&').sort().join('&');
  }
  return t;
};

// 使用 CryptoJS 计算 SHA-256
const uK = (input: string): string => {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
};

const t1 = (e: T1Params = {}): string => {
  const { p: t, n: u, k: o, a: i } = e;
  return uK(u + o + i);
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD,
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 确保只对POST请求进行处理
      if (
        config.method?.toUpperCase() === 'POST' &&
        config.data &&
        typeof config.data === 'object'
      ) {
        const ixHyFxIl = JSON.stringify;
        const rightData = config.data;
        const dataString = Buffer.from(ixHyFxIl(config.data)).toString('base64');
        const key = CryptoJS.enc.Utf8.parse(
          qu([41, 1, 23, 5, 61, 23, 19, 15, 2, 7, 18, 62, 54, 46, 53, 54, 45]),
        );
        const encrypted = CryptoJS.DES.encrypt(dataString, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
        config.data = {
          [qu([10, 56, 10, 41, 35, 59, 34, 47, 13])]: encrypted.toString(),
        };

        const L = hne(16);
        const T = Date.now();

        const d = {
          [qu([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 60, 24, 5, 2, 18])]: L,
          [qu([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 40, 23, 6, 18, 14, 20, 15, 6, 25])]: T,
        };

        const p = {
          p: ixHyFxIl(rightData),
          a: T,
          n: L,
          k: qu([8, 28, 20, 42, 21, 53, 65, 6]),
        };

        d[qu([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 53, 23, 11, 5, 15, 20, 22, 19, 18])] = t1(p);

        config.headers = {
          ...d,
          ...config.headers,
        };
      }
      // 返回更新后的配置
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 请求地址
      const requestPath: string = response.config.url ?? '';

      // 响应
      const { data } = response as unknown as ResponseStructure;
      if (!data) {
        throw new Error('服务异常');
      }

      // 错误码处理
      const code: number = data.code;
      // 未登录，且不为获取用户登录信息接口
      if (
        code === 40100 &&
        !requestPath.includes('user/get/login') &&
        !location.pathname.includes('/user/login')
      ) {
        // 跳转至登录页
        window.location.href = `/#/user/login?redirect=${encodeURIComponent(window.location.href)}`;
        throw new Error('请先登录');
      }

      if (code !== 0) {
        throw new Error(data.message ?? '服务器错误');
      }
      return response;
    },
  ],
};
