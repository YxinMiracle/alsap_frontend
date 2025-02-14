import {InsuranceTwoTone, PictureTwoTone, TagOutlined, ToolTwoTone} from '@ant-design/icons';
import { Col, Descriptions, Divider, Row, Tag } from 'antd';
import React from 'react';

interface Props {
  item: API.CtiVo;
}

const SearchDetailPage: React.FC<Props> = (props: Props) => {
  const { item } = props;

  return (
    <>
      <div className="search-detail-page">
        <div className="detail-information">
          <Row gutter={8}>
            <Col span={8}>
              <PictureTwoTone /> 图谱：{' '}
              {item.hasGraph! >= 1 ? (
                <Tag color="green">有</Tag>
              ) : (
                <Tag color="geekblue">无</Tag>
              )}
            </Col>
            <Col span={8}>
              <InsuranceTwoTone /> 规则：{' '}
              {item.hasRule! >= 1 ? (
                <Tag color="green">有</Tag>
              ) : (
                <Tag color="geekblue">无</Tag>
              )}
            </Col>
            <Col span={8} >
              <ToolTwoTone /> 技战术：{' '}
              {item.hasTtp! >= 1 ? (
                <Tag color="green">有</Tag>
              ) : (
                <Tag color="geekblue">无</Tag>
              )}
            </Col>
          </Row>
        </div>

        <Divider></Divider>

        <div className="detail-count">
          <Descriptions
            bordered
            items={[
              {
                key: '1',
                label: '实体总数',
                span: 2,
                children: item.entityNum,
              },
              {
                key: '2',
                label: '可观测对象总数',
                // @ts-ignore
                span: 'filled',
                children: item.scoNum,
              },
              {
                key: '3',
                label: '域对象总数',
                // @ts-ignore
                span: 'filled',
                children: item.sdoNum,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default SearchDetailPage;
