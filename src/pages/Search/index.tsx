import PageFloatButton from '@/components/FloatButtonComponent';
import HistoryBox from '@/pages/Home/components/history';
import HotBox from '@/pages/Home/components/hot';
import SearchDetailPage from '@/pages/Search/components/SearchDetail';
import '@/pages/Search/style/searchStyle.css';
import { searchCtiVoByPageUsingPost } from '@/services/backend/ctiController';
import { getHotArticleUsingGet } from '@/services/backend/hotController';
import { history } from '@@/core/history';
import { FireOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  Image,
  List,
  message,
  Row,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const SearchPage: React.FC = () => {
  const [inputFocus, setInputFocus] = React.useState<boolean>(false);
  const [tabIndex, setTabIndex] = React.useState<string>('1');
  const initSearchParams = {
    pageSize: 10,
    sortField: 'updateTime',
    sortOrder: 'desc',
  };
  const [total, setTotal] = useState<number>(0);
  const [searchParams] = useState({ ...initSearchParams });
  const [ctiVoList, setCtiVoList] = useState<API.CtiVo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hotArticleList, setHotArticleList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 为了便于链接分销，需要将搜索的关键字和放前页数进行获取
  const searchText = new URLSearchParams(location.search).get('s') || '';
  const currentPage = new URLSearchParams(location.search).get('page') || '1';

  enum TagEnum {
    CTI_SEARCH = '威胁情报',
    CTI_YANPAN = '威胁研判',
  }

  // 监听tag改变事件
  const tagOnChange = (key: string) => {
    console.log(key);
  };

  const searchEs = async () => {
    if (searchText === null || searchText.length === 0) {
      history.push('/information');
      message.error('无法查询空参数');
      return;
    }
    setLoading(true);
    try {
      const res = await searchCtiVoByPageUsingPost({
        ...searchParams,
        searchText: searchText!,
        current: Number(currentPage),
      });
      if (res.code === 0) {
        // @ts-ignore
        setCtiVoList(res.data.records);
        // @ts-ignore
        setTotal(res.data.total as number);
      }
    } catch (e: any) {
      message.error(e.message ?? '接口出现错误');
    }
    setLoading(false);
  };

  const initHotArticle = async () => {
    try {
      const res = await getHotArticleUsingGet();
      if (res.code === 0) {
        //@ts-ignore
        setHotArticleList(res.data);
      }
    } catch (e: any) {
      message.error(e.message ?? '热门接口出现错误');
    }
  };

  useEffect(() => {
    initHotArticle();
  }, []);

  useEffect(() => {
    searchEs();
  }, [searchText, currentPage]);

  // 获取搜索框
  const getSearchTag = (value: string) => (
    <Search
      placeholder={value}
      defaultValue={searchText}
      allowClear
      enterButton="搜索"
      size="large"
      onFocus={() => {
        setInputFocus(true);
      }}
      onBlur={() => {
        setInputFocus(false);
      }}
      onSearch={async (value: string) => {
        setInputFocus(false);
        // 重新搜索了，需要讲页数改为1
        navigate(`${location.pathname}?s=${value}&page=1`);
      }}
    />
  );

  const onItemClick = () => {
    setInputFocus(false);
  };

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

  // icon渲染函数
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  // @ts-ignore
  return (
    <div className="search-root">
      <Row>
        <Col xs={24} sm={24} lg={{ span: 18, offset: 3 }}>
          <div className={'search-header-wrapper'}>
            <Row gutter={16}>
              {/*左边 搜索框+答案*/}
              <Col xs={24} sm={24} xxl={{ span: 14, offset: 1 }}>
                <div className={`search-left search-header`}>
                  <Card bordered={false}>
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
                      <Card
                        className="tabs-content"
                        style={{ marginTop: -1, zIndex: 2, borderColor: '#1890ff' }}
                      >
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
                  </Card>
                </div>
                <div className={'search-body'}>
                  <List
                    loading={loading}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: (page) => {
                        navigate(`${location.pathname}?s=${searchText}&page=${page}`);
                      },
                      showTotal: (total: number) => (
                        <>
                          共 <span className="red-text">{total}</span> 条数据
                        </>
                      ),
                      pageSize: searchParams.pageSize,
                      current: Number(currentPage),
                      total: total,
                    }}
                    dataSource={ctiVoList}
                    renderItem={(item: API.CtiVo) => (
                      <List.Item
                        key={item.title}
                        actions={[
                          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                          <Image
                            width={272}
                            src={
                              item.postUrl ??
                              'https://storage.googleapis.com/gweb-cloudblog-publish/images/threat-intelligence-default-banner-simplifie.max-700x700.png'
                            }
                          />
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                item.postUrl ??
                                'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                              }
                            />
                          }
                          title={
                            <a
                              href={`/cti/show/detail/${item.id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {/*@ts-ignore*/}
                              <span
                                className="text-ellipsis-two-line"
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              />
                            </a>
                          }
                          description={
                            <span className="text-ellipsis-three-line">{item.simpleContent}</span>
                          }
                        />
                        <SearchDetailPage item={item} />
                      </List.Item>
                    )}
                  />
                </div>
              </Col>
              {/*右边 信息展示*/}
              <Col xs={0} sm={0} xxl={{ span: 8 }}>
                {/*热门情报展示*/}
                <div className="information-card">
                  <Card
                    title={<div className="relative font-bold z-10">🔥 热门情报</div>}
                    extra={
                      <div className="relative z-10">
                        <a href="#">更多情报</a>
                      </div>
                    }
                  >
                    <div
                      className="-z-10 rounded-lg w-full absolute top-0 left-0 bg-gradient-to-b from-card-gradient-from to-white"
                      style={{ height: 60 }}
                    ></div>
                    {/*热门CTI*/}
                    <div>
                      <List
                        dataSource={hotArticleList}
                        split={false}
                        renderItem={(item: API.HotVo) => (
                          <Typography
                            onClick={() => {
                              window.open(`/cti/show/detail/${item.id}`, '_blank');
                            }}
                          >
                            <div className="p-2 cursor-pointer hover-gray">
                              <Row justify={'space-between'} wrap={false}>
                                <Col>
                                  <div className="text-ellipsis">{item.title}</div>
                                </Col>

                                <Col>
                                  <Space wrap={false} size={'small'}>
                                    <FireOutlined />
                                    <div>
                                      <Typography.Text className="text-ellipsis" type={'secondary'}>
                                        {item.heat}
                                      </Typography.Text>
                                    </div>
                                  </Space>
                                </Col>
                              </Row>
                            </div>
                          </Typography>
                        )}
                      />
                    </div>
                  </Card>
                  {/*微信公众号*/}
                  <div className="margin-top-16">
                    <Image src="https://cdn.yxinmiracle.com/logo/gzh-search.png"></Image>
                  </div>
                  {/*微信小程序扫码*/}
                  <Card className="margin-top-16">
                    <Row gutter={16} align="middle">
                      <Col span={8}>
                        <Image src="https://cdn.yxinmiracle.com/logo/gh_a0acede9c7c9_860.jpg"></Image>
                      </Col>
                      <Col span={16}>
                        <div>
                          <Title level={4}>CTI情报智能分析小程序</Title>
                          <Paragraph copyable>
                            扫码使用小程序，获取更多情报资讯、最新规则、优质报告。
                          </Paragraph>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <PageFloatButton />
      </Row>
    </div>
  );
};

export default SearchPage;
