﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', layout: false, icon: 'smile', component: './Welcome', name: '欢迎页' },
  {
    path: '/information',
    icon: 'PieChartOutlined',
    name: '平台信息',
    routes: [
      { path: '/information', redirect: '/information/show' },
      { path: '/information/show', component: './Home', name: '平台信息展示' },
    ],
  },
  {
    path: '/cti',
    icon: 'crown',
    name: '威胁情报',
    routes: [
      { path: '/cti', redirect: '/cti/show' },
      { path: '/cti/show', component: './Cti', name: '威胁情报管理' },
      { path: '/cti/anno', component: './Cti/Annotation', name: '威胁情报标注' },
    ],
  },
  {
    path: '/chat',
    icon: 'crown',
    name: '大模型',
    routes: [
      // { path: '/chat', redirect: '/cti/show' },
      { path: '/chat', component: './Chat', name: '大模型Demo' },
      // { path: '/cti/anno', component: './Cti/Annotation', name: '威胁情报标注' },
    ],
  },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
