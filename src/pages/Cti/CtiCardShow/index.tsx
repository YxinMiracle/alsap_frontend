import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';
import '@/pages/Cti/CtiCardShow/style/ctiCardPageStyle.css';
import { getCtiByPageSentinelUsingPost } from '@/services/backend/ctiController';
import { history } from '@@/core/history';
import {
  BulbTwoTone,
  ContainerTwoTone,
  HighlightTwoTone,
  InsuranceTwoTone,
  PictureTwoTone,
  ShareAltOutlined, TagOutlined, ToolTwoTone,
  ZoomInOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import {
  Card,
  Col,
  FloatButton,
  Image,
  List,
  message,
  Modal,
  QRCode,
  Row,
  Tag,
  Tooltip,
  TooltipProps,
  Typography,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import PageFloatButton from "@/components/FloatButtonComponent";

const { Paragraph } = Typography;
/**
 * Cti卡片展示页面
 * @constructor
 */
const CtiCardPage: React.FC = () => {
  const [ctiVoList, setCtiVoList] = useState<API.CtiVo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isDev = process.env.NODE_ENV === 'development';
  const BASE_URL = isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD;
  const initSearchParams = {
    current: 1,
    pageSize: 10,
    sortField: 'updateTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState({ ...initSearchParams });
  const [total, setTotal] = useState<number>(1000);
  const [modalOpen, setModalOpen] = useState(false);
  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    return {
      pointAtCenter: true,
    };
  }, []);
  const [copyCtiLink, setCopyCtiLink] = useState<string>('');

  const initCtiData = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const res = await getCtiByPageSentinelUsingPost({
        ...searchParams,
      } as API.CtiQueryRequest);

      if (res.code !== 0) {
        message.error(res.message ?? '情报数据请求失败');
      }

      //@ts-ignore
      setCtiVoList(res.data?.records || []);
      //@ts-ignore
      setTotal(res.data.total);
      setLoading(false);
    } catch (e: any) {
      message.error(e.message ?? '接口出现错误');
    }
  };

  useEffect(() => {
    initCtiData();
  }, [searchParams]);

  const formatDuration = (val: number) => {
    if (val < 60) {
      return val + ' 分钟';
    } else if (val < 3600) {
      // @ts-ignore
      return moment.duration(val, 'seconds').format('m:ss', { trim: false }) + ' 小时';
    } else {
      // @ts-ignore
      return moment.duration(val, 'seconds').format('HH:mm:ss', { trim: false }) + ' 天';
    }
  };

  const toDetailPage = (ctiId: any) => {
    history.push(`/cti/show/detail/${ctiId}`);
  };

  const shareCtiArticle = (ctiId: any) => {
    const href = BASE_URL + '/cti/show/detail/' + ctiId;
    setCopyCtiLink(href);
    setModalOpen(true);
    // alert(href);
  };

  return (
    <div className="cti-card-show-page">
      <Row>
        <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
          <PageContainer>
            <Modal
              title="分享威胁情报"
              centered
              open={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
              footer={null}
            >
              <div>
                页面地址：
                <br /> <Paragraph copyable>{copyCtiLink}</Paragraph>
                <div>
                  在微信中打开：
                  <QRCode errorLevel="H" value={copyCtiLink} icon="/alsap_logo.svg" />
                </div>
                <div>

                </div>
              </div>
            </Modal>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} xl={{ span: 6 }}></Col>
            </Row>
            <List
              loading={loading}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 4,
                xxl: 5,
              }}
              dataSource={ctiVoList}
              pagination={{
                onChange: (page) => {
                  setSearchParams({
                    ...searchParams,
                    current: page,
                  });
                },
                pageSize: searchParams.pageSize,
                current: searchParams.current,
                total: total,
              }}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable={true}
                    style={{ marginBottom: 16 }}
                    cover={
                      <Image
                        src={
                          item.postUrl ??
                          'https://storage.googleapis.com/gweb-cloudblog-publish/images/threat-intelligence-default-banner-simplifie.max-700x700.png'
                        }
                      />
                    }
                    actions={[
                      // @ts-ignore
                      <div key="check" onClick={() => toDetailPage(item.id)}>
                        <ZoomInOutlined /> 查看情报
                      </div>,
                      <div key="share" onClick={() => shareCtiArticle(item.id)}>
                        <ShareAltOutlined /> 分享情报
                      </div>,
                    ]}
                  >
                    <Meta
                      title={
                        // 设置标题
                        // @ts-ignore
                        item.title.length! > 28 ? (
                          <Tooltip
                            placement="top"
                            color="blue"
                            title={item.title}
                            arrow={mergedArrow}
                          >
                            <span>{item.title?.substring(0, 28) + '...'}</span>
                          </Tooltip>
                        ) : (
                          <span>{item.title}</span>
                        )
                      }
                      description={
                        <>
                          <div
                            className="cti-description-parent"
                            onClick={() => toDetailPage(item.id)}
                          >
                            <div className="margin-top-8">
                              <ContainerTwoTone/> 情报名称：{item.title}
                            </div>
                            <div className="margin-top-8">
                              <BulbTwoTone/> 预计阅读时间：
                              {formatDuration(Math.floor(item.ctiCharCount! / 300))}
                            </div>
                            <div className="margin-top-8">
                              <PictureTwoTone/> 图谱情况：
                              {item.hasGraph! >= 1 ? (
                                <Tag color="green">已有图谱</Tag>
                              ) : (
                                <Tag color="geekblue">暂无图谱</Tag>
                              )}
                            </div>
                            <div className="margin-top-8">
                              <InsuranceTwoTone/> 规则情况：
                              {item.hasRule! >= 1 ? (
                                <Tag color="green">已有规则</Tag>
                              ) : (
                                <Tag color="geekblue">暂无规则</Tag>
                              )}
                            </div>
                            <div className="margin-top-8">
                              <ToolTwoTone /> 技战术情况：{' '}
                              {item.hasTtp! >= 1 ? (
                                <Tag color="green">已有技战术</Tag>
                              ) : (
                                <Tag color="geekblue">暂无技战术</Tag>
                              )}
                            </div>
                            <div className="margin-top-8">
                              <HighlightTwoTone/> 创建时间：
                              {moment(item.updateTime).format('YYYY-MM-DD')}
                            </div>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
            <PageFloatButton/>
          </PageContainer>
        </Col>
      </Row>
    </div>
  );
};
export default CtiCardPage;
