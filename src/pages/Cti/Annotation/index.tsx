import EntityItemBox from '@/components/AnnotationComponent/EntityItemBox';
import accessEnum from '@/constants/access/accessEnum';
import '@/pages/Cti/Annotation/style/annotationStyle.css';
import {
  getDetailCtiUsingPost,
  getPageCtiWordLabelListUsingPost,
} from '@/services/backend/ctiController';
import { getAllItemMapDataUsingGet } from '@/services/backend/itemController';
import { useModel, useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Card, Col, Drawer, FloatButton, message, Row, Tag, Typography } from 'antd';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const { Text, Title } = Typography;

/**
 * 用户管理页面
 *
 * @constructor
 */
const CtiAnnotationPage: React.FC = () => {
  // 获取动态路由传来的id
  const { id } = useParams();
  const [ctiChunkList, setCtiChunkList] = useState<API.CtiChunk[]>([]);
  const [ctiContent, setCtiContent] = useState<string>();
  const [itemData, setItemData] = useState<API.Item[]>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [sysTheme, setSysTheme] = useState<string>();
  const [open, setOpen] = useState(false);
  const [requestWordLabelListParams, setRequestWordLabelListParams] =
    useState<API.CtiModelWordLabelResultDto>({
      ctiId: id,
      size: 10,
      current: 1,
    });
  const [wordLabelResult, setWordLabelList] = useState<API.CtiWordLabelVo>({
    wordList: [],
    labelList: [],
  });

  /**
   * 开启模型抽取结果的抽屉
   */
  const showDrawer = () => {
    setOpen(true);
  };

  /**
   * 开启模型抽取结果的抽屉关闭逻辑
   */
  const onClose = () => {
    setOpen(false);
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
        setCtiContent(res.data.content);
        // @ts-ignore
        setCtiChunkList(res.data.ctiChunkList);
      }
    } catch (error: any) {
      message.error('加载CTI数据失败' + error.message);
    }
  };

  const loadItemData = async () => {
    try {
      const res = await getAllItemMapDataUsingGet();
      if (res.code === 0) {
        Object.values(res.data).forEach((item: API.Item) => {
          setItemData((prevState) => [...prevState, item]);
        });
      }
    } catch (e: any) {
      message.error('获取item数据失败');
    }
  };

  // @ts-ignore
  const [chartOption, setChartOption] = useState<EChartsOption>({});

  // 子组件会传过来一个需要删除的chunkId
  const removeEntity = (annotationId: number) => {
    setCtiChunkList(
      ctiChunkList.filter(
        // @ts-ignore
        (item) => item.id !== annotationId,
      ),
    );
  };

  const getLabelDict = () => {
    const itemId2ItemName = new Map<string, string>();
    const itemId2BackgroundColor = new Map<string, string>();
    for (const label of itemData) {
      itemId2ItemName.set(label.id, label.itemName);
      itemId2BackgroundColor.set(label.itemName, label.backgroundColor);
    }
    return { itemId2ItemName, itemId2BackgroundColor };
  };

  const updateEchartData = () => {
    const echartData = [];
    const { itemId2ItemName, itemId2BackgroundColor } = getLabelDict();
    const charNumMap = new Map<string, number>(); // 键类型为 string，值类型为 any
    for (let i = 0; i < ctiChunkList.length; i++) {
      const itemId = String(ctiChunkList[i]?.itemId);
      if (itemId === '' || itemId === undefined || itemId === null) {
        continue;
      } else {
        const itemTypeName = itemId2ItemName.get(itemId);
        if (charNumMap.has(itemTypeName)) {
          charNumMap.set(itemTypeName, charNumMap.get(itemTypeName) + 1);
        } else {
          charNumMap.set(itemTypeName, 1);
        }
      }
    }
    charNumMap.forEach((value, key) => {
      echartData.push({
        value: value,
        name: key,
        itemStyle: { color: itemId2BackgroundColor.get(key) },
      });
    });
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
    setChartOption(option);
  };

  /**
   * 这里处理用户添加实体逻辑
   * @param start 该实体在整个文章中的开始位置
   * @param end 该实体在整个文章中的结束位置
   * @param entityTypeId 该实体类型的id（与数据库中的数据进行对应）
   */
  const addEntity = (start: number, end: number, entityTypeId: number) => {
    const payload = {
      id: Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)),
      startOffset: start,
      endOffset: end,
      itemId: entityTypeId,
    };
    console.log(payload);
    ctiChunkList.push(payload);
    updateEchartData();
    setCtiChunkList(ctiChunkList);
  };

  /**
   * 获取情报中的标签和单词数据，模型训练好的
   */
  const getWordLabelData = async () => {
    try {
      const res = await getPageCtiWordLabelListUsingPost(requestWordLabelListParams);
      if (res.code === 0) {
        setWordLabelList((prevState) => ({
          // @ts-ignore
          wordList: [...prevState.wordList, ...res.data.wordList],
          labelList: [...prevState.labelList, ...res.data.labelList],
        }));
        setRequestWordLabelListParams((prevState) => ({
          ...prevState,
          // @ts-ignore
          current: prevState.current + 1,
        }));
      }
    } catch (e: any) {
      message.error('获取数据出错', e);
    }
  };

  useEffect(() => {
    // 获取cti情报的详情数据
    loadData();
    // 获取item的全部数据
    loadItemData();
    // 获取模型标注数据
    getWordLabelData();
  }, []);

  useEffect(() => {
    // @ts-ignore
    const navTheme = initialState.settings.navTheme;
    setSysTheme(navTheme === 'light' ? '' : 'dark');
  }, [initialState.settings.navTheme]);

  useEffect(() => {
    if (!itemData || itemData.length <= 0) {
      return;
    }
    updateEchartData();
  }, [ctiChunkList]);

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer title={false}>
          <Row gutter={16}>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <div style={{ marginBottom: 16 }}>
                <Card title="智能情报标注区域" bordered={false} hoverable>
                  {ctiContent && ctiChunkList && (
                    <EntityItemBox
                      itemList={itemData}
                      currentCtiText={ctiContent}
                      currentEntityList={ctiChunkList}
                      removeEntity={removeEntity}
                      addEntity={addEntity}
                    />
                  )}
                </Card>
              </div>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              {/*<Col span={12}>*/}
              <div style={{ position: 'sticky', top: 56 }}>
                <Card
                  title="威胁情报信息展示区域"
                  className="annotation-right-card"
                  bordered={false}
                  hoverable
                >
                  <ReactECharts theme={sysTheme} option={chartOption} style={{ minHeight: 360 }} />
                </Card>
                <Card
                  title="操作功能区域"
                  className="annotation-right-card"
                  bordered={false}
                  hoverable
                >
                  {currentUser?.userRole === accessEnum.ADMIN && (
                    <Button className="annotation-right-card-btn" size="large">
                      提交标注内容
                    </Button>
                  )}
                  <Button
                    size="large"
                    onClick={() => showDrawer()}
                    className="annotation-right-card-btn"
                  >
                    查看模型识别结果
                  </Button>
                  <Drawer
                    width={1200}
                    style={{ backgroundColor: '#efefef' }}
                    title="Basic Drawer"
                    onClose={onClose}
                    open={open}
                  >
                    <div>
                      {wordLabelResult.wordList.map((word_list: string[], list_index: number) => (
                        <>
                          <Title level={3}>第 {list_index+1} 句: </Title>
                          <Card bordered={false} className="annotation-right-card">
                            <Row gutter={16} key={list_index}>
                              {' '}
                              {/* 注意增加 key 用于优化渲染性能 */}
                              {word_list.map((word: string, word_index: number) => (
                                <Col span={4} key={word_index}>
                                  {' '}
                                  {/* 同样增加 key */}
                                  <div className="annotation-sent-card single-word-div">
                                    <div
                                      className={
                                        wordLabelResult.labelList[list_index][word_index] === 'O'
                                          ? 'normal-text'
                                          : ''
                                      }
                                    >
                                      {wordLabelResult.labelList[list_index][word_index] === 'O' ? (
                                        <Text>{word}</Text>
                                      ) : (
                                        <Title level={4}>{word}</Title>
                                      )}
                                    </div>
                                    <div>
                                      <Tag
                                        color={
                                          wordLabelResult.labelList[list_index][word_index] === 'O'
                                            ? 'default'
                                            : 'processing'
                                        }
                                      >
                                        {wordLabelResult.labelList[list_index][word_index]}
                                      </Tag>{' '}
                                      {/* 单词作为Tag显示 */}
                                    </div>
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </Card>
                        </>

                      ))}
                    </div>
                  </Drawer>
                  <Button className="annotation-right-card-btn" size="large">
                    查看情报图谱
                  </Button>
                  {currentUser?.userRole === accessEnum.ADMIN && (
                    <Button className="annotation-right-card-btn" size="large">
                      复制模型识别结果
                    </Button>
                  )}
                  <Button className="annotation-right-card-btn" size="large">
                    大模型关系抽取
                  </Button>
                </Card>
              </div>
            </Col>
          </Row>
          <FloatButton.BackTop />
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiAnnotationPage;
