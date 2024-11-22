import CtiContentPage from '@/pages/Cti/Detail/components/Content';
import CtiDetailDefencePage from '@/pages/Cti/Detail/components/Defense';
import CtiDetailInformationPage from '@/pages/Cti/Detail/components/Information';
import CtiDetailKnowledgePage from '@/pages/Cti/Detail/components/knowledge';
import CtiDetailTtpPage from '@/pages/Cti/Detail/components/ttps';
import '@/pages/Cti/Detail/style/detailPageStyle.css';
import { getDetailCtiUsingPost } from '@/services/backend/ctiController';
import { getTicketUsingGet } from '@/services/backend/wechatController';
import { useParams } from '@@/exports';
import {
  CodeSandboxOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  GoldOutlined,
  RadarChartOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Col, FloatButton, message, Row, Tabs, Tooltip, TooltipProps } from 'antd';
import sha1 from 'js-sha1';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import wx from 'weixin-js-sdk';

const CtiDetailPage: React.FC = () => {
  const { id } = useParams();
  const [ctiVo, setCtiVo] = useState<API.CtiDetailVo>({});
  const navigate = useNavigate();
  const location = useLocation();

  // 获取当前 URL 中的 tab 参数
  const currentTab = new URLSearchParams(location.search).get('tab') || 'information';

  // 处理 tab 切换，更新 URL 参数
  const onTabChange = (key: string) => {
    navigate(`${location.pathname}?tab=${key}`);
  };

  // 获取指定长度的随机字符串
  const generateRandomString = (length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // 获取当前时间戳
  const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000);
  };

  const initWxConfig = async () => {
    const res = await getTicketUsingGet();
    if (res.code === 0) {
      const appId = 'wx63aa40f439618ce7';
      const timestamp = getCurrentTimestamp();
      const nonceStr = generateRandomString();
      const encodeUrl = `jsapi_ticket=${res.data}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${window.location.href}`;
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        // @ts-ignore
        signature: sha1(encodeUrl), // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
      });

      wx.ready(function () {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: ctiVo.title!, // 分享标题
          desc: '广州大学仇晶团队-威胁情报部门', // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:
            'https://storage.googleapis.com/gweb-cloudblog-publish/images/threat-intelligence-default-banner-simplifie.max-700x700.png', // 分享图标
          success: function () {
            console.log('updateAppMessageShareData成功');
            // 设置成功
          },
        });

        wx.updateTimelineShareData({
          title: ctiVo.title!, // 分享标题
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:
            'https://storage.googleapis.com/gweb-cloudblog-publish/images/threat-intelligence-default-banner-simplifie.max-700x700.png', // 分享图标
          success: function () {
            // 设置成功
            console.log('updateTimelineShareData成功');
          },
        });
      });
    } else {
    }
  };

  useEffect(() => {
    initWxConfig();
    // const tiket = "kgt8ON7yVITDhtdwci0qedNqtix-F_UlBZHwmhCqeXkY2aFxBHLxOyzWJWJcZAAMtUV3MguCUYy6-pZwSM51aA"

    // console.log(sha1(s))
    // wx.error(function(res){
    //   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //   console.log(res)
    // })
  }, []);

  /**
   * 初始化界面获取数据
   */
  const loadData = async () => {
    if (!id) {
      message.error('请勿非法访问该界面');
      return;
    }
    try {
      // @ts-ignore
      const res = await getDetailCtiUsingPost({ id });
      if (res.code === 0) {
        // @ts-ignore
        setCtiVo(res.data);
      }
    } catch (error: any) {
      // message.error('加载CTI数据失败' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    return {
      pointAtCenter: true,
    };
  }, []);

  const tabItemsList = [
    {
      key: 'information',
      label: `概况`,
      // @ts-ignore
      children: <CtiDetailInformationPage id={id} />,
      icon: <FileProtectOutlined />,
    },
    {
      key: 'knowledge',
      label: `知识`,
      // @ts-ignore
      children: <CtiDetailKnowledgePage id={id} />,
      icon: <GoldOutlined />,
    },
    {
      key: 'content',
      label: `内容`,
      // @ts-ignore
      children: <CtiContentPage id={id} ctiDetailVo={ctiVo} />,
      icon: <FileTextOutlined />,
    },
    {
      key: 'entity',
      label: `实体`,
      children: `实体 ${id}`,
      icon: <CodeSandboxOutlined />,
    },
    {
      key: 'ttps',
      label: `情报技战术`,
      // @ts-ignore
      children: <CtiDetailTtpPage id={id} />,
      icon: <ZoomInOutlined />,
    },
    {
      key: 'defense',
      label: `防御库`,
      // @ts-ignore
      children: <CtiDetailDefencePage id={id} />,
      icon: <RadarChartOutlined />,
    },
  ];

  return (
    <Row>
      <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }}>
        <PageContainer
          title={
            // @ts-ignore
            ctiVo.title?.length > 62 ? (
              <Tooltip placement="top" color="blue" title={ctiVo.title} arrow={mergedArrow}>
                <span style={{ fontSize: '2rem' }}>{ctiVo.title?.substring(0, 62) + '...'}</span>
              </Tooltip>
            ) : (
              <span style={{ fontSize: '2rem' }}>{ctiVo.title}</span>
            )
          }
        >
          <div className="detail-page">
            <div className="detail-page-top-tabs">
              <Tabs activeKey={currentTab} onChange={onTabChange} items={tabItemsList} />
            </div>
          </div>
          <FloatButton.BackTop />
        </PageContainer>
      </Col>
    </Row>
  );
};
export default CtiDetailPage;
