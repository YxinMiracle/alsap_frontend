import { COS_HOST } from '@/constants';
import '@/pages/Cti/Detail/style/detailPageStyle.css';
import {
  downloadTtpConfigByIdUsingGet,
  getTtpConfigByCtiIdUsingPost,
} from '@/services/backend/ttpController';
import { DownloadOutlined } from '@ant-design/icons';
import '@umijs/max';
import { Button, Card, Empty, message } from 'antd';
// @ts-ignore
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

interface Props {
  id: number;
}

const CtiDetailTtpPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const [ttpConfigUrlPath, setTtpConfigUrlPath] = React.useState<string>();
  const [loading, setLoading] = useState(true);
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
    <div className="detail-page-ttp">
      {loading ?? <Card loading={true} hoverable></Card>}
      {haveData ? (
        <iframe
          src={`https://mitre-attack.github.io/attack-navigator/#layerURL=${COS_HOST + ttpConfigUrlPath}`}
          width="100%"
          height="1700px"
          onLoad={handleLoad}
        ></iframe>
      ) : (
        <Card>
          <Empty></Empty>
        </Card>
      )}
      {!loading && ttpConfigUrlPath && (
        <Button
          className="ttp-config-download"
          type="primary"
          icon={<DownloadOutlined />}
          size="large"
          onClick={async () => {
            const blob = await downloadTtpConfigByIdUsingGet(
              // @ts-ignore
              { id },
              {
                responseType: 'blob',
              },
            );
            const fullPath = COS_HOST + ttpConfigUrlPath;
            saveAs(blob, fullPath.substring(fullPath.lastIndexOf('/') + 1));
          }}
        >
          下载ATT&CK TTPs配置文件
        </Button>
      )}
    </div>
  );
};
export default CtiDetailTtpPage;
