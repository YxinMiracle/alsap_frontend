import ImageLoader from '@/components/Image';
import HistoryBox from '@/pages/Home/components/history';
import HotBox from '@/pages/Home/components/hot';
import { pageStyles } from '@/pages/Home/style/homeStyle';
import {
  getHomeCtiTotalCountUsingGet,
  getHomeScoItemsCountUsingGet,
  getHomeSdoItemsCountUsingGet,
} from '@/services/backend/homeController';
import { useModel } from '@@/exports';
import {
  ArrowUpOutlined,
  ContainerTwoTone,
  SecurityScanTwoTone,
  ToolTwoTone,
} from '@ant-design/icons';
import {
  Card,
  Carousel,
  Col,
  Divider,
  FloatButton,
  message,
  Row,
  Statistic,
  StatisticProps,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect } from 'react';
import CountUp from 'react-countup';

const { Title } = Typography;

// https://shs3.b.qianxin.com:443/ti_portal_upload_s3/1703471334_VDC

interface SdoData {
  sdoList: API.ItemHomeVo[];
  sdoCount: number;
}

interface ScoData {
  scoList: API.ItemHomeVo[];
  scoCount: number;
}

const Welcome: React.FC = () => {
  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [tabIndex, setTabIndex] = React.useState<string>('1');
  const [ctiCount, setCtiCount] = React.useState<number>(0);
  const [loadingCtiCount, setLoadingCtiCount] = React.useState<boolean>(false);
  const [sdoData, setSdoData] = React.useState<SdoData>({ sdoList: [], sdoCount: 0 });
  const [sdoDataLoading, setSdoDataLoading] = React.useState<boolean>(false);
  const [scoData, setScoData] = React.useState<ScoData>({ scoList: [], scoCount: 0 });
  const [scoDataLoading, setScoDataLoading] = React.useState<boolean>(false);

  enum TagEnum {
    CTI_SEARCH = '威胁情报',
    CTI_YANPAN = '威胁研判',
  }

  // 监听tag改变事件
  const tagOnChange = (key: string) => {
    console.log(key);
  };

  // 获取搜索框
  const getSearchTag = (value: string) => (
    <Search
      placeholder={value}
      allowClear
      enterButton="搜索"
      size="large"
      onFocus={(e) => {
        setInputFocus(true);
      }}
      onBlur={(e) => {
        setInputFocus(false);
      }}
      onSearch={(value: string) => {
        console.log(value);
      }}
    />
  );

  useEffect(() => {
    // 创建 style 元素并设置其内容
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = pageStyles;
    document.head.appendChild(styleSheet);

    // 组件卸载时移除 style 元素
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const CarouselStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // 如果你也想垂直居中可以添加这个
    height: '100%', // 确保容器有足够的高度
    width: '100%', // 和宽度
    margin: '0 auto',
  };

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  const onItemClick = () => {
    setInputFocus(false);
  };

  const { initialState } = useModel('@@initialState');

  const hotArr = [
    '172.104.120.244',
    '95.164.33.227',
    '104.234.10.26',
    ' 154.213.186.220',
    'xred.mooo.com',
    'pz.11115yur.com',
    'hot.tenchier.com',
    '28bb5f8d.u.fn03.vip',
    '226a32a52c5ddc76bb8785ae1cea0c81',
    '14e504e4c3e12375423b64c6f9269b01',
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '历史记录',
      children: <HistoryBox onItemClick={onItemClick} />,
    },
    {
      key: '2',
      label: '热点IOC',
      children: <HotBox onItemClick={onItemClick} hotList={hotArr} />,
    },
  ];

  const onTabChange = (key: string) => {
    setTabIndex(key);
  };

  const initScoData = async () => {
    setScoDataLoading(true);
    try {
      const res = await getHomeScoItemsCountUsingGet();
      if (res.code === 0) {
        setScoData({
          scoList: res.data?.scoItemHomeVos as API.ItemHomeVo[],
          scoCount: res.data?.scoCount as number,
        });
      }
    } catch (e: any) {
      message.error('请求Sco总数失败');
    }
    setScoDataLoading(false);
  };

  // 获取home页面sdo相关数据
  const initSdoData = async () => {
    setSdoDataLoading(true);
    try {
      const res = await getHomeSdoItemsCountUsingGet();
      if (res.code === 0) {
        setSdoData({
          sdoList: res.data?.sdoItemHomeVos as API.ItemHomeVo[],
          sdoCount: res.data?.sdoCount as number,
        });
      }
    } catch (e: any) {
      message.error('请求Sdo总数失败');
    }
    setSdoDataLoading(false);
  };

  // 获取home页面cti情报在系统中的个数
  const initCtiData = async () => {
    setLoadingCtiCount(true);
    try {
      const res = await getHomeCtiTotalCountUsingGet();
      if (res.code === 0) {
        setCtiCount(res.data?.ctiCount as number);
      }
    } catch (e: any) {
      message.error('请求CTI总数失败');
    }
    setLoadingCtiCount(false);
  };

  useEffect(() => {
    // 请求CTI相关数据
    initCtiData();
    // 请求Sdo相关数据
    initSdoData();
    // 请求Sco相关数据
    initScoData();
  }, []);

  return (
    <div className="home-root">
      <Row>
        <Col xs={24} sm={24} lg={{ span: 18, offset: 3 }}>
          <div className="banner-container">
            <div className="home-title">
              <Title level={1} className="custom-title">
                ALSAP
              </Title>
              <Title level={2}>|</Title>
              <Title level={2}>威胁分析平台</Title>
            </div>
            <div>
              <Row gutter={16} align="middle">
                <Col xs={24} sm={24} lg={{ span: 16 }}>
                  <div className="search-left">
                    <Tabs
                      onChange={tagOnChange}
                      type="card"
                      items={[
                        {
                          label: TagEnum.CTI_SEARCH,
                          key: TagEnum.CTI_SEARCH,
                          children: getSearchTag('请输入关键词或CVE/CNVD/CNNVD编号进行搜索'),
                        },
                        {
                          label: TagEnum.CTI_YANPAN,
                          key: TagEnum.CTI_YANPAN,
                          children: getSearchTag('请输入域名、IP、邮箱、文件HASH(MD5/SHA1/SHA256)'),
                        },
                      ]}
                    />
                    {inputFocus && (
                      <Card className="tabs-content" style={{ marginTop: 8, zIndex: 2 }}>
                        <Tabs
                          onMouseDown={(e) => {
                            e.preventDefault(); // 阻止事件的默认行为，避免输入框失去焦点
                            // e.stopPropagation(); // 阻止事件冒泡到更上层的 DOM 元素
                          }}
                          defaultActiveKey={tabIndex}
                          items={items}
                          onChange={onTabChange}
                        />
                      </Card>
                    )}
                  </div>
                </Col>
                <Col xs={0} sm={0} lg={{ span: 8 }}>
                  <Carousel
                    arrows
                    infinite
                    autoplay
                    fade
                    draggable
                    autoplaySpeed={3500}
                    style={{ transform: 'scale(0.8)' }}
                  >
                    <div>
                      <ImageLoader
                        src="https://shs3.b.qianxin.com/ti_portal_upload_s3/1672307736_V52"
                        alt=""
                        style={CarouselStyle}
                      />
                    </div>
                    <div>
                      <ImageLoader
                        src="https://shs3.b.qianxin.com:443/ti_portal_upload_s3/1703471334_VDC"
                        alt=""
                        style={CarouselStyle}
                      />
                    </div>
                  </Carousel>
                </Col>
              </Row>
            </div>
          </div>

          <Divider style={{ borderWidth: '2px' }} />

          <div className="static-cart">
            <div style={{ display: 'flex', marginBottom: 16 }}>
              <div
                style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 38, fontWeight: 900 }}
              >
                系统信息
              </div>
            </div>

            {/*信息卡*/}
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={12} lg={{ span: 8 }}>
                  <Card className="static-card" bordered={false}>
                    <Row>
                      <Col span={18}>
                        <Statistic
                          title="报告总数"
                          value={ctiCount}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="篇"
                          formatter={formatter}
                          loading={loadingCtiCount}
                        />
                      </Col>
                      <Col span={6}>
                        <div className="static-card-icon">
                          <ContainerTwoTone />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={{ span: 8 }}>
                  <Card className="static-card" bordered={false}>
                    <Row>
                      <Col span={18}>
                        <Statistic
                          title="域对象总数（SDO）"
                          value={sdoData.sdoCount}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="个"
                          formatter={formatter}
                          loading={sdoDataLoading}
                        />
                      </Col>
                      <Col span={6}>
                        <div className="static-card-icon">
                          <SecurityScanTwoTone />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} sm={24} lg={{ span: 8 }}>
                  <Card className="static-card" bordered={false}>
                    <Row>
                      <Col span={18}>
                        <Statistic
                          title="可观测对象（SCO）"
                          value={scoData.scoCount}
                          precision={1}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="个"
                          formatter={formatter}
                          loading={scoDataLoading}
                        />
                      </Col>
                      <Col span={6}>
                        <div className="static-card-icon">
                          <ToolTwoTone />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>

            <Divider style={{ borderWidth: '2px' }} />

            {/*实体信息*/}
            <div>
              <div style={{ display: 'flex', marginBottom: 16, flexDirection: 'column' }}>
                <div
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: 38,
                    fontWeight: 900,
                    marginBottom: 19,
                  }}
                >
                  实体信息
                </div>
                <div style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 16 }}>
                  系统自动抽取非结构化威胁情报中的实体，并根据STIX 2.1标准使用自然语言处理技术分析实体分布的结果
                </div>
              </div>
              <Row gutter={16}>
                {/*xs={24} sm={16} lg={{ span: 16 }}*/}
                <Col span={16} className="entity-col">
                  <Card className="entity-card">
                    <div className="entity-item-parent">
                      {sdoData.sdoList &&
                        sdoData.sdoList.map((item: API.ItemHomeVo, index: number) => (
                          <div className="entity-item">
                            <Statistic
                              title={item.itemName}
                              value={item.itemDbCount}
                              suffix="个"
                              loading={sdoDataLoading}
                            />
                          </div>
                        ))}
                    </div>
                  </Card>
                </Col>

                {/*xs={24} sm={8} lg={{ span: 8 }}*/}
                <Col span={8} className="entity-col">
                  <Card className="entity-card">
                    <div className="entity-item-parent">
                      {scoData.scoList &&
                        scoData.scoList.map((item: API.ItemHomeVo, index: number) => (
                          <div className="entity-item">
                            <Statistic title={item.itemName} value={item.itemDbCount} suffix="个" />
                          </div>
                        ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <FloatButton.BackTop />
      </Row>
    </div>
  );
};

export default Welcome;
