import '@/components/AnnotationComponent/css/entityStyle.css';
import EntityItem from '@/components/AnnotationComponent/EntityItem';
import '@umijs/max';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {getInitialState} from "@/app";
import {useModel} from "@@/exports";

interface Props {
  itemList: API.Item[];
  currentCtiText: string;
  currentEntityList: API.CtiChunk[];
  removeEntity?: (annotationId: number) => void;
  addEntity?: (start: number, end: number, entityTypeId: number) => void;
}

const EntityItemBox: React.FC<Props> = (props) => {
  const { itemList, currentCtiText, currentEntityList, removeEntity, addEntity } = props;
  const [showItemList, setShowItemList] = React.useState<boolean>(false);
  const ref = React.useRef(null);
  const entityListRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [X, setX] = React.useState<number>(0);
  const [Y, setY] = React.useState<number>(0);
  const [entityStartIndex, setEntityStartIndex] = React.useState<number>(0);
  const [enetityEndIndex, setEntityEndIndex] = React.useState<number>(0);
  const [listBackGroundColor, setListBackGroundColor] = React.useState<string>('#fff');

  const getLabelDict = () => {
    const obj = {};
    for (const label of itemList) {
      // @ts-ignore
      obj[label.id] = label;
    }
    return obj;
  };

  // 第一步，拿到CTI数据之后前端进行给实体排序
  const getSortedEntities = () => {
    return currentEntityList.slice().sort((a, b) => a.startOffset - b.startOffset);
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
        text: currentCtiText.slice(startOffset, entity.startOffset),
      });
      startOffset = entity.endOffset;

      // @ts-ignore
      const label = labelDict[entity.itemId];
      chunkList.push({
        id: entity.id,
        label: label.itemName,
        color: label.backgroundColor,
        text: currentCtiText.slice(entity.startOffset, entity.endOffset),
      });
    }
    chunkList.push({
      label: null,
      color: null,
      text: currentCtiText.slice(startOffset, currentCtiText.length),
    });
    // @ts-ignore
    return chunkList;
  };

  // 获取所选择的子句子在整个文档中的开始位置和结束位置
  // element 表示存放整个文档的父标签对应的ref实例
  const getSelectionCharacterOffsetWithin = (element: any) => {
    const selection = window.getSelection();
    // @ts-ignore
    if (selection.rangeCount === 0) return null; // 未选择任何文本
    // @ts-ignore
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    const start = preCaretRange.toString().length;
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const end = preCaretRange.toString().length;

    return { start, end };
  };

  // 对用户选着的情况进行校验
  const validateSpan = (start: number, end: number) => {
    if (typeof start === 'undefined' || typeof end === 'undefined') {
      return false;
    }

    if (start === end) {
      return false;
    }

    for (const entity of currentEntityList) {
      // 添加不为空的条件
      if (entity.startOffset !== undefined && entity.endOffset !== undefined) {
        if (entity.startOffset <= start && start < entity.endOffset) {
          return false;
        }
        if (entity.startOffset < end && end <= entity.endOffset) {
          return false;
        }
        if (start < entity.startOffset && entity.endOffset < end) {
          return false;
        }
      }
    }

    return true;
  };

  const handleMouseDown = (e: any) => {
    if (e.button === 0) {
      // 确保是鼠标左键
      setIsDragging(true);
      // setShowItemList(false)
    }
  };

  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (entityListRef.current && !entityListRef.current.contains(event.target)) {
      setShowItemList(false);
    }
  };

  useEffect(() => {
    if (!entityListRef) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [entityListRef]);

  const { initialState } = useModel('@@initialState');

  // 判断颜色
  const getBackGroundColor = async () => {
    // @ts-ignore
    if (!initialState.settings) return;
    // @ts-ignore
    if (initialState.settings.navTheme === "light"){
      setListBackGroundColor("#fff")
    }else {
      setListBackGroundColor("#141414")
    }
  };

  // 处理鼠标松开事件
  const handleMouseUp = (e: any) => {
    if (isDragging && ref.current) {
      // @ts-ignore
      const selectedText = window.getSelection().toString();
      if (selectedText.length <= 0) return;
      // 获取选择范围
      const offsets = getSelectionCharacterOffsetWithin(ref.current);

      if (!offsets) return;

      if (!validateSpan(offsets.start, offsets.end)) {
        message.error('请勿非法选择实体');
        return;
      }

      setEntityStartIndex(offsets.start);
      setEntityEndIndex(offsets.end);

      // @ts-ignore
      const rect = ref.current.getBoundingClientRect(); // 获取 div 的边界信息

      // 获取对应的坐标
      setX((e.clientX || e.changedTouches[0].clientX) - rect.left);
      setY((e.clientY || e.changedTouches[0].clientY) - rect.top);

      getBackGroundColor()
      setShowItemList(true);
    }
  };

  const handleMouseMove = () => {
    if (isDragging) {
      // 这里可以添加更多逻辑，如果需要在用户拖拽时做些什么
    }
  };

  const subPageAddEntity = (entityTypeId: number) => {
    setShowItemList(false);
    if (validateSpan(entityStartIndex, enetityEndIndex)) {
      addEntity?.(entityStartIndex, enetityEndIndex, entityTypeId);
      setEntityStartIndex(0);
      setEntityEndIndex(0);
    }
  };

  return (
    <div
      className="highlight-container highlight-container--bottom-labels"
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {getChunkList().map((chunk: ChunkType, i) => (
        <EntityItem
          key={i}
          // @ts-ignore
          id={chunk.id}
          text={chunk.text}
          label={chunk.label}
          color={chunk.color}
          removeEntity={removeEntity}
        />
      ))}
      {showItemList && (
        <div ref={entityListRef}>
          <List
            size="large"
            bordered
            dataSource={itemList}
            className="entity-list"
            style={{
              left: `${X}px`,
              top: `${Y}px`,
              position: 'absolute',
              backgroundColor: listBackGroundColor,
            }}
            renderItem={(item) => (
              <List.Item className="entity-list-item">
                <span
                  onClick={() => subPageAddEntity(Number(item.id))}
                  style={{
                    borderLeft: `5px solid ${item.backgroundColor}`,
                    paddingLeft: `6px`,
                  }}
                >
                  {item.itemName}
                </span>
              </List.Item>
            )}
          />
        </div>
      )}
      )
    </div>
  );
};
export default EntityItemBox;
