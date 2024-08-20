import ImageLoader from '@/components/Image';
import { pageStyles } from '@/pages/Home/style/homeStyle';
import { Carousel, Col, Row, Tabs, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect } from 'react';
import {gsap} from "gsap/all";

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
    height: '225px', // 确保容器有足够的高度
    width: '400px', // 和宽度
    margin: '0 auto',
  };

  return (
    <div className="home-root">
      <Row>
        <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
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
                <Col xs={0} sm={0} lg={{ span: 7, offset: 1 }}>
                  <Carousel arrows infinite autoplay>
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
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
