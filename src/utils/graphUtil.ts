import _ from 'lodash';

export const GraphUtils = () => {
  //@ts-ignore
  const listLoop = (graphdata) => {
    let graphMap = { nodes: [], edges: [] };
    //@ts-ignore
    graphdata.forEach((item) => {
      //@ts-ignore
      graphMap.nodes.push({
        ...item.startNode,
        id: String(item.startNode?.nodeId),
        size: 55,
        label: item.startNode?.entityName,
        oldlabel: item.startNode?.entityName,
      });
      //@ts-ignore
      graphMap.nodes.push({
        ...item.endNode,
        id: String(item.endNode?.nodeId),
        size: 55,
        label: item.endNode?.entityName,
        oldlabel: item.endNode?.entityName,
      });
      if (String(item.endNode?.nodeId) !== 'undefined') {
        //@ts-ignore
        graphMap.edges.push({
          ...item.relation,
          source: String(item.startNode?.nodeId),
          target: String(item.endNode?.nodeId),
          label: item.relation?.relationName,
        });
      }
    });

    // 去重和整理节点
    graphMap.nodes = _.uniqBy(graphMap.nodes, 'id');

    // 处理边，合并重复项，并分配曲线偏移
    const edgesGroupedBySource = _.groupBy(graphMap.edges, 'source');
    graphMap.edges = [];
    //@ts-ignore
    Object.entries(edgesGroupedBySource).forEach(([, edges]) => {
      const targetCounts = {};
      edges.forEach((edge) => {
        //@ts-ignore
        targetCounts[edge.target] = (targetCounts[edge.target] || 0) + 1;
        //@ts-ignore
        edge.curveOffset = -30 * targetCounts[edge.target];
        graphMap.edges.push(edge);
      });
    });

    return graphMap;
  };

  return { listLoop };
};

export default GraphUtils;
