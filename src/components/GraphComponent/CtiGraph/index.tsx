import '@/components/GraphComponent/style/graphDrawerStyle.css';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import G6 from '@antv/g6';
import '@umijs/max';
import { Descriptions, Drawer, List, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  graphData: { nodes: any[]; edges: any[] };
}

const CtiGraph: React.FC<Props> = (props: Props) => {
  const { graphData } = props;
  const graphRef = useRef(null);
  // @ts-ignore
  let graphObj = null;
  // 节点上的字体大小
  const globalFontSize = 12;
  // 监控是否需要查看节点的详情信息
  const [open, setOpen] = useState(false);
  // 点击过后的节点信息
  const [clickedNodeInformation, setClickedNodeInformation] = useState<API.GraphNodeVo>({});
  // 定义标签
  const { Title } = Typography;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // 插入信息
  const treeTooltip = () => {
    return new G6.Tooltip({
      offsetX: 10,
      offsetY: 20,
      getContent(e: any) {
        const outDiv = document.createElement('div');
        outDiv.style.minWidth = '180px';
        outDiv.innerHTML = `
          <h4>NODE 信息</h4>
          <ul>
            <li>nodeName: ${e?.item.getModel().nodeName}</li>
            <li>ioc: ${e?.item.getModel().nodeIoc}</li>
          </ul>`;
        return outDiv;
        // return outDiv
      },
      //显示条件
      shouldBegin(e: any) {
        //鼠标移入后显示
        return e.name.includes('mousemove');
        // return e.item?.get("model")?.label?.includes("...");
      },
      // 类型响应 ["node",'edge','canvas']
      itemTypes: ['node'],
    });
  };

  // 节点中内容过长以...方式呈现
  const fittingString = (str: string, maxWidth: number, fontSize: number) => {
    const ellipsis = '...';
    const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
    if (!str) return str;
    str.split('').forEach((letter, i) => {
      if (currentWidth > maxWidth - ellipsisLength) return;
      if (pattern.test(letter)) {
        // Chinese charactors
        currentWidth += fontSize;
      } else {
        // get the width of single letter according to the fontSize
        currentWidth += G6.Util.getLetterWidth(letter, fontSize);
      }
      if (currentWidth > maxWidth - ellipsisLength) {
        res = `${str.substr(0, i)}${ellipsis}`;
      }
    });
    return res;
  };

  /**
   * 1. 注册改图边的样式
   */
  const registerGraphEdge = () => {
    G6.registerEdge(
      'quadratic',
      {
        setState(name, value, item) {
          const group = item?.getContainer();
          const shape = group?.get('children')[0]; // 顺序根据 draw 时确定
          // 根据判断该edge的状态来设定不同的样式
          if (name === 'active') {
            if (value) {
              shape.attr('stroke', '#74c7f6');
              shape.attr('lineWidth', '6');
              shape.attr('endArrow', {
                stroke: '#8cd1f8',
                fill: '#74c7f6',
                // 设置终点箭头
                path: G6.Arrow.triangle(5, 10, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
                d: 25,
              });
            } else {
              shape.attr('stroke', '#a5a4a4');
              shape.attr('lineWidth', '1');
              shape.attr('endArrow', {
                stroke: '#a5a4a4',
                fill: '#a5a4a4',
                // 设置终点箭头
                path: G6.Arrow.triangle(5, 10, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
                d: 25,
              });
            }
          }
        },
      },
      'quadratic',
    );
  };

  /**
   * 2. 注册该图的节点样式
   */
  const registerGraphNode = () => {
    G6.registerNode(
      'x-circle',
      {
        drawShape: function drawShape(cfg: any, group: any) {
          group.shapeMap = {};
          const initItemObj = cfg?.itemData;
          let rect = group.addShape('circle', {
            attrs: {
              x: 0,
              y: 0,
              r: 25,
              lineWidth: 1,
              stroke: initItemObj?.backgroundColor,
              fill: initItemObj?.backgroundColor,
            },
            name: 'rect-intention',
          });
          // title
          group.addShape('text', {
            attrs: {
              textBaseline: 'middle',
              text: cfg.label,
              fontSize: 12,
              fill: '#000',
              textAlign: 'center',
            },
            name: 'rect-title',
          });
          return rect;
        },
        // 响应状态变化
        setState(name, value, item) {
          const group = item?.getContainer();
          const shape = group?.get('children')[0]; // 顺序根据 draw 时确定
          const entityObj = item?.getModel()?.itemData as API.ItemVo;
          const color = entityObj?.backgroundColor;
          if (value) {
            shape.attr('stroke', color);
            shape.attr('fill', color);
            shape.attr('shadowColor', color); //阴影
            shape.attr('shadowBlur', 10); //阴影范围
            shape.attr('lineWidth', 8);
          } else {
            shape.attr('stroke', color);
            shape.attr('fill', color);
            shape.attr('shadowColor', color); //阴影
            shape.attr('shadowBlur', 0); //阴影范围
            shape.attr('lineWidth', 1);
          }
        },
      },
      'single-node',
    );
  };

  // @ts-ignore
  const refreshDragedNodePosition = (e) => {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
    model.x = e.x;
    model.y = e.y;
  };

  // 3. 开始绘图
  const drawGraph = () => {
    if (graphRef.current && graphData.nodes.length > 0) {
      // 1. 注册图形的边
      registerGraphNode();
      // 2. 注册图形的节点
      registerGraphEdge();
      // 3. 开始绘图
      const container = graphRef.current;

      // @ts-ignore
      let width = container.scrollWidth;
      // @ts-ignore
      let height = container.scrollHeight;
      const graphObj = new G6.Graph({
        container: container,
        width: width,
        height: height,
        fitView: true,
        fitViewPadding: [10, 10, 10, 10],
        animate: true,
        plugins: [treeTooltip()], //添加插入信息
        linkCenter: true, // 使边连入节点的中心
        fitCenter: true,
        defaultNode: {
          type: 'x-circle',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: 'quadratic',
          style: {
            lineAppendWidth: 3,
            stroke: '#a5a4a4',
            lineWidth: 1,
            endArrow: {
              stroke: '#a5a4a4',
              fill: '#a5a4a4',
              // 设置终点箭头
              path: G6.Arrow.triangle(5, 10, 25), // 使用内置箭头路径函数，参数为箭头的 宽度、长度、偏移量（默认为 0，与 d 对应）
              d: 25,
            },
          },
          labelCfg: {
            autoRotate: true, //线上文字方向
            style: {
              fontSize: 14,
              background: {
                fill: 'rgba(247, 247, 247)',
                padding: [2, 2, 2, 2],
              },
            },
          },
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        layout: {
          type: 'gForce',
          animate: false, // 设置为 false 可关闭布局动画
          maxSpeed: 100,
          linkDistance: 250, //边长度
          clustering: true,
          nodeClusterBy: 'cluster',
          preventOverlap: true, //防止碰撞，配合nodeSize使用
          nodeSize: 100, //
          clusterNodeStrength: 100,
        },
      });

      // @ts-ignore
      graphObj.data(graphData);
      // @ts-ignore
      graphObj.render();

      // 鼠标进入事件监听
      graphObj.on('node:mouseenter', (evt: { item: any }) => {
        const { item } = evt;
        const node = item.get('model');
        console.log(node);
        graphObj.setItemState(item, 'active', true);
      });

      // 鼠标移出时间监听
      graphObj.on('node:mouseleave', (evt: { item: any }) => {
        const { item } = evt;
        const node = item.get('model');
        console.log(node);
        graphObj.setItemState(item, 'active', false);
      });

      // 边移入事件监听
      graphObj.on('edge:mouseenter', (ev: { item: unknown }) => {
        const edge = ev.item;
        // @ts-ignore
        graphObj.setItemState(edge, 'active', true);
      });

      // 边移出的事件监听
      graphObj.on('edge:mouseleave', (ev: { item: unknown }) => {
        const edge = ev.item;
        // @ts-ignore
        graphObj.setItemState(edge, 'active', false);
      });

      // 处理label过长的情况
      graphData.nodes.forEach(function (node) {
        node.label = fittingString(node.label, node.size, globalFontSize);
        if (node.label === undefined || node.label === null || node.label === '') {
          node.label = 'null';
        }
      });

      // 处理点击节点的事件
      graphObj.on('node:click', (evt: { item: any }) => {
        const { item } = evt;
        const node = item.get('model');
        setClickedNodeInformation(node);
        showDrawer();
        // emits("getNode", node);
      });

      // 处理点击边的情况
      graphObj.on('edge:click', (evt: { item: any }) => {
        const { item } = evt;
        const node = item.get('model');
        console.log('>>>>>>>>>>>>>', node);
        // emits("getSide", node);
      });

      graphObj.on('node:dragstart', function () {
        const forceLayout = graphObj.get('layoutController').layoutMethods[0];
        forceLayout.stop();
      });

      graphObj.on('node:drag', function (e) {
        refreshDragedNodePosition(e);
        graphObj.layout();
      });

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graphObj || graphObj.get('destroyed')) return;
          // @ts-ignore
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          // @ts-ignore
          graphObj.changeSize(container.scrollWidth, container.scrollHeight);
        };
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (graphObj !== null) {
      // @ts-ignore
      graphObj.destroy();
    }
    drawGraph();
    return () => {
      // @ts-ignore
      if (graphObj !== null) {
        // @ts-ignore
        graphObj.destroy();
      }
    };
  }, [graphData]);


  return (
    <>
      <div style={{ width: '100%', height: '100%' }} className="relative">
        <Drawer
          title=""
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
        >
          <div>
            <Descriptions
              layout="vertical"
              title="节点信息"
              items={[
                {
                  key: '1',
                  label: '节点名称',
                  span: 3,
                  children: <Title level={5}>{clickedNodeInformation.entityName}</Title>,
                },
                {
                  key: '2',
                  label: '类型',
                  span: 3,
                  children: (
                    <Tag color={clickedNodeInformation.itemData?.backgroundColor}>
                      {clickedNodeInformation.itemData?.itemName}
                    </Tag>
                  ),
                },
                {
                  key: '3',
                  label: '节点在平台的创建时间',
                  span: 3,
                  children: moment(clickedNodeInformation.createTime).format('YYYY-MM-DD'),
                },
                {
                  key: '4',
                  label: '节点在平台的最后更新时间',
                  span: 3,
                  children: moment(clickedNodeInformation.updateTime).format('YYYY-MM-DD'),
                },
                {
                  key: '5',
                  label: '相关的额外情报',
                  span: 3,
                  children: (
                    <List
                      className="graph-drawer"
                      itemLayout="horizontal"
                      size="large"
                      dataSource={clickedNodeInformation.relatedCti}
                      renderItem={(item, index) => (
                        <List.Item className="list-item-hover">
                          <List.Item.Meta
                            prefixCls="1"
                            title={
                              <a href={'/cti/show/detail/' + item.id} target="_blank">
                                {item.title?.length >= 30
                                  ? item.title.substring(0, 30) + '...'
                                  : item.title}
                              </a>
                            }
                            description={
                              <div>
                                <Descriptions
                                  items={[
                                    {
                                      key: '1',
                                      label: '实体总数',
                                      span: 3,
                                      children: item.entityNum,
                                    },
                                    {
                                      key: '2',
                                      label: 'SDO总数',
                                      span: 3,
                                      children: item.sdoNum,
                                    },
                                    {
                                      key: '3',
                                      label: 'SCO总数',
                                      span: 3,
                                      children: item.scoNum,
                                    },
                                    {
                                      key: '4',
                                      label: '是否已构图',
                                      span: 3,
                                      children:
                                        item.hasGraph === 1 ? (
                                          <Tag icon={<CheckCircleOutlined />} color="success">
                                            已构图
                                          </Tag>
                                        ) : (
                                          <Tag icon={<CloseCircleOutlined />} color="error">
                                            未构图
                                          </Tag>
                                        ),
                                    },
                                  ]}
                                />
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ),
                },
              ]}
            />
          </div>
        </Drawer>
        <div ref={graphRef} id="container" style={{ width: '100%', height: '750px' }}></div>
        <div className="graph_view" style={{ position: 'absolute', right: '20px' }}>
          <img
            src="/graphicon/boost.svg"
            alt=""
            width="30"
            className="boost"
            // onClick={() => boost()}
          />
          <img
            src="/graphicon/zoom.svg"
            alt=""
            width="30"
            className="zoom"
            // onClick={() => zoom()}
          />
          <img
            src="/graphicon/expand.svg"
            alt=""
            width="30"
            className="expand"
            // onClick={() => expand()}
          />
        </div>
      </div>
    </>
  );
};

export default CtiGraph;
