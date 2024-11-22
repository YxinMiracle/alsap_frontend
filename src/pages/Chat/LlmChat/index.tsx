import BotChatCard from '@/pages/Chat/components/BotChat';
import UserChatCard from '@/pages/Chat/components/UserChat';
import '@/pages/Chat/LlmChat/style/llmChat.css';
import '@umijs/max';
import { Button, Card, Col, FloatButton, Input, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {BACKEND_HOST_LOCAL, BACKEND_HOST_PROD} from "@/constants";

const { TextArea } = Input;

const LlmChat: React.FC = () => {
  const [systemSent, setSystemSent] = useState<string>('');
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [singleAns, setSingleAns] = useState<string>('');
  const messagesEndRef = useRef(null);
  const [takingList, setTakingList] = useState([]);
  const isDev = process.env.NODE_ENV === 'development';

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [singleAns]); // 依赖数组里的messages，每当消息更新时，执行滚动到底部的操作

  const doSystemTextareaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSystemSent(e.target.value);
  };

  const doUserQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserQuestion(e.target.value);
  };

  // 向大模型发送消息
  const sendMsg = async (userQuestion: string) => {
    // @ts-ignore
    setTakingList((prev) => [...prev, singleAns]);
    // @ts-ignore
    setTakingList((prev) => [...prev, userQuestion]);

    setSingleAns('');

    const urlSystemPrompts = encodeURIComponent(systemSent);
    const urlUserQuestion = encodeURIComponent(userQuestion);
    const url = `${isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD}/api/llm/forward?systemPrompts=${urlSystemPrompts}&userQuestion=${urlUserQuestion}`;

    const eventSource = new EventSource(url);

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data.msg === 'process_generating') {
        setSingleAns((current) => current + data.output);
        // @ts-ignore
      } else if (data.msg === 'process_completed') {
        console.log('Completed data:', data.data);
        eventSource.close();
      }
    };

    eventSource.onerror = function (error) {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    setUserQuestion('');
  };

  return (
    <>
      <div className="chat-llm-root">
        <Row>
          <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
            <div className={'chat-body'}>
              <Card type="inner" title="System">
                <div style={{ display: 'flex', gap: '20px' }}>
                  <TextArea
                    placeholder="设置系统指令(System Prompts)"
                    onChange={doSystemTextareaChange}
                    value={systemSent}
                    allowClear
                    autoSize={{ minRows: 3, maxRows: 10 }}
                  />
                  <Button
                    type="primary"
                    size="large"
                    style={{ height: 'auto', backgroundColor: '#ECEDEF', color: '#364151' }}
                  >
                    🛠️ 设置System Prompts
                  </Button>
                </div>
              </Card>

              <div className={'chat-area-parent'}>
                <Card type="inner" title="Chat" className="margin-top-16">
                  <div className="chat-area">
                    <div className="message-wrap svelte-gutj6d bubble-gap">
                      {takingList.map((message: string, index: number) =>
                        index !== 0 && index % 2 === 1 ? (
                          <UserChatCard message={message} />
                        ) : (
                          index !== 0 && <BotChatCard message={message} />
                        ),
                      )}
                      {singleAns.length !== 0 && <BotChatCard message={singleAns} />}
                      {/* 这个div用于滚动到底部的锚点 */}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </Card>
              </div>

              <Card type="inner" title="Input" className="margin-top-16">
                <TextArea
                  placeholder="给“ALSAP-GPT”发消息"
                  value={userQuestion}
                  onChange={doUserQuestionChange}
                  allowClear
                  autoSize={{ minRows: 3, maxRows: 10 }}
                />
              </Card>

              <div className="margin-top-16 btn-flex">
                <Button type="primary" size="large">
                  🧹 清除历史对话
                </Button>
                <Button type="primary" size="large" onClick={() => sendMsg(userQuestion)}>
                  🚀 发送
                </Button>
              </div>
            </div>
          </Col>
          <FloatButton.BackTop />
        </Row>
      </div>
    </>
  );
};
export default LlmChat;
