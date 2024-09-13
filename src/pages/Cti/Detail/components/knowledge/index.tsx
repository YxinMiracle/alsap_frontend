import CtiGraph from '@/components/GraphComponent/CtiGraph';
import '@/pages/Cti/Detail/style/detailPageStyle.css';
import { getGraphDataByCtiIdUsingPost } from '@/services/backend/graphController';
import GraphUtils from '@/utils/graphUtil';
import { useParams } from '@@/exports';
import '@umijs/max';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
  id: number
}

const CtiDetailKnowledgePage: React.FC<Props> = (props: Props) => {
  const { id } = props;

  const [loading, setLoading] = useState<boolean>(false);
  // 处理三元组数据
  const { listLoop } = GraphUtils();
  // 处理页面loading逻辑

  const [graphMap, setGraphMap] = useState({ nodes: [], edges: [] });

  const initData = async () => {
    setLoading(true);
    try {
      const res = await getGraphDataByCtiIdUsingPost({
        // @ts-ignore
        id: id,
      });
      if (res.code === 0) {
        message.success('图谱数据获取成功');
        setGraphMap(listLoop(res.data));
      }
    } catch (e: any) {
      message.error('获取图谱数据失败');
    }
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="detail-page-knowledge">
      <Card hoverable loading={loading}>{graphMap && <CtiGraph graphData={graphMap} />}</Card>
    </div>
  );
};
export default CtiDetailKnowledgePage;
