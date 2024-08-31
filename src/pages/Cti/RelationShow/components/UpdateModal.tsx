import { updateRelationTypeUsingPost } from '@/services/backend/relationTypeController';
import { ProColumns } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Form, message, Modal, Select } from 'antd';
import { FormProps } from 'antd/lib';
import React from 'react';

interface Props {
  oldData?: API.RelationTypeVo;
  visible: boolean;
  columns: ProColumns<API.RelationTypeVo>[];
  isAdmin: boolean;
  itemIdAndNameList: {sdo:[], sco:[]};
  relationTypeNameList: [];
  onSubmit: (values: API.RelationTypeVo) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.RelationTypeVo) => {
  const hide = message.loading('正在更新');
  try {
    await updateRelationTypeUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const {
    oldData,
    visible,
    columns,
    isAdmin,
    itemIdAndNameList,
    relationTypeNameList,
    onSubmit,
    onCancel,
  } = props;

  if (!oldData) {
    return <></>;
  }

  const onFinish: FormProps<API.RelationTypeVo>['onFinish'] = async (values) => {
    console.log({
      startItemId: values.startItemId ?? oldData.startItemId,
      relationName: values.relationName ?? oldData.relationName,
      endItemId: values.endItemId ?? oldData.endItemId,
      id: oldData.id,
    });
    const success = await handleUpdate({
      startItemId: values.startItemId ?? oldData.startItemId,
      relationName: values.relationName ?? oldData.relationName,
      endItemId: values.endItemId ?? oldData.endItemId,
      id: oldData.id,
    });
    if (success) {
      onSubmit?.(values);
    }
  };

  const onFinishFailed: FormProps<API.RelationTypeVo>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form
        name="basic"
        style={{ marginTop: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<API.RelationTypeVo> label="头实体名称" name="startItemId">
          <Select
            showSearch
            placeholder="请选择头实体名称"
            disabled={!isAdmin}
            defaultValue={oldData.startItemId}
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
        </Form.Item>

        <Form.Item<API.RelationTypeVo> label="关系名称" name="relationName">
          <Select
            disabled={!isAdmin}
            placeholder="请选择关系类型"
            defaultValue={oldData.relationName}
            options={relationTypeNameList}
          ></Select>
        </Form.Item>

        <Form.Item<API.RelationTypeVo> label="尾实体名称" name="endItemId">
          <Select
            showSearch
            placeholder="请选择尾实体名称"
            disabled={!isAdmin}
            defaultValue={oldData.startItemId}
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
        </Form.Item>

        {isAdmin && (
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
export default UpdateModal;
