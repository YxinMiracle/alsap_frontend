import '@/pages/Cti/Detail/style/detailPageStyle.css';
import '@umijs/max';
import React from 'react';

interface Props {
  id: number;
}

const CtiDetailTtpPage: React.FC<Props> = (props: Props) => {
  const { id } = props;
  return (
    <div className="detail-page-ttp">
      <iframe
        src="https://mitre-attack.github.io/attack-navigator/#layerURL=https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/samples/Bear_APT.json"
        width="100%"
        height="1700px"
      ></iframe>
      <div>{id}</div>
    </div>
  );
};
export default CtiDetailTtpPage;
