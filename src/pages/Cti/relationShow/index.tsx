import {PageContainer} from '@ant-design/pro-components';
import '@umijs/max';
import {Col, FloatButton, Row,} from 'antd';
import React from 'react';

/**
 * STIX实体信息管理界面
 * @constructor
 */
const CtiItemInformationPage: React.FC = () => {

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer>
          <div>xxx</div>
          <FloatButton.BackTop />
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiItemInformationPage;
