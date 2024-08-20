import CreateModal from '@/pages/Admin/User/components/CreateModal';
import { deleteCtiByCtiIdUsingPost, getCtiByPageUsingPost } from '@/services/backend/ctiController';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Col, message, Row, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 用户管理页面
 *
 * @constructor
 */
const CtiInformationPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.CtiVo) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteCtiByCtiIdUsingPost({
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
  const columns: ProColumns<API.CtiVo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '情报名称',
      dataIndex: 'title',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '实体总数',
      dataIndex: 'entityNum',
      valueType: 'text',
      fieldProps: {
        width: 32,
      },
      hideInForm: true,
    },
    {
      title: '域对象数量',
      dataIndex: 'sdoNum',
      valueType: 'text',
      fieldProps: {
        width: 32,
      },
    },
    {
      title: '可观测对象数量',
      dataIndex: 'scoNum',
      valueType: 'text',
      fieldProps: {
        width: 32,
      },
      hideInForm: true,
    },
    {
      title: '是否已构图',
      dataIndex: 'hasGraph',
      render: (value) =>
        value === 1 ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            已构图
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            未构图
          </Tag>
        ),
      hideInForm: true,
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
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer>
          <ProTable<API.CtiVo>
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
                  setCreateModalVisible(true);
                }}
              >
                <PlusOutlined /> 新建
              </Button>,
            ]}
            request={async (params, sort, filter) => {
              const sortField = Object.keys(sort)?.[0];
              const sortOrder = sort?.[sortField] ?? undefined;

              const { data, code } = await getCtiByPageUsingPost({
                ...params,
                sortField,
                sortOrder,
                ...filter,
              } as API.CtiQueryRequest);

              return {
                success: code === 0,
                data: data?.records || [],
                total: Number(data?.total) || 0,
              };
            }}
            columns={columns}
          />
          <CreateModal
            visible={createModalVisible}
            columns={columns}
            onSubmit={() => {
              setCreateModalVisible(false);
              actionRef.current?.reload();
            }}
            onCancel={() => {
              setCreateModalVisible(false);
            }}
          />
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiInformationPage;
