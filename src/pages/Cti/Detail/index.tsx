import { useParams } from '@@/exports';
import {
  AndroidOutlined,
  AppleOutlined,
  CodeSandboxOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  GoldOutlined
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import {Col, message, Row, Tabs, Tooltip, TooltipProps} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import '@/pages/Cti/Detail/style/detailPageStyle.css'
import {getDetailCtiUsingPost} from "@/services/backend/ctiController";

const CtiGraphInformationPage: React.FC = () => {
  const { id } = useParams();

  const [ctiVo, setCtiVo] = useState<API.CtiVo>({});

  /**
   * 初始化界面获取数据
   */
  const loadData = async () => {
    if (!id) {
      message.error('请勿非法访问该界面');
      return;
    }
    try {
      // @ts-ignore
      const res = await getDetailCtiUsingPost({ id });
      if (res.code === 0) {
        // @ts-ignore
        setCtiVo(res.data)
      }
    } catch (error: any) {
      message.error('加载CTI数据失败' + error.message);
    }
  };

  useEffect(() => {
    loadData()
  }, []);

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    return {
      pointAtCenter: true,
    };
  }, []);

  const tabItemsList = [
    {
      key: "information",
      label: `概况`,
      children: `概况 ${id}`,
      icon: <FileProtectOutlined />,
    },
    {
      key: "knowledge",
      label: `知识`,
      children: `知识 ${id}`,
      icon: <GoldOutlined />,
    },
    {
      key: "content",
      label: `内容`,
      children: `内容 ${id}`,
      icon: <FileTextOutlined />,
    },
    {
      key: "entity",
      label: `实体`,
      children: `实体 ${id}`,
      icon: <CodeSandboxOutlined />,
    }
  ]

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer
          title={
            ctiVo.title?.length > 62 ? (
              <Tooltip placement="top" color="blue" title={ctiVo.title} arrow={mergedArrow}>
                <span style={{ fontSize: '2rem' }}>{ctiVo.title?.substring(0, 62) + '...'}</span>
              </Tooltip>
            ) : (
              <span style={{ fontSize: '2rem' }}>{ctiVo.title}</span>
            )
          }
        >
          <div className="detail-page">
            <div className="detail-page-top-tabs">
              <Tabs defaultActiveKey="information" items={tabItemsList} />
            </div>
          </div>
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiGraphInformationPage;
