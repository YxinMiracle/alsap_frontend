import ImageLoader from '@/components/Image';
import { pageStyles } from '@/pages/Home/style/homeStyle';
import {
  ArrowDownOutlined,
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
  Row,
  Statistic,
  StatisticProps,
  Tabs,
  Typography,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect } from 'react';
import CountUp from 'react-countup';

const { Title } = Typography;

// https://shs3.b.qianxin.com:443/ti_portal_upload_s3/1703471334_VDC

const Welcome: React.FC = () => {
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
              <Title style={{ marginLeft: 'auto', marginRight: 'auto' }} level={3}>
                系统信息
              </Title>
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
                          value={112893}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="篇"
                          formatter={formatter}
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
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<ArrowUpOutlined />}
                          suffix="个"
                          formatter={formatter}
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
                          value={9.323434}
                          precision={1}
                          valueStyle={{ color: '#cf1322' }}
                          prefix={<ArrowDownOutlined />}
                          suffix="个"
                          formatter={formatter}
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
              <div style={{ display: 'flex', marginBottom: 16 }}>
                <Title style={{ marginLeft: 'auto', marginRight: 'auto' }} level={3}>
                  实体信息
                </Title>
              </div>
              <Row gutter={16}>
                {/*xs={24} sm={16} lg={{ span: 16 }}*/}
                <Col span={16} className="entity-col">
                  <Card className="entity-card">
                    <div className="entity-item-parent">
                      <div className="entity-item">
                        <Statistic title="Active Users" value={112893} />
                      </div>
                      <div className="entity-item">
                        <Statistic title="Active Users" value={112893} />
                      </div>
                      <div className="entity-item">
                        <Statistic title="Active Users" value={112893} />
                      </div>
                      <div className="entity-item">
                        <Statistic title="Active Users" value={112893} />
                      </div>
                      <div style={{ backgroundColor: '#FUF4E5' }} className="entity-item">
                        xxx
                      </div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                    </div>
                  </Card>
                </Col>

                {/*xs={24} sm={8} lg={{ span: 8 }}*/}
                <Col span={8} className="entity-col">
                  <Card className="entity-card">
                    <div className="entity-item-parent">
                      <div style={{ backgroundColor: '#FFF4E1' }} className="entity-item">
                        xxx
                      </div>
                      <div style={{ backgroundColor: '#FAF4E2' }} className="entity-item">
                        xxx
                      </div>
                      <div style={{ backgroundColor: '#FGF4E3' }} className="entity-item">
                        xxx
                      </div>
                      <div style={{ backgroundColor: '#FHF4E4' }} className="entity-item">
                        xxx
                      </div>
                      <div style={{ backgroundColor: '#FUF4E5' }} className="entity-item">
                        xxx
                      </div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                      <div className="entity-item">xxx</div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
