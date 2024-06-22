export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      {
        name: '用户管理',
        icon: 'smile',
        path: '/admin/userManagement',
        component: './Admin/UserManagement',
      },
      {
        name: '接口信息管理',
        icon: 'smile',
        path: '/admin/InterfaceInfoManagement',
        component: './Admin/InterfaceInfoManagement',
      },
      {
        name: '接口信息分析',
        icon: 'smile',
        path: '/admin/InterfaceAnalysis',
        component: './Admin/InterfaceAnalysis',
      },
      { path: '/admin/sub-page', redirect: '/welcome' },
    ],
  },
  {
    path: '/interface',
    name: '接口开放平台页',
    icon: 'crown',
    routes: [
      {
        name: '在线接口开放',
        icon: 'BulbOutlined',
        path: '/interface/InterfaceInfoAssign',
        component: './interface/InterfaceInfo',
      },
      {
        name: '接口详细信息',
        icon: 'BulbOutlined',
        path: '/interface/interface_detial/:id',
        component: './interface/interfaceDetial',
        hideInMenu: true,
      },
    ],
  },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { name: '个人博客', icon: 'table', path: '/note', component: './note/' },

  { path: '/', redirect: '/welcome' },

  { path: '*', layout: false, component: './404' },
];
