import {
  RULE_FILE_RESULT_ENUM,
  RULE_LLM_RESULT_ENUM,
  RULE_TYPE_ENUM,
} from '@/constants/ruleType/RuleEnum';
import '@/pages/Cti/Detail/style/detailPageStyle.css';
import {
  createRuleUsingPost,
  downloadRuleByIdUsingGet,
  getRuleByCtiIdUsingPost,
  removeRuleByRuleIdUsingPost,
} from '@/services/backend/ruleController';
// @ts-ignore
import { saveAs } from 'file-saver';
import moment from 'moment';

import { COS_HOST } from '@/constants';
import ACCESS_ENUM from '@/constants/access/accessEnum';
import { useModel } from '@@/exports';
import {
  DeleteFilled,
  DownloadOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import '@umijs/max';
import { Button, Card, Col, Empty, message, Modal, Row, Spin, Tag, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactJson from 'react-json-view';

const { confirm } = Modal;

const { Title } = Typography;

interface Props {
  id: number;
}

const CtiDetailDefencePage: React.FC<Props> = (props: Props) => {
  const { id } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yaraRules, setYaraRules] = useState([]);
  const [snortRules, setSnortRules] = useState([]);
  const [yaraShowRule, setYaraShowRule] = useState({});
  const intervalYaraRuleIdRef = useRef(null);
  const intervalSnortRuleIdRef = useRef(null);

  // 用户相关
  const { initialState } = useModel('@@initialState');
  // @ts-ignore
  const currentUser = initialState.currentUser || {};
  const [isAdmin] = useState<boolean>(currentUser.userRole === ACCESS_ENUM.ADMIN);

  // 加载规则
  const initRules = async (ruleType: string) => {
    try {
      const res = await getRuleByCtiIdUsingPost({
        ctiId: id,
        ruleName: ruleType,
      });
      if (res.code === 0 && res.data) {
        if (res.data.length === 0) {
          return true; // 停止轮询
        }
        if (ruleType === RULE_TYPE_ENUM.YARA_RULE) {
          // @ts-ignore
          setYaraRules(res.data);
        }
        if (ruleType === RULE_TYPE_ENUM.SNORT_RULE) {
          // @ts-ignore
          setSnortRules(res.data);
        }
        // 检查是否需要继续轮询
        return res.data.every((rule) => rule.llmStatus === 3 && rule.ruleFileStatus === 2);
      }
    } catch (e: any) {
      message.error(e.message ?? '获取规则出错');
    }
    return false; // 默认返回false以继续轮询
  };

  // 加载yara规则(定时)
  const fetchYaraRules = async () => {
    const shouldStop = await initRules(RULE_TYPE_ENUM.YARA_RULE);
    if (shouldStop) {
      // @ts-ignore
      clearInterval(intervalYaraRuleIdRef.current);
      intervalYaraRuleIdRef.current = null;
    } else {
      if (!intervalYaraRuleIdRef.current) {
        // @ts-ignore
        clearInterval(intervalYaraRuleIdRef.current); // 确保清理
        // @ts-ignore
        intervalYaraRuleIdRef.current = setInterval(fetchYaraRules, 5000);
      }
    }
  };

  // 加载snort规则(定时)
  const fetchSnortRules = async () => {
    const shouldStop = await initRules(RULE_TYPE_ENUM.SNORT_RULE);
    if (shouldStop) {
      // @ts-ignore
      clearInterval(intervalSnortRuleIdRef.current);
      intervalSnortRuleIdRef.current = null;
    } else {
      if (!intervalSnortRuleIdRef.current) {
        // @ts-ignore
        clearInterval(intervalSnortRuleIdRef.current); // 确保清理
        // @ts-ignore
        intervalSnortRuleIdRef.current = setInterval(fetchSnortRules, 5000);
      }
    }
  };

  // 初始化规则
  useEffect(() => {
    fetchYaraRules(); // 立即执行一次
    fetchSnortRules(); // 立即执行一次
    return () => {
      if (intervalYaraRuleIdRef.current) {
        clearInterval(intervalYaraRuleIdRef.current); // 清除定时器
      }
      if (intervalSnortRuleIdRef.current) {
        clearInterval(intervalSnortRuleIdRef.current); // 清除定时器
      }
    };
  }, []);

  // 删除规则确认框
  const deleteConfirm = (ruleName: string, ruleId: number, ruleType: string) => {
    confirm({
      title: '删除提醒',
      icon: <ExclamationCircleFilled />,
      content: `你确定你要删除 ${ruleName} 规则吗？`,
      async onOk() {
        // 开始删除规则
        const res = await removeRuleByRuleIdUsingPost({
          ruleId: ruleId,
        });
        if (res.code === 0) {
          initRules(ruleType);
          message.success('删除成功');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showModal = (llmResult: string) => {
    setYaraShowRule(JSON.parse(llmResult) ?? '{}');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 根据id下载规则
  const downloadRuleFile = async (ruleId: number, filePath: string) => {
    const blob = await downloadRuleByIdUsingGet(
      // @ts-ignore
      { id: ruleId },
      {
        responseType: 'blob',
      },
    );
    const fullPath = COS_HOST + filePath;
    saveAs(blob, fullPath.substring(fullPath.lastIndexOf('/') + 1));
  };

  const getActions = (
    ruleId: number,
    llmResult: string,
    filePath: string,
    ruleName: string,
    ruleType: string,
  ) => {
    // 基础操作数组
    const actions = [
      <div key="view" onClick={() => showModal(llmResult)}>
        <EyeOutlined /> 查看规则
      </div>,
      <div key="download" onClick={() => downloadRuleFile(ruleId, filePath)}>
        <DownloadOutlined /> 下载规则
      </div>,
    ];

    // 如果是管理员，添加删除操作
    if (isAdmin) {
      actions.push(
        <div key="delete" onClick={() => deleteConfirm(ruleName, ruleId, ruleType)}>
          <DeleteFilled /> 删除规则
        </div>,
      );
    }

    return actions;
  };

  // 创建规则执行的逻辑
  const doCreateRule = async (ruleType: string) => {
    try {
      const res = await createRuleUsingPost({
        processRuleName: ruleType,
        ctiId: id,
      });
      if (res.code === 0) {
        message.success('创建规则成功');
        if (ruleType === RULE_TYPE_ENUM.YARA_RULE) {
          // 在创建规则后重新触发数据获取，同时保证不重复创建定时器
          // @ts-ignore
          clearInterval(intervalYaraRuleIdRef.current); // 清除现有定时器
          intervalYaraRuleIdRef.current = null; // 更新 ref
          fetchYaraRules(); // 立即获取一次数据
        }
        if (ruleType === RULE_TYPE_ENUM.SNORT_RULE){
          // @ts-ignore
          clearInterval(intervalSnortRuleIdRef.current); // 清除现有定时器
          intervalSnortRuleIdRef.current = null; // 更新 ref
          fetchSnortRules(); // 立即获取一次数据
        }
      }
    } catch (e: any) {
      message.error(e.message ?? '创建Yara规则出错');
    }
  };

  const truncate = (text: string, maxLength: number) => {
    // 确保传入的text是字符串并且maxLength是有效值
    if (text && maxLength > 0) {
      // 如果文本长度超过最大长度，则截断并添加省略号
      return text.length > maxLength ? text.substring(0, maxLength) + '..' : text;
    }
    return text;
  };

  // @ts-ignore
  return (
    <div className="detail-page-defence">
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex' }}>
          <Title level={4}>本地入侵检测系统Yara规则</Title>
          {isAdmin && (
            <Button
              color="primary"
              variant="dashed"
              icon={<ReloadOutlined />}
              style={{ marginLeft: 16 }}
              autoInsertSpace
              onClick={() => {
                doCreateRule(RULE_TYPE_ENUM.YARA_RULE);
              }}
            >
              刷新Yara规则
            </Button>
          )}
        </div>
        {/*弹出框*/}

        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <div>
            <ReactJson src={yaraShowRule} />
          </div>
        </Modal>
        {/*本地入侵检测系统Yara规则存放的位置*/}
        {yaraRules.length === 0 ? (
          <Card>
            <Empty />
          </Card>
        ) : (
          <div style={{ marginTop: 16 }}>
            <Row gutter={16}>
              {yaraRules.map((chunk: API.CtiRules, i) => (
                <Col xs={24} sm={24} md={12} xl={{ span: 6 }} key={i}>
                  <Card
                    className="rule-card"
                    actions={getActions(
                      chunk.id!,
                      chunk.llmResult!,
                      chunk.filePath!,
                      chunk.ruleName!,
                      RULE_TYPE_ENUM.YARA_RULE,
                    )}
                    hoverable
                  >
                    <Card.Meta
                      title={chunk.llmStatus!==4 ? (chunk.ruleName ? i + 1 + '. ' + chunk.ruleName : '加载中..') : "失败规则"}
                      description={
                        <>

                          <p>规则描述： {chunk.llmStatus!==4 ? (truncate(chunk.ruleDescription!, 70) ?? <Spin></Spin>) : "失败规则"}</p>
                          <p>最新修改时间：{moment(chunk.updateTime).format('YYYY-MM-DD HH:mm')}</p>
                          <p>
                            响应状态：
                            <Tag color={RULE_LLM_RESULT_ENUM[chunk.llmStatus as number].color}>
                              {RULE_LLM_RESULT_ENUM[chunk.llmStatus as number].text}
                            </Tag>
                          </p>
                          <p>
                            规则文件状态：
                            <Tag
                              color={RULE_FILE_RESULT_ENUM[chunk.ruleFileStatus as number].color}
                            >
                              {RULE_FILE_RESULT_ENUM[chunk.ruleFileStatus as number].text}
                            </Tag>
                          </p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
      {/*===============================上下分割线======================================*/}
      <div>
        <div style={{ display: 'flex' }}>
          <Title level={4}>网络入侵检测系统Snort规则</Title>
          {isAdmin && (
            <Button
              color="primary"
              variant="dashed"
              icon={<ReloadOutlined />}
              style={{ marginLeft: 16 }}
              autoInsertSpace
              onClick={() => {
                doCreateRule(RULE_TYPE_ENUM.SNORT_RULE);
              }}
            >
              刷新Snort规则
            </Button>
          )}
        </div>
        {/*网络入侵检测系统Snort规则存放位置*/}
        {snortRules.length === 0 ? (
          <Card>
            <Empty />
          </Card>
        ) : (
          <div style={{ marginTop: 16 }}>
            <Row gutter={16}>
              {snortRules.map((chunk: API.CtiRules, i) => (
                <Col xs={24} sm={24} md={12} xl={{ span: 6 }} key={i}>
                  <Card
                    className="rule-card"
                    actions={getActions(
                      // @ts-ignore
                      chunk.id,
                      chunk.llmResult,
                      chunk.filePath,
                      chunk.ruleName,
                      RULE_TYPE_ENUM.SNORT_RULE,
                    )}
                    hoverable
                  >
                    <Card.Meta
                      title={chunk.ruleName ? i + 1 + '. ' + chunk.ruleName : '加载中..'}
                      description={
                        <>
                          <p>规则描述： {truncate(chunk.ruleDescription!, 70) ?? <Spin></Spin>}</p>
                          <p>最新修改时间：{moment(chunk.updateTime).format('YYYY-MM-DD HH:mm')}</p>
                          <p>
                            响应状态：
                            <Tag color={RULE_LLM_RESULT_ENUM[chunk.llmStatus as number].color}>
                              {RULE_LLM_RESULT_ENUM[chunk.llmStatus as number].text}
                            </Tag>
                          </p>
                          <p>
                            规则文件状态：
                            <Tag
                              color={RULE_FILE_RESULT_ENUM[chunk.ruleFileStatus as number].color}
                            >
                              {RULE_FILE_RESULT_ENUM[chunk.ruleFileStatus as number].text}
                            </Tag>
                          </p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};
export default CtiDetailDefencePage;
