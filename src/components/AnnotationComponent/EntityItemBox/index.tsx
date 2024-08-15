import EntityItem from '@/components/AnnotationComponent/EntityItem';
import '@umijs/max';
import React, { useEffect, useState } from 'react';

interface Props {
  itemList: Array<API.Item>;
  currentCtiText: string;
  currentEntityList: Array<API.CtiChunk>;
}

const EntityItemBox: React.FC<Props> = (props) => {
  const { itemList, currentCtiText, currentEntityList } = props;

  const getLabelDict = () => {
    const obj = {};
    for (const label of props.itemList) {
      // @ts-ignore
      obj[label.id] = label;
    }
    return obj;
  };

  // 第一步，拿到CTI数据之后前端进行给实体排序
  const getSortedEntities = () => {
    return props.currentEntityList.slice().sort((a, b) => a.startOffset - b.startOffset);
  };

  // 第二步：这里是为了将文章数据进行分开
  const getChunkList = () => {
    const labelDict = getLabelDict();
    const sortedEntities = getSortedEntities();
    const chunkList: ChunkType[] = [];
    let startOffset = 0;
    for (const entity of sortedEntities) {
      // 将文本进行分块，sortedEntities中都是有实体的标注的文本信息
      chunkList.push({
        label: null,
        color: null,
        text: props.currentCtiText.slice(startOffset, entity.startOffset),
      });
      startOffset = entity.endOffset;

      // @ts-ignore
      const label = labelDict[entity.itemId];
      chunkList.push({
        id: entity.id,
        label: label.itemName,
        color: label.backgroundColor,
        text: props.currentCtiText.slice(entity.startOffset, entity.endOffset),
      });
    }
    chunkList.push({
      label: null,
      color: null,
      text: props.currentCtiText.slice(startOffset, props.currentCtiText.length),
    });
    // @ts-ignore
    return chunkList;
  };

  return (
    <div className="highlight-container highlight-container--bottom-labels">
      {getChunkList().map((chunk: ChunkType, i) => (
        <EntityItem key={i} text={chunk.text} label={chunk.label} color={chunk.color} />
      ))}
      )
    </div>
  );
};
export default EntityItemBox;
