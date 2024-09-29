import '@/pages/Cti/Detail/style/detailPageStyle.css';
import '@umijs/max';
import {Card, Col, Modal, Row, Typography} from 'antd';
import React, {useState} from 'react';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import ReactJson from 'react-json-view'

const { Title } = Typography;

interface Props {
  id: number;
}

const CtiDetailDefencePage: React.FC<Props> = (props: Props) => {
  const { id } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={showModal} />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];

  const actions2: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={showModal2} />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];

  const yaraRules1 = [
    {
      "rule_name": "APT33_DROPSHOT_Detector",
      "meta": {
        "description": "Detects the DROPSHOT dropper used by APT33 to deploy backdoors and wiper malware.",
        "author": "YxinMiracle",
        "reference": "APT33 Cyber Espionage Activities",
        "date": "2024-09-29"
      },
      "strings": {
        "path": "C:\\Windows\\System32\\",
        "filename": "dropper.exe",
        "hash": "E3B0C44298FC1C149AFBF4C8996FB924"
      },
      "condition": "filepath contains path and filename == filename and filehash == hash"
    },
    {
      "rule_name": "APT33_TURNEDUP_Backdoor",
      "meta": {
        "description": "Detects the TURNEDUP backdoor used by APT33 for espionage activities.",
        "author": "YxinMiracle",
        "reference": "APT33 Cyber Espionage Activities",
        "date": "2024-09-29"
      },
      "strings": {
        "path": "C:\\Program Files\\Common Files\\",
        "filename": "update.exe",
        "hash": "FAFDB9C9213C9ED180F74BD87D702DAA"
      },
      "condition": "filepath contains path and filename == filename and filehash == hash"
    }
  ];

  const yaraRules2 = [
    {
      "rule_type": "alert",
      "protocol": "ip",
      "src_ip": "any",
      "src_port": "any",
      "direction": "->",
      "dest_ip": "[12.34.56.78, 98.76.54.32]",
      "dest_port": "any",
      "options": {
        "message": "Detected outbound traffic to APT33 known malicious IP",
        "sid": "1000001",
        "revision": "1"
      }
    },
    {
      "rule_type": "alert",
      "protocol": "ip",
      "src_ip": "[12.34.56.78, 98.76.54.32]",
      "src_port": "any",
      "direction": "->",
      "dest_ip": "any",
      "dest_port": "any",
      "options": {
        "message": "Detected inbound traffic from APT33 known malicious IP",
        "sid": "1000002",
        "revision": "1"
      }
    }
  ]



  return (
    <div className="detail-page-defence">
      <div style={{marginBottom: 16}}>
        <Title level={4}>本地入侵检测系统Yara规则</Title>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{width: 400}}>
          <div>
            <ReactJson src={yaraRules1} />
          </div>
        </Modal>
        <div style={{marginTop: 16}}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={{ span: 6 }}>
              <Card actions={actions} style={{ minWidth: 300 }}>
                <Card.Meta
                  title="APT33 Cyber Espionage Activities"
                  description={
                    <>
                      <p>Detects the DROPSHOT dropper used by APT33 to deploy backdoors and wiper malware.</p>
                    </>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} lg={{ span: 6 }}>
              <Card actions={actions} style={{ minWidth: 300 }}>
                <Card.Meta
                  title="APT33_TURNEDUP_Backdoor"
                  description={
                    <>
                      <p>Detects the TURNEDUP backdoor used by APT33 for espionage activities.</p>
                    </>
                  }
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <Title level={4}>网络入侵检测系统Snort规则</Title>
        <Modal title="Basic Modal" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} style={{width: 400}}>
          <div>
            <ReactJson src={yaraRules2} />
          </div>
        </Modal>
        <div style={{marginTop: 16}}>
          <Row gutter={16}>
            <Col xs={24} sm={24} lg={{span: 6}}>
              <Card actions={actions2} style={{minWidth: 300}}>
                <Card.Meta
                  title="Snort Rules"
                  description={
                    <>
                      <p>Detected inbound traffic from APT33 known malicious IP</p>
                    </>
                  }
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default CtiDetailDefencePage;
