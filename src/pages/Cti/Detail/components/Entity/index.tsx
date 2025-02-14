import '@/pages/Cti/Detail/style/detailPageStyle.css';
import '@umijs/max';
import {Button, message, Select, Tag} from 'antd';
// @ts-ignore
import PageFloatButton from '@/components/FloatButtonComponent';
import { getCtiDetailEntityDataUsingPost } from '@/services/backend/ctiController';
import { getAllItemMapDataUsingGet } from '@/services/backend/itemController';
import { ProTable, type ActionType, type ProColumns } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import {AimOutlined, PlusOutlined, TagOutlined, TagsOutlined} from "@ant-design/icons";
import {history} from "@@/core/history";

interface Props {
  id: number;
}

const CtiDetailEntityPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const actionRef = useRef<ActionType>();
  const [itemIdAndNameList, setItemIdAndNameList] = useState({ sdo: [], sco: [] });

  /**
   * 初始化Item的数据
   */
  const initItemMapData = async () => {
    try {
      const res = await getAllItemMapDataUsingGet();
      if (res.code === 0) {
        // @ts-ignore
        Object.values(res.data).forEach((item: any) => {
          if (item.itemType === 1) {
            setItemIdAndNameList((prevState: any) => ({
              ...prevState,
              sdo: [...prevState.sdo, { value: item.id, label: item.itemName }],
            }));
          } else if (item.itemType === 2) {
            setItemIdAndNameList((prevState: any) => ({
              ...prevState,
              sco: [...prevState.sco, { value: item.id, label: item.itemName }],
            }));
          }
        });
      } else {
        message.error('item数据加载失败');
      }
    } catch (e: any) {
      message.error('item数据加载失败');
    }
  };

  const request = async (params: any) => {
    const res = await getCtiDetailEntityDataUsingPost({
      entityName: params.entityName,
      itemId: params.itemId,
      ctiId: id,
    });

    console.log(params)

    if (res.code !== 0) {
      message.error(res.message ?? '情报数据请求失败');
    }

    return {
      success: res.code === 0,
      data: res?.data || [],
      total: res?.data?.length,
    };
  };

  useEffect(() => {
    initItemMapData();
  }, []);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.CtiDetailEntityVo>[] = [
    {
      title: '实体名称',
      dataIndex: 'entityName',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '实体类型',
      dataIndex: 'itemId',
      valueType: 'text',
      ellipsis: true,
      renderFormItem: () => {
        // @ts-ignore
        return (
          <Select
            showSearch
            placeholder="请选择实体名称"
            filterOption={(input, option) =>
              String(option?.label).toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                label: <span>SDO实体</span>,
                title: 'SDO',
                options: [...itemIdAndNameList.sdo],
              },
              {
                label: <span>SCO实体</span>,
                title: 'SCO',
                options: [...itemIdAndNameList.sco],
              },
            ]}
          ></Select>
        );
      },
      hideInTable: true,
    },
    {
      title: '实体类型',
      dataIndex: 'itemName',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
      render: (text,record  ) =>
        <Tag color={record.backgroundColor} style={{color: record.textColor}} bordered>
          {record.itemName}
        </Tag>
    },
    {
      title: '标签',
      dataIndex: 'itemType',
      hideInSearch: true,
      render: (value) =>
        value === 1 ? (
          <Tag icon={<TagOutlined />} color="success">
            SDO
          </Tag>
        ) : (
          <Tag icon={<TagsOutlined />} color="processing">
            SCO
          </Tag>
        ),
    },
    {
      title: '相关情报数量',
      dataIndex: 'ctiCount',
      valueType: 'text',
      hideInSearch: true,
    },

    {
      title: '实体创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '实体更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <div className="detail-entity-page">
      <ProTable<API.CtiDetailEntityVo>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              // history.push();
              window.open(`/cti/show/anno/${id}`, '_blank');
            }}
          >
            <AimOutlined /> 查看情报实体标注
          </Button>,
        ]}
        request={request}
        columns={columns}
      />
      <PageFloatButton />
    </div>
  );
};
export default CtiDetailEntityPage;
