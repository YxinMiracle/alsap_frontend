import { COS_HOST } from '@/constants';
import '@/pages/Cti/Detail/style/detailPageStyle.css';
import {
  downloadTtpConfigByIdUsingGet,
  getTtpConfigByCtiIdUsingPost,
} from '@/services/backend/ttpController';
import { DownloadOutlined } from '@ant-design/icons';
import '@umijs/max';
import { Button, Card, message } from 'antd';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

interface Props {
  id: number;
}

const CtiDetailTtpPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const [ttpConfigUrlPath, setTtpConfigUrlPath] = React.useState<string>();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await getTtpConfigByCtiIdUsingPost({
        ctiId: id,
      });
      if (res.code === 0) {
        setTtpConfigUrlPath(res.data);
      } else {
        message.error('请求情报TTP数据出错');
      }
    } catch (e: any) {
      message.error('请求情报TTP数据出错: ', e.message);
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
      <iframe
        src={`https://mitre-attack.github.io/attack-navigator/#layerURL=${COS_HOST + ttpConfigUrlPath}`}
        width="100%"
        height="1700px"
        onLoad={handleLoad}
      ></iframe>
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
      <div>{id}</div>
    </div>
  );
};
export default CtiDetailTtpPage;
