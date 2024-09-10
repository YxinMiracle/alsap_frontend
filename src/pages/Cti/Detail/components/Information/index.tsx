import '@/pages/Cti/Detail/style/detailPageStyle.css';
import '@umijs/max';
import {Card, Col, message, Row} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactECharts, {EChartsOption} from "echarts-for-react";
import {getAllItemMapDataUsingGet} from "@/services/backend/itemController";
import {getDetailCtiUsingPost} from "@/services/backend/ctiController";
import {useModel} from "@@/exports";

interface Props {
  id: number;
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
  const [chartOption, setChartOption] = useState<EChartsOption>({});
  const [sysTheme, setSysTheme] = useState<string>();
  const { initialState } = useModel('@@initialState');

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
      }
    } catch (error: any) {
      message.error('加载CTI数据失败' + error.message);
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
  }, [initialState.settings.navTheme]);

  /**
   * 加载item数据
   */
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

  /**
   * 获取itemId对应item的Dict
   */
  const getLabelDict = () => {
    const itemId2ItemName = new Map<string, string>();
    const itemId2BackgroundColor = new Map<string, string>();
    const itemId2ItemType = new Map<string, number>();
    for (const label of itemData) {
      itemId2ItemName.set(label.id, label.itemName);
      itemId2BackgroundColor.set(label.itemName, label.backgroundColor);
    }
    return { itemId2ItemName, itemId2BackgroundColor };
  };

  const loadEchartOption = () => {
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

  useEffect(() => {
    loadEchartOption()
  }, [ctiChunkList, itemData]);

  useEffect(() => {
    loadCtiData()
    loadItemData()
    setAnswer(
      '这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。这里是模拟的websocket消息内容。',
    );
  }, []);


  return (
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
            <Card hoverable>
              <ReactECharts theme={sysTheme} option={chartOption} style={{ minHeight: 360 }} />
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
            <Card hoverable>xx</Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xxl={{ span: 8 }}
            className="cti-detail-page-normal-margin-top"
          >
            <Card hoverable>xx</Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CtiDetailInformationPage;
