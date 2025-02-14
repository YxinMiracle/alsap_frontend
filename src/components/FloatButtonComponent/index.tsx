import '@/components/FloatButtonComponent/style/floatStyle.css';
import {QrcodeOutlined, WechatOutlined} from '@ant-design/icons';
import { FloatButton, Image } from 'antd';
import React from 'react';

/**
 * 存放页面右下方微信小程序的悬浮按钮，还有回到顶部按钮
 * @constructor
 */
const PageFloatButton: React.FC = () => {

  return (
    <>
      <div className="float-container">
        <FloatButton.Group shape="circle">
          <FloatButton.BackTop />
          <FloatButton
            className="wechat-button"
            shape="circle"
            type="default"
            icon={<WechatOutlined />}
          />
          <div className="float-miniprogramme">
            <Image
              width={180}
              src="https://cdn.yxinmiracle.com/logo/gh_a0acede9c7c9_860.jpg"
            />
          </div>

          <FloatButton
            className="gzh-button"
            shape="circle"
            type="default"
            icon={<QrcodeOutlined />}
          />
          <div className="float-gzh">
            <Image
              width={180}
              src="https://cdn.yxinmiracle.com/logo/qrcode_for_gh_830ab915e4b8_860.jpg"
            />
          </div>
        </FloatButton.Group>
      </div>
    </>
  );
};

export default PageFloatButton;
