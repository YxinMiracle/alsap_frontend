<div align="center">
    <img height="160" src="https://pec-1300659502.cos.ap-guangzhou.myqcloud.com/logo.svg" />
    <h1>YxinMiracle前端模板</h1>
    <h3>一个属于后端工程师的前端极简模板。</h3>
    基于 React + Ant Design 的项目初始模板，整合了常用框架和主流业务的示例代码。

</div>

> \[!IMPORTANT]
>
> 作者：[YxinMIiracle](https://github.com/YxinMiracle)
> 仅分享于 [GitHub](https://github.com/YxinMiracle)
> 本项目基于[AntDesignPro-Preview-React](https://preview.pro.ant.design/dashboard/analysis)进行二次开发，无任何商业用途！！



[TOC]

## ✈ 版本要求 & 特性

> [!NOTE]
>
> 最好严格根据版本要求进行使用

+ node >= 16
+ npm >= 7.20.6



## 📦 安装教程

1. 将代码拉取到本地

```shell
git clone https://github.com/YxinMiracle/yxinmiralce-antd-frontend-init.git
```

2. 安装相关依赖

```shell
npm install
```

3. 运行

```shell
npm run start:dev
```



## 🛰 相关特性

#### 1. 权限控制

通过`config/routes.ts`路由中***access***的属性，来判断该试图是否可被这个用户所访问

```typescript
export default [
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
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
   ...
];
```

#### 2. 权限赋予

在项目中`src/access.ts`的文件中，设置页面力度的权限设置

```typescript
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser, // routes.ts路由中要是配置了canUser，那么就执行这个逻辑
    canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
```

全局初始化对象`initialState`中的`currentUser`会在登录中所赋予，在注销中被消除，登录赋予逻辑在`src/pages/User/Login/index.tsx`中所赋予

```typescript
const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });

      // 保存已登录用户信息
      setInitialState({
        ...initialState,
        currentUser: res.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {

    }
  };
```

在`src/compoents/RightContent/AvatarDropdown.tsx`的登出逻辑被消除

```typescript
flushSync(() => {
  setInitialState((s) => ({ ...s, currentUser: undefined }));
});
loginOut();
```

#### 3. OpenAPI配置

在`config/config.ts`中的OpenAPI配置更改自己的接口文档配置

```ts
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'http://localhost:8360/api/v2/api-docs',
      projectName: 'backend',
    },
  ],
```

#### 4. 动态主题变化

官方Preview项目中并直接编写相关功能，作者根据Preview项目中的`SettingDrawer`逻辑进行二次开发

在`src/compoents/RightContent/AvatarDropdown.tsx`中编写主题变化逻辑

构建开关

```react
const switchTag = (
    <Switch
      checkedChildren="🌞"
      unCheckedChildren="🌜"
      onClick={switchDarkMode}
      defaultChecked
    ></Switch>
  );
```

设定开关逻辑

```react
const switchDarkMode = async (checked: boolean) => {
    const { settings, currentUser } = await getInitialState();
    setInitialState(() => ({
      settings: {
        ...settings,
        navTheme: checked ? 'realDark' : 'light',
      },
      currentUser: currentUser,
    }));
  };
```

效果：

![](https://gitee.com/yxinmiracle/pic/raw/master/imgv3.0/homt.gif)

#### 5. 全局配置悬浮

在文件`app.tsx`中开启，可动态调整页面布局

```react
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
```

![](https://pec-1300659502.cos.ap-guangzhou.myqcloud.com/github/GIF.gif)



## 🚄 更改项目名字

作为喜欢从零到一的专业开发者，项目名字绝对是要自己起的，但是怎么去改呢？

git下来项目之后，先不打开项目，根据下面步骤执行

- 第一步：先把`yxinmiralce-antd-frontend-init`替换成自己的项目名字。
- 第二步：打开项目全局搜索`shift`+`f6`把`yxinmiralce-antd-frontend-init`全部替换成项目名字。
- 第三步：把文件夹下的.idea文件删除，重新打开ide即可获得自己的全新项目。



## 🛣️ 相关文档

- **[ProComponents](https://github.com/ant-design/pro-components)**  - ProCompnents GitHub

- **[AntDesignPro-Preview-Vue](https://preview.pro.antdv.com/dashboard/analysis)** - AntDesignPro-Vue3+Ts版本Preview
- **[AntDesignPro-Preview-React](https://preview.pro.ant.design/dashboard/analysis)** - AntDesignPro-React版本Preview
- **[AntDesign](https://ant.design/components/overview-cn/)** - AntDesign组件文档
