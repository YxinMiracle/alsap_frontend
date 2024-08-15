import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'YxnMiracle';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'backend',
          title: '后端必胜',
          href: 'https://github.com/YxinMiracle/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> YxinMiracle前端万用模板
            </>
          ),
          href: 'https://github.com/YxinMiracle/yxinmiralce-antd-frontend-init',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
