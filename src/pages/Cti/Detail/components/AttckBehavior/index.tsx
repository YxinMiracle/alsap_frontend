import '@/pages/Cti/Detail/style/detailPageStyle.css';
import { getTtpConfigByCtiIdUsingPost } from '@/services/backend/ttpController';
import '@umijs/max';
// @ts-ignore
import React, { useEffect, useState } from 'react';
import {Card} from "antd";
import TtpGraph from "@/components/GraphComponent/TtpGraph";

interface Props {
  id: number;
}

const CtiDetailBehaviorPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const [ttpConfigUrlPath, setTtpConfigUrlPath] = React.useState<string>();
  const [loading, setLoading] = useState(false);
  const [haveData, setHaveData] = useState(false);

  const loadData = async () => {
    try {
      const res = await getTtpConfigByCtiIdUsingPost({
        ctiId: id,
      });
      if (res.code === 0) {
        setHaveData(true);
        setTtpConfigUrlPath(res.data);
      } else {
        setHaveData(false);
        // message.error('该情报暂无TTP数据');
      }
    } catch (e: any) {
      // message.error('该情报暂无TTP数据 ', e.message);
    }
  };

  useEffect(() => {
    if (id !== null) {
      loadData();
    }
  }, [id]);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="detail-page-behavior">
      <div className="attack-behavior-cycle">
        <Card loading={loading}>
          <TtpGraph></TtpGraph>
        </Card>
      </div>
    </div>
  );
};
export default CtiDetailBehaviorPage;
