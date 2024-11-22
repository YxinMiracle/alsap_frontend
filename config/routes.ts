export default [
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
    component: './Home',
  },
  {
    path: '/cti',
    icon: 'crown',
    name: '威胁情报',
    routes: [
      { path: '/cti', redirect: '/cti/show' },
      {
        path: '/cti/show',
        component: './Cti/CtiShow',
        name: '威胁情报管理',
      },
      { path: '/cti/item/show', component: './Cti/ItemShow', name: '实体类型管理' },
      { path: '/cti/relation/show', component: './Cti/RelationShow', name: '实体关系管理' },
    ],
  },
  {
    name: "威胁情报管理",
    path: '/cti/show',  // 注意这里的路径调整
    routes: [
      {
        path: '/cti/show/graph/:id',
        component: './Cti/Graph',
        name: '威胁情报图谱',
        hideInMenu: true,
      },
      {
        path: '/cti/show/anno/:id',
        component: './Cti/Annotation',
        name: '威胁情报标注',
        hideInMenu: true,
      },
      {
        path: '/cti/show/detail/:id',
        component: './Cti/Detail',
        name: '威胁情报内容',
        hideInMenu: true,
      },
    ],
    parentKeys: ['/cti'],  // 父级属性
    hideInMenu: true,
  },
  {
    path: '/chat',
    icon: 'AppstoreAddOutlined',
    name: '大模型',
    routes: [
      // { path: '/chat', redirect: '/cti/show' },
      { path: '/chat/show', component: './Chat', name: '大模型Demo' },
      { path: '/chat/llm', component: './Chat/LlmChat', name: '大模型对话' },
      // { path: '/cti/anno', component: './Cti/Annotation', name: '威胁情报标注' },
    ],
  },
  {
    path: '/admin',
    icon: 'SettingOutlined',
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
