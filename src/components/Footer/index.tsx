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
          title: 'YxinMiracle',
          href: 'https://github.com/YxinMiracle/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> GitHub
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
