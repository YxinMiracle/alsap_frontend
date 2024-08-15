import { getInitialState } from '@/app';
import { userLogoutUsingPost } from '@/services/backend/userController';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Space, Switch } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'umi';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPost();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const { currentUser } = initialState || {};

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

  const switchTag = (
    <Switch checkedChildren="🌞" unCheckedChildren="🌜" onClick={switchDarkMode}></Switch>
  );

  if (!currentUser) {
    return (
      <Space>
        {switchTag}
        <Link to="/user/login">
          <Button type="primary" shape="round">
            登录
          </Button>
        </Link>
      </Space>
    );
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Space>
      {switchTag}
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        <Space>
          {currentUser?.userAvatar ? (
            <Avatar size="small" src={currentUser?.userAvatar} />
          ) : (
            <Avatar size="small" icon={<UserOutlined />} />
          )}
          <span className="anticon">{currentUser?.userName ?? '无名'}</span>
        </Space>
      </HeaderDropdown>
    </Space>
  );
};

export const AvatarName = () => {};
