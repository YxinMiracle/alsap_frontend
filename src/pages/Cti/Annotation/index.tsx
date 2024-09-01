import EntityItemBox from '@/components/AnnotationComponent/EntityItemBox';
import { getDetailCtiUsingPost } from '@/services/backend/ctiController';
import { getAllItemMapDataUsingGet } from '@/services/backend/itemController';
import {useModel, useParams} from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Card, Col, FloatButton, message, Row } from 'antd';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import echarts from 'echarts';
import echartsDarkTheme from '@/constants/dackChatTheme'

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
  const [sysTheme, setSysTheme] = useState<string>()

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
          bottom: "12%"
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

  useEffect(() => {
    loadData();
    loadItemData();
  }, []);

  useEffect(() => {
    // @ts-ignore
    const navTheme = initialState.settings.navTheme;
    setSysTheme(navTheme==='light'?'':'dark')
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
                <Card title="威胁情报信息展示区域" bordered={false} hoverable>
                  <ReactECharts theme={sysTheme} option={chartOption} style={{ minHeight: 360 }} />
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
