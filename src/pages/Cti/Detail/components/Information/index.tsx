import '@/pages/Cti/Detail/style/detailPageStyle.css';
import { getDetailCtiUsingPost } from '@/services/backend/ctiController';
import { getAllItemMapDataUsingGet } from '@/services/backend/itemController';
import { useModel } from '@@/exports';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';
import '@umijs/max';
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Empty,
  Image,
  List,
  message,
  Row,
  Tag,
  Typography,
} from 'antd';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  id: number;
}

// 定义了echart数据类型
interface EchartItem {
  value: number;
  name: string;
  itemStyle: {
    color: string | undefined;
  };
}

const CtiDetailInformationPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const [ctiChunkList, setCtiChunkList] = useState<API.CtiChunk[]>([]);
  const [answer, setAnswer] = useState('');
  const [dialogueAnswer, setDialogueAnswer] = useState('');
  const timerRef = useRef(null);
  const interArr = [30, 40, 30, 50, 30, 50, 30, 60, 35, 40];
  const [itemData, setItemData] = useState<API.Item[]>([]);
  // @ts-ignore
  const [entityChartOption, setEntityChartOption] = useState<EChartsOption>({});
  const [itemChartOption, setItemChartOption] = useState<EChartsOption>({});
  const [sysTheme, setSysTheme] = useState<string>();
  const [createCtiUser, setCreateCtiUser] = useState<API.NoRoleUserVo>({});
  const [ctiDetailVo, setCtiDetailVo] = useState<API.CtiDetailVo>({});
  const { initialState } = useModel('@@initialState');
  const echartsRef = useRef(null);
  const { Title } = Typography;
  const [hasData, setHasData] = useState<boolean>(false);
  /**
   * 初始化界面获取数据
   */
  const loadCtiData = async () => {
    if (!id) {
      message.error('请勿非法访问该界面');
      return;
    }
    try {
      // @ts-ignore
      const res = await getDetailCtiUsingPost({ id });
      if (res.code === 0) {
        // @ts-ignore
        setCtiChunkList(res.data.ctiChunkList);
        // @ts-ignore
        setCreateCtiUser(res.data.user);
        // @ts-ignore
        setCtiDetailVo(res.data);
        setHasData(true);
      }
    } catch (error: any) {
      message.error(error.message);
      setHasData(false);
    }
  };

  // 处理打字效果
  useEffect(() => {
    const setContent = () => {
      if (dialogueAnswer.length < answer.length) {
        setDialogueAnswer(dialogueAnswer + answer.charAt(dialogueAnswer.length));
      } else {
        // @ts-ignore
        clearTimeout(timerRef.current); // 清除定时器
      }
    };

    if (answer && dialogueAnswer.length < answer.length) {
      // @ts-ignore
      timerRef.current = setTimeout(
        setContent,
        interArr[Math.floor(Math.random() * interArr.length)],
      );
    }

    return () => {
      // @ts-ignore
      clearTimeout(timerRef.current); // 组件卸载时清除定时器
    };
  }, [dialogueAnswer, answer]);

  useEffect(() => {
    // @ts-ignore
    const navTheme = initialState.settings.navTheme;
    setSysTheme(navTheme === 'light' ? '' : 'dark');
  }, [initialState!.settings.navTheme]);

  /**
   * 加载item数据
   */
  const loadItemData = async () => {
    try {
      const res = await getAllItemMapDataUsingGet();
      if (res.code === 0) {
        Object.values(res.data!).forEach((item: API.Item) => {
          setItemData((prevState) => [...prevState, item]);
        });
      }
    } catch (e: any) {
      message.error('获取item数据失败');
    }
  };

  /**
   * 获取itemId对应item的Dict
   */
  const getLabelDict = () => {
    const itemId2ItemName = new Map<string, string>();
    const itemId2BackgroundColor = new Map<string, string>();
    const itemName2ItemType = new Map<string, number>();
    for (const label of itemData) {
      // @ts-ignore
      itemId2ItemName.set(label.id, label.itemName);
      // @ts-ignore
      itemId2BackgroundColor.set(label.itemName, label.backgroundColor);
      // @ts-ignore
      itemName2ItemType.set(label.itemName, label.itemType);
    }
    return { itemId2ItemName, itemId2BackgroundColor, itemName2ItemType };
  };

  /**
   * 得到对象类型占比的图
   * @param echartData
   */
  const getPicChartOption = (echartData: EchartItem[]) => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        // top: '85%',
      },
      series: [
        {
          name: '实体信息',
          type: 'pie',
          radius: '50%',
          data: echartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          bottom: '12%',
        },
      ],
    };
    return option;
  };

  const getLinePicChartOption = (echartData: EchartItem[]) => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        // top: '85%',
      },
      series: [
        {
          name: '实体信息',
          type: 'pie',
          radius: '50%',
          data: echartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          label: {
            alignTo: 'edge',
            // @ts-ignore
            formatter: function (params) {
              const name = params.name;
              const value = params.value;
              if (name === 'SCO') {
                return `{name|SCO [STIX Cyber-observable Object]}\n\n{value|${value} 个}`;
              } else {
                return `{name|SDO [STIX Domain Object]}\n\n{value|${value} 个}`;
              }
            },
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999',
              },
            },
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80,
          },
          // @ts-ignore
          labelLayout: function (params) {
            // @ts-ignore
            const echartInstance = echartsRef.current.getEchartsInstance();
            const isLeft = params.labelRect.x < echartInstance.getWidth() / 2;
            const points = params.labelLinePoints as number[][];
            // Update the end point.
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
            };
          },
          bottom: '12%',
        },
      ],
    };
    return option;
  };

  // 加载饼图数据
  const loadEchartOption = () => {
    const { itemId2ItemName, itemId2BackgroundColor, itemName2ItemType } = getLabelDict();
    const entityTypeNumMap = new Map<string, number>(); // 键类型为 string，值类型为 any
    const itemTypeNumMap = new Map<string, number>(); // 键类型为 string，值类型为 any
    for (const chunk of ctiChunkList) {
      const itemId = String(chunk?.itemId);
      if (!itemId) {
        continue;
      }
      const itemName: string = itemId2ItemName.get(itemId) as string;
      if (!itemName) {
        continue;
      }
      // @ts-ignore
      const itemType: 'SDO' | 'SCO' = itemName2ItemType.get(itemName) === 1 ? 'SDO' : 'SCO';
      const entityTypeCurrentCount = entityTypeNumMap.get(itemName) || 0;
      const itemTypeCurrentCount = itemTypeNumMap.get(itemType) || 0;
      entityTypeNumMap.set(itemName, entityTypeCurrentCount + 1);
      itemTypeNumMap.set(itemType, itemTypeCurrentCount + 1);
    }

    const entityEchartData: EchartItem[] = Array.from(entityTypeNumMap, ([name, value]) => ({
      value: value,
      name: name,
      itemStyle: { color: itemId2BackgroundColor.get(name) },
    }));

    const entityEchartOption = getPicChartOption(entityEchartData);

    setEntityChartOption(entityEchartOption);
    // @ts-ignore
    const itemEchartData: EchartItem[] = Array.from(itemTypeNumMap, ([name, value]) => ({
      value: value,
      name: name,
      itemStyle: { color: name === 'SCO' ? '#704da8' : '#c2c0e7' },
    }));

    const itemEchartOption = getLinePicChartOption(itemEchartData);

    setItemChartOption(itemEchartOption);
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      span: 1,
      label: '创建者头像',
      children: (
        <Image style={{ height: '120px', borderRadius: '500px' }} src={createCtiUser.userAvatar} />
      ),
    },
    {
      key: '2',
      label: '创建者名称',
      span: 1,
      children: createCtiUser.userName,
    },
    {
      key: '3',
      span: 1,
      label: '创建者标签',
      children: (
        <Tag icon={<UserOutlined />} color="#55acee">
          {createCtiUser.userProfile}
        </Tag>
      ),
    },
    {
      key: '4',
      label: '情报创建时间',
      span: 1,
      children: moment(ctiDetailVo.createTime).format('YYYY-MM-DD'),
    },
    {
      key: '5',
      label: '情报最后更新时间',
      span: 1,
      children: moment(ctiDetailVo.updateTime).format('YYYY-MM-DD'),
    },
    {
      key: '6',
      label: '情报标签',
      span: 1,
      children: (
        <Tag icon={<FileTextOutlined />} color="#3b5999">
          Threat-Report
        </Tag>
      ),
    },
    {
      key: '7',
      label: '情报总数',
      span: 1,
      children: (
        <Title type="success" level={4}>
          {ctiDetailVo?.entityNum} 个
        </Title>
      ),
    },
    {
      key: '8',
      label: 'SCO总数',
      span: 1,
      children: (
        <Title type="success" level={4}>
          {ctiDetailVo?.scoNum} 个
        </Title>
      ),
    },
    {
      key: '9',
      label: 'SDO总数',
      span: 1,
      children: (
        <Title type="success" level={4}>
          {ctiDetailVo?.sdoNum} 个
        </Title>
      ),
    },
  ];

  const data = Array.from({ length: 5 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));

  useEffect(() => {
    loadEchartOption();
  }, [ctiChunkList, itemData]);

  useEffect(() => {
    loadCtiData();
    loadItemData();
    setAnswer(
      'APT33, identified as a suspected Iranian cyber espionage group, has been active since at least 2013, targeting organizations in the aerospace and energy sectors across the United States, Saudi Arabia, and South Korea. This group, which operates at the behest of the Iranian government, has shown particular interest in aviation-related industries, both military and commercial, as well as petrochemical production. APT33 uses a variety of tactics including spear phishing with malicious .hta files and domain masquerading to infiltrate target organizations. Their activities suggest a focus on gathering strategic intelligence to enhance Iran\'s military and petrochemical capabilities, possibly to aid Iran’s decision-making against regional rivals. Furthermore, APT33 has potential ties to destructive malware, evidenced by links to DROPSHOT and SHAPESHIFT wiper malware, indicating their capability for not just espionage but potentially disruptive cyber attacks as well. Their operations align with Iranian working hours and leverage tools and infrastructure indicative of a state-sponsored actor.',
    );
  }, []);

  return !hasData ? (
    <Card hoverable>
      <Empty />
    </Card>
  ) : (
    <div className="detail-page-inforamtion">
      <div className="cti-short-information cti-detail-page-normal-margin-top">
        <Card>
          <div className="cti-short-title">
            <div className="ai-title-text">CTI-AI-摘要</div>
            <div id="ai-tag">YxinMiracle GPT</div>
          </div>
          <div className="msg-text cursor-ani">{dialogueAnswer}</div>
        </Card>
      </div>
      <div>
        <Row gutter={16}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xxl={{ span: 8 }}
            className="cti-detail-page-normal-margin-top"
          >
            <Card title="实体详情占比" hoverable>
              <ReactECharts
                theme={sysTheme}
                option={entityChartOption}
                style={{ minHeight: 360 }}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xxl={{ span: 8 }}
            className="cti-detail-page-normal-margin-top"
          >
            <Card title="对象类型占比" hoverable>
              <ReactECharts
                ref={echartsRef}
                theme={sysTheme}
                option={itemChartOption}
                style={{ minHeight: 360 }}
              />
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xxl={{ span: 8 }}
            className="cti-detail-page-normal-margin-top"
          >
            <Card title="情报信息总览" hoverable>
              <Descriptions layout="vertical" items={items} style={{ minHeight: 360 }} />
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Card title="相关情报" className="cti-detail-page-normal-margin-top">
          <div>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  className="list-item-hover"
                  onClick={() => message.success('xxx')}
                  key={item.title}
                  extra={
                    <img
                      className="list-item-img"
                      width={200}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={createCtiUser.userAvatar} />}
                    title={<a href={item.href}>{ctiDetailVo.title?.substring(0, 32) + '...'}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
export default CtiDetailInformationPage;
