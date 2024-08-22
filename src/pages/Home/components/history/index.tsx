import '@/pages/Home/style/historyStyle.css';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import {useModel} from "@@/exports";

interface Props {
  historyList?: string[];
  onItemClick: () => void;
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const HistoryBox: React.FC<Props> = (props) => {
  const { historyList, onItemClick } = props;
  const [themeState, setThemeState] = useState<string>('light-theme');
  const { initialState } = useModel('@@initialState');


  useEffect(()=>{
    //@ts-ignore
    setThemeState(initialState.settings.navTheme==='light' ? 'light-theme' : 'dark-theme')
  },[])

  return (
    <>
      <div className="history-box">
        <div
          className={`history-item ${themeState}`}
          onClick={() => onItemClick?.()}
        >
          2a734e2189ad40fdd8ad7d5a96cc85f6f4ed3bc1
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          hot.tenchier.com
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          xxx
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          xxx
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          xxx
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          xxx
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          xxx
        </div>
        <div className={`history-item ${themeState}`} onClick={() => onItemClick?.()}>
          xxx
        </div>
      </div>
    </>
  );
};
export default HistoryBox;
