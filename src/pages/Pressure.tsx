import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const PressurePage: React.FC = () => (
  <Result
    status="404"
    title="503"
    subTitle="请勿对系统进行暴力请求，如再有类似情况发现将会加入黑名单"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回
      </Button>
    }
  />
);

export default PressurePage;
