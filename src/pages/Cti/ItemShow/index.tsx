import ACCESS_ENUM from '@/constants/access/accessEnum';
import UpdateModal from '@/pages/Cti/ItemShow/components/UpdateModal';
import {
  deleteItemByItemIdUsingPost,
  getItemByPageUsingPost,
} from '@/services/backend/itemController';
import { useModel } from '@@/exports';
import { TagOutlined, TagsOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import '@umijs/max';
import {
  Col,
  ColorPicker,
  FloatButton,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useRef, useState } from 'react';

/**
 * STIX实体信息管理界面
 * @constructor
 */
const CtiItemInformationPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ItemVo>();
  const { initialState, setInitialState } = useModel('@@initialState');
  // @ts-ignore
  const currentUser = initialState.currentUser || {};
  const [isAdmin, setIsAdmin] = useState<boolean>(currentUser.userRole === ACCESS_ENUM.ADMIN);

  /**
   * 删除逻辑
   * @param row
   */
  const handleDelete = async (row: API.ItemVo) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteItemByItemIdUsingPost({
        id: row.id as any,
      });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.ItemVo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '实体名称',
      dataIndex: 'itemName',
      valueType: 'text',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return <Input placeholder="请输入实体名称" />;
      },
    },
    {
      title: '实体描述',
      dataIndex: 'itemContent',
      valueType: 'text',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return <Input placeholder="请输入实体描述" />;
      },
    },
    {
      title: '实体描述',
      dataIndex: 'itemTypeContent',
      valueType: 'text',
      filters: [
        {
          text: 'Cyber-observable Object',
          value: 'Cyber-observable Object',
        },
        {
          text: 'Domain Object',
          value: 'Domain Object',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      // @ts-ignore
      onFilter: (value, record) => {
        return record?.itemTypeContent?.endsWith(value as string);
      },
      renderFormItem(schema) {
        // @ts-ignore
        return (
          <Select
            placeholder="请选择实体描述"
            options={[
              { value: 'Cyber-observable Object', label: 'Cyber-observable Object' },
              { value: 'Domain Object', label: 'Domain Object' },
            ]}
          ></Select>
        );
      },
    },
    {
      title: '实体类型',
      dataIndex: 'itemType',
      renderFormItem: (_, { type, defaultRender }, form) => {
        // @ts-ignore
        return (
          <Select
            placeholder="请选择实体类型"
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
      title: '实体背景颜色',
      dataIndex: 'backgroundColor',
      // @ts-ignore
      render: (value) => <ColorPicker defaultValue={value} showText disabled />,
      hideInSearch: true,
    },
    {
      title: '实体字体颜色',
      dataIndex: 'textColor',
      // @ts-ignore
      render: (value) => <ColorPicker defaultValue={value} showText disabled />,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
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
          {isAdmin && (
            <Typography.Link type="danger" onClick={() => handleDelete(record)}>
              删除
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
          <ProTable<API.ItemVo>
            headerTitle={'查询表格'}
            actionRef={actionRef}
            rowKey="key"
            search={{
              labelWidth: 120,
            }}
            request={async (params, sort, filter) => {
              const sortField = Object.keys(sort)?.[0];
              const sortOrder = sort?.[sortField] ?? undefined;

              // @ts-ignore
              const res = await getItemByPageUsingPost({
                ...params,
                sortField,
                sortOrder,
                ...filter,
              } as API.ItemQueryRequest);

              if (res.code !== 0) {
                message.error(res.message ?? '实体类型数据请求失败');
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
export default CtiItemInformationPage;
