import '@/pages/Home/style/hotStyle.css';
import { useModel } from '@@/exports';
import '@umijs/max';
import React, { useEffect, useState } from 'react';
import {Col, Row} from "antd";

interface Props {
  hotList: string[];
  onItemClick: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const HotBox: React.FC<Props> = (props) => {
  const { hotList, onItemClick } = props;
  const [themeState, setThemeState] = useState<string>('light-theme');
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    //@ts-ignore
    setThemeState(initialState.settings.navTheme === 'light' ? 'light-theme' : 'dark-theme');
  }, []);

  return (
    <>
      <div className="hot-box">
        {hotList?.length > 0 &&
          hotList.map((hotName: string, i) => (
            <div className={`hot-item ${themeState}`} onClick={() => onItemClick?.()}>
              <Row>
                <Col span={1}>
                  <div className="hot-item-index">{i + 1}.</div>
                </Col>
                <Col span={12}>
                  <div className="hot-item-value">{hotName.trim()}</div>
                </Col>
              </Row>


            </div>
          ))}
      </div>
    </>
  );
};
export default HotBox;
