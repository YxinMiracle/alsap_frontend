import CtiDetailDefencePage from '@/pages/Cti/Detail/components/Defense';
import CtiDetailInformationPage from '@/pages/Cti/Detail/components/Information';
import CtiDetailKnowledgePage from '@/pages/Cti/Detail/components/knowledge';
import CtiDetailTtpPage from '@/pages/Cti/Detail/components/ttps';
import '@/pages/Cti/Detail/style/detailPageStyle.css';
import { getDetailCtiUsingPost } from '@/services/backend/ctiController';
import { useParams } from '@@/exports';
import {
  CodeSandboxOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  GoldOutlined,
  RadarChartOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Col, FloatButton, message, Row, Tabs, Tooltip, TooltipProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CtiDetailPage: React.FC = () => {
  const { id } = useParams();
  const [ctiVo, setCtiVo] = useState<API.CtiVo>({});
  const navigate = useNavigate();
  const location = useLocation();

  // 获取当前 URL 中的 tab 参数
  const currentTab = new URLSearchParams(location.search).get('tab') || 'information';

  // 处理 tab 切换，更新 URL 参数
  const onTabChange = (key:string) => {
    navigate(`${location.pathname}?tab=${key}`);
  };

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
        setCtiVo(res.data);
      }
    } catch (error: any) {
      // message.error('加载CTI数据失败' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    return {
      pointAtCenter: true,
    };
  }, []);

  const tabItemsList = [
    {
      key: 'information',
      label: `概况`,
      // @ts-ignore
      children: <CtiDetailInformationPage id={id} />,
      icon: <FileProtectOutlined />,
    },
    {
      key: 'knowledge',
      label: `知识`,
      // @ts-ignore
      children: <CtiDetailKnowledgePage id={id} />,
      icon: <GoldOutlined />,
    },
    {
      key: 'content',
      label: `内容`,
      children: `内容 ${id}`,
      icon: <FileTextOutlined />,
    },
    {
      key: 'entity',
      label: `实体`,
      children: `实体 ${id}`,
      icon: <CodeSandboxOutlined />,
    },
    {
      key: 'ttps',
      label: `情报技战术`,
      // @ts-ignore
      children: <CtiDetailTtpPage id={id} />,
      icon: <ZoomInOutlined />,
    },
    {
      key: 'defense',
      label: `防御库`,
      // @ts-ignore
      children: <CtiDetailDefencePage id={id} />,
      icon: <RadarChartOutlined />,
    },
  ];

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer
          title={
            // @ts-ignore
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
              <Tabs
                activeKey={currentTab}
                onChange={onTabChange}
                items={tabItemsList}
              />
            </div>
          </div>
          <FloatButton.BackTop />
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiDetailPage;
