import { useModel } from '@@/exports';
import G6 from '@antv/g6';
import '@umijs/max';
import React, { useEffect, useRef } from 'react';

interface Props {
  data: any;
  tagId: string;
}

const JsxGraph: React.FC<Props> = (props: Props) => {
  const { data, tagId } = props;

  const ref = useRef(null);

  const { initialState } = useModel('@@initialState');

  /**
   * 根据系统当前的主题设定对应的背景颜色和字体颜色
   */
  const setGraphTheme = () => {
    // 根据 navTheme 设置 fill 的颜色
    // @ts-ignore
    const navTheme = initialState.settings.navTheme;
    const fill = navTheme === 'light' ? 'rgba(0, 0, 0, 0.88)' : 'rgba(255, 255, 255, 0.85)';
    data.edges.forEach((edge: any) => {
      edge.labelCfg = {
        refY: '7',
        style: {
          fill: fill,
          fontSize: '14',
        },
      };
    });
  };

  /**
   * 初始化图的样式
   */
  const graphRegisterNode = () => {
    // 根据 navTheme 设置 fill 的颜色
    // @ts-ignore
    const navTheme = initialState.settings.navTheme;
    const fontFill = navTheme === 'light' ? '#000' : '#DDDDDD';
    const backgroundFill = navTheme === 'light' ? '#ffffff' : '#1D1D1D';
    G6.registerNode(
      'rect-jsx',
      (cfg) => `
    <group>
      <rect>
        <rect style={{
          width: 150,
          height: 20,
          fill: ${cfg.color},
          radius: [6, 6, 0, 0],
          cursor: 'move',
          stroke: ${cfg.color}
        }} draggable="true">
          <text style={{
            marginTop: 2,
            marginLeft: 75,
            textAlign: 'center',
            fontWeight: 'bold',
            fill: '#fff' }}>{{label}}</text>
        </rect>
        <rect style={{
          width: 150,
          height: 55,
          stroke: ${cfg.color},
          fill: ${backgroundFill},
          radius: [0, 0, 6, 6],
        }}>
          <text style={{ marginTop: 10, marginLeft: 3,fill: ${fontFill}, marginLeft: 4 }}>实体名称: {{meta.itemName}}</text>
        </rect>
      </rect>
    </group>`,
    );
  };
  // @ts-ignore
  useEffect(() => {
    if (ref.current) {
      setGraphTheme();
      graphRegisterNode();
      const container = ref.current;
      const graph = new G6.Graph({
        container: container,
        width: 400,
        height: 100,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        modes: {
          default: ['drag-node', 'zoom-canvas'],
        },
      });
      graph.data(data);
      graph.render();
      // 返回清理函数
      return () => {
        graph.destroy(); // 销毁图表实例
      };
    }
  }, [data]); // 依赖项数组中包括data，确保数据更新时可以重新渲染

  return (
    <>
      <div ref={ref} id={tagId}></div>
    </>
  );
};
export default JsxGraph;
