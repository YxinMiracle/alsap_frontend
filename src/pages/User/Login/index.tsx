import Footer from '@/components/Footer';
import '@/pages/User/Login/style/loginPage.css';
import { userLoginUsingPost, userWeChatLoginUsingPost } from '@/services/backend/userController';
import { createTempQrCodeUsingGet } from '@/services/backend/wechatController';
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Divider, Image, message, Modal, Tabs } from 'antd';
import React, {useRef, useState} from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const [qrCodeBase64, setQrCodeBase64] = useState<string>('');
  const [qrCodeLoading, setQrCodeLoading] = useState<boolean>(false);
  const userQrCodeTicket = useRef<string>('');
  const [isWxModalOpen, setWxIsModalOpen] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // 用 useRef 存储定时器

  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });

      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      // 保存已登录用户信息
      setInitialState({
        ...initialState,
        currentUser: res.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `登录失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };


  // 查看扫描二维码是否成功
  const isWxLogin = async () => {
    try {
      const res = await userWeChatLoginUsingPost({
        ticket: userQrCodeTicket.current,
      });
      if (res.code === 0) {
        // 成功登录，取消轮询
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }

        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // 保存已登录用户信息
        setInitialState({
          ...initialState,
          currentUser: res.data,
        });
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
    } catch (error: any) {
      // 没有登陆，可以继续轮询
    }
  };

  // 开启轮询功能
  const startLoginPolling = () => {
    // 每5秒调用一次isWxLogin，检查登录状态
    intervalIdRef.current = setInterval(isWxLogin, 5000);
  };

  // 点击开始进行微信登陆
  const showWxLoginModal = async () => {
    setWxIsModalOpen(true);
    setQrCodeLoading(true);
    // 如果现在存在轮询的情况，就关闭
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    // 1. 打开窗口后，获取后端二维码
    try {
      const res = await createTempQrCodeUsingGet();
      if (res.code === 0) {
        // @ts-ignore
        setQrCodeBase64(res.data.img);
        // @ts-ignore
        userQrCodeTicket.current = res.data.ticket;
      }
    } catch (error: any) {
      message.error('二维码获取失败，' + error.message);
    }
    setQrCodeLoading(false);

    // 2. 然后开启轮询，查看是否已经登陆完成
    startLoginPolling();
  };

  // 当扫码框关闭后
  const handleCancel = () => {
    setWxIsModalOpen(false);
    userQrCodeTicket.current = "";
    // 关闭轮询
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
          }}
          logo={<img alt="logo" style={{ height: '100%' }} src="/logo.svg" />}
          title="威胁情报利用平台-登录"
          subTitle={''}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <Link to="/user/register">新用户注册</Link>
          </div>
        </LoginForm>
        <div>
          <Modal footer={null} open={isWxModalOpen} onCancel={handleCancel} loading={qrCodeLoading}>
            <span className="web_qrcode_wrp">
              <div className="js_status js_wx_default_tip" id="wx_default_tip">
                <div className="web_qrcode_tips">
                  <i className="web_qrcode_tips_logo"></i>使用微信扫一扫关注公众号
                </div>
                <div className="web_qrcode_app_wrp">
                  「<strong className="web_qrcode_app">纵溯安全</strong>」
                </div>
                <Image
                  // @ts-ignore
                  src={`data:image/jpeg;base64,${qrCodeBase64}`}
                />
              </div>
            </span>
          </Modal>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Divider plain className="wx-login-item-style">
              其他方式登陆
            </Divider>
            <Button
              className="wx-login-item-style"
              type="dashed"
              icon={<WechatOutlined style={{ color: '#52c41a' }} />}
              onClick={showWxLoginModal}
            >
              微信认证登陆
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Login;
