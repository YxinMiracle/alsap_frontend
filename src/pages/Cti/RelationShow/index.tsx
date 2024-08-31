import JsxGraph from '@/components/GraphComponent/JsxGraph';
import ACCESS_ENUM from '@/constants/access/accessEnum';
import UpdateModal from '@/pages/Cti/RelationShow/components/UpdateModal';
import { getAllItemMapDataUsingGet } from '@/services/backend/itemController';
import {
  getRelationTypeByPageUsingPost,
  getRelationTypeNameListUsingGet,
} from '@/services/backend/relationTypeController';
import { useModel } from '@@/exports';
import { TagOutlined, TagsOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Col, FloatButton, message, Row, Select, Space, Tag, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

/**
 * STIX实体信息管理界面
 * @constructor
 */
const CtiRelationInformationPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ItemVo>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState.currentUser || {};
  const [isAdmin, setIsAdmin] = useState<boolean>(currentUser.userRole === ACCESS_ENUM.ADMIN);
  const [itemIdAndNameList, setItemIdAndNameList] = useState({ sdo: [], sco: [] });
  const [relationTypeNameList, setRelationTypeNameList] = useState([]);

  /**
   * 根据itemType的值去获取对应的背景颜色
   * @param itemType
   */
  const getColorByItemType = (itemType: number) => {
    if (itemType === 1) {
      return '#a6e177';
    } else {
      return '#acd5f1';
    }
  };

  /**
   * 根据itemType的值去返回他是属于SDO还是输入SCO
   * @param itemType
   */
  const getItemTypeName = (itemType: number): string => {
    return itemType === 1 ? 'SDO' : 'SCO';
  };

  /**
   * 初始化Item的数据
   */
  const initItemMapData = async () => {
    try {
      const res = await getAllItemMapDataUsingGet();
      if (res.code === 0) {
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

  const initRelationTypeNameList = async () => {
    try {
      const res = await getRelationTypeNameListUsingGet();
      const processedRelationTypeNameList: any[] = [];
      if (res.code === 0) {
        res.data.forEach((relationTypeName: string) => {
          processedRelationTypeNameList.push({
            value: relationTypeName,
            label: relationTypeName,
          });
        });
        setRelationTypeNameList(processedRelationTypeNameList);
      }
    } catch (e: any) {
      message.error('关系名称列表获取错误');
    }
  };

  const getTaleLineData = (
    startItemName: string,
    startItemType: number,
    relationName: string,
    endItemName: string,
    endItemType: number,
  ) => {
    return {
      nodes: [
        {
          x: 180,
          y: 150,
          label: getItemTypeName(startItemType),
          color: getColorByItemType(startItemType),
          meta: {
            itemName: startItemName,
          },
          id: 'node1',
          type: 'rect-jsx',
        },
        {
          x: 400,
          y: 150,
          label: getItemTypeName(endItemType),
          color: getColorByItemType(endItemType),
          meta: {
            itemName: endItemName,
          },
          id: 'node2',
          type: 'rect-jsx',
        },
      ],
      edges: [{ source: 'node1', target: 'node2', label: relationName }],
    };
  };

  useEffect(() => {
    initItemMapData();
    initRelationTypeNameList();
  }, []);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.RelationTypeVo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '头实体名称',
      dataIndex: 'startItemName',
      valueType: 'text',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '头实体Id',
      dataIndex: 'startItemId',
      valueType: 'text',
      align: 'center',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return (
          <Select
            showSearch
            placeholder="请选择头实体名称"
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
      hideInTable: true
    },
    {
      title: '头实体类型',
      dataIndex: 'startItemType',
      valueType: 'text',
      align: 'center',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return (
          <Select
            placeholder="请选择头实体类型"
            options={[
              { value: 1, label: 'SDO' },
              { value: 2, label: 'SCO' },
            ]}
          ></Select>
        );
      },
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
      title: '关系名称',
      dataIndex: 'relationName',
      valueType: 'text',
      align: 'center',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return (
          <Select
            showSearch
            placeholder="请选择关系类型"
            filterOption={(input, option) =>
              String(option?.label).toLowerCase().includes(input.toLowerCase())
            }
            options={relationTypeNameList}
          ></Select>
        );
      },
    },
    {
      title: '尾实体名称',
      dataIndex: 'endItemName',
      valueType: 'text',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '尾实体名称Id',
      dataIndex: 'endItemId',
      valueType: 'text',
      align: 'center',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return (
          <Select
            showSearch
            placeholder="请选择尾实体名称"
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
      hideInTable: true
    },
    {
      title: '尾实体类型',
      dataIndex: 'endItemType',
      valueType: 'text',
      align: 'center',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return (
          <Select
            placeholder="请选择尾实体类型"
            options={[
              { value: 1, label: 'SDO' },
              { value: 2, label: 'SCO' },
            ]}
          ></Select>
        );
      },
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
      title: '关系图形展示',
      dataIndex: 'graphShow',
      align: 'center',
      render: (_, record) => (
        <JsxGraph
          tagId={String(record.id)}
          data={getTaleLineData(
            record.startItemName,
            record.startItemType,
            record.relationName,
            record.endItemName,
            record.endItemType,
          )}
        ></JsxGraph>
      ),
      hideInSearch: true,
      hideInForm: true,
      width: 400,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          {isAdmin && (
            <Typography.Link
              onClick={() => {
                setCurrentRow(record);
                setUpdateModalVisible(true);
              }}
            >
              修改
            </Typography.Link>
          )}
          {!isAdmin && (
            <Typography.Link
              onClick={() => {
                setCurrentRow(record);
                setUpdateModalVisible(true);
              }}
            >
              查看
            </Typography.Link>
          )}
        </Space>
      ),
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer>
          <ProTable<API.RelationTypeVo>
            headerTitle={'查询表格'}
            actionRef={actionRef}
            rowKey="key"
            bordered
            search={{
              labelWidth: 120,
            }}
            request={async (params, sort, filter) => {
              // @ts-ignore
              const res = await getRelationTypeByPageUsingPost({
                ...params,
                ...filter,
              } as API.RelationTypeQueryRequest);

              if (res.code !== 0) {
                message.error(res.message ?? '关系数据请求失败');
              }

              return {
                success: res.code === 0,
                data: res.data?.records || [],
                total: Number(res.data?.total) || 0,
              };
            }}
            columns={columns}
          />
          <UpdateModal
            visible={updateModalVisible}
            columns={columns}
            oldData={currentRow}
            isAdmin={isAdmin}
            itemIdAndNameList={itemIdAndNameList}
            relationTypeNameList={relationTypeNameList}
            onSubmit={() => {
              setUpdateModalVisible(false);
              setCurrentRow(undefined);
              actionRef.current?.reload();
            }}
            onCancel={() => {
              setUpdateModalVisible(false);
            }}
          />
          <FloatButton.BackTop />
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiRelationInformationPage;
