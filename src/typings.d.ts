declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module 'mockjs';
declare module 'react-fittext';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

/**
 * 分页信息
 */
interface PageInfo<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

/**
 * 分页请求
 */
interface PageRequest {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
}

/**
 * 删除请求
 */
interface DeleteRequest {
  id: number;
}

/**
 * 返回封装
 */
interface BaseResponse<T> {
  code: number;
  data: T;
  message?: string;
}

/**
 * 全局初始化状态
 */
interface InitialState {
  currentUser?: API.LoginUserVO;
  settings?: Partial<LayoutSettings>;
}
