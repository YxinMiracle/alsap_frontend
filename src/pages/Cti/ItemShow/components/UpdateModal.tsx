import { updateItemUsingPost } from '@/services/backend/itemController';
import { ProColumns } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, ColorPicker, Form, Input, message, Modal, Select } from 'antd';
import { FormProps } from 'antd/lib';
import React from 'react';

interface Props {
  oldData?: API.ItemVo;
  visible: boolean;
  columns: ProColumns<API.ItemVo>[];
  isAdmin: boolean;
  onSubmit: (values: API.Item_) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.Item_) => {
  const hide = message.loading('正在更新');
  try {
    await updateItemUsingPost(fields);
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
  const { oldData, visible, columns, isAdmin, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  const onFinish: FormProps<API.Item_>['onFinish'] = async (values) => {
    console.log(values);
    const success = await handleUpdate({
      ...values,
      itemType: values.itemType ?? oldData.itemType,
      itemName: values.itemName ?? oldData.itemName,
      itemContent: values.itemContent ?? oldData.itemContent,
      itemTypeContent: values.itemTypeContent ?? oldData.itemTypeContent,
      textColor: values.textColor ?? oldData.textColor,
      backgroundColor: values.backgroundColor ?? oldData.backgroundColor,
      id: oldData.id as any,
    });
    if (success) {
      onSubmit?.(values);
    }
  };

  const onFinishFailed: FormProps<API.Item_>['onFinishFailed'] = (errorInfo) => {
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
        <Form.Item<API.Item_>
          label="实体名称"
          name="itemName"
          rules={[{ max: 80, message: 'to long!!' }]}
        >
          <Input disabled={!isAdmin} defaultValue={oldData.itemName} />
        </Form.Item>

        <Form.Item<API.Item_>
          label="内容描述"
          name="itemContent"
          rules={[{ max: 80, message: 'to long!!' }]}
        >
          <Input disabled={!isAdmin} defaultValue={oldData.itemContent} />
        </Form.Item>

        <Form.Item<API.Item_> label="实体类型" name="itemType">
          <Select disabled={!isAdmin} defaultValue={oldData.itemType}>
            <Select.Option value={1}>SDO</Select.Option>
            <Select.Option value={2}>SCO</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item<API.Item_> label="实体类型" name="itemTypeContent">
          <Select
            disabled={!isAdmin}
            defaultValue={oldData.itemTypeContent}
            placeholder="请选择实体描述"
            options={[
              { value: 'STIX Cyber-observable Object', label: 'STIX Cyber-observable Object' },
              { value: 'STIX Domain Object', label: 'STIX Domain Object' },
            ]}
          ></Select>
        </Form.Item>

        <Form.Item<API.Item_>
          label="背景颜色"
          name="backgroundColor"
          getValueFromEvent={(color) => {
            return color.toHexString();
          }}
        >
          <ColorPicker
            disabled={!isAdmin}
            onChange={(value, hex: string) => {
              return value.toHexString();
            }}
            onChangeComplete={(color) => color.toHexString()}
            defaultValue={oldData.backgroundColor}
            showText
          />
        </Form.Item>

        <Form.Item<API.Item_>
          label="字体颜色"
          name="textColor"
          getValueFromEvent={(color) => {
            return color.toHexString();
          }}
        >
          <ColorPicker
            disabled={!isAdmin}
            onChange={(value, hex: string) => {
              return value.toHexString();
            }}
            onChangeComplete={(color) => color.toHexString()}
            defaultValue={oldData.textColor}
            showText
          />
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
