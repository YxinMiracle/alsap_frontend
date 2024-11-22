import '@/pages/Cti/Detail/style/contentPageStyle.css';
import { Col, Row } from 'antd';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';

interface Props {
  id: number;
  ctiDetailVo: API.CtiDetailVo;
}

const CtiContentPage: React.FC<Props> = (props: Props) => {
  const { id, ctiDetailVo } = props;
  const [htmlString] = useState(ctiDetailVo.htmlText ?? undefined);

  return (
    <>
      <div className="content-page-defence">
        <Row>
          <Col xs={24} sm={{ span: 18, offset: 3 }} lg={{ span: 14, offset: 5 }}>
            {htmlString ? (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlString) }} />
            ) : (
              <div style={{fontSize: 20}}>{ctiDetailVo.content}</div>
            )}
            <div>{id}</div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CtiContentPage;
