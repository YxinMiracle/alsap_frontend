import CtiGraph from '@/components/GraphComponent/CtiGraph';
import { getGraphDataByCtiIdUsingPost } from '@/services/backend/graphController';
import GraphUtils from '@/utils/graphUtil';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import {Card, Col, message, Row} from 'antd';
import React, { useEffect, useState } from 'react';

const CtiGraphInformationPage: React.FC = () => {
  const { id } = useParams();

  const { listLoop } = GraphUtils();
  const [graphMap, setGraphMap] = useState({ nodes: [], edges: [] });

  const initData = async () => {
    try {
      const res = await getGraphDataByCtiIdUsingPost({
        id: id,
      });
      if (res.code === 0) {
        message.success('图谱数据获取成功');
        setGraphMap(listLoop(res.data));
      }
    } catch (e: any) {
      message.error('获取图谱数据失败');
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer>
          <Card>
            {graphMap && <CtiGraph graphData={graphMap} />}
          </Card>
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiGraphInformationPage;
