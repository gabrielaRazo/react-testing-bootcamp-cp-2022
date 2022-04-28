import React from "react";
import '../../stylesheets/header.css'
import {Col, Divider, Row } from 'antd';
import {
  LinkedinOutlined
} from '@ant-design/icons';

export const Footer = () => {

    return (
      <div>
      <Divider/>
      <div className="top-space-footer"/>
      <Row>
        <Col lg={{span:5, offset:19}} xs={{span:23, offset:1}}>
            <a href="https://www.linkedin.com/in/gabriela97/" target="_blank" className="container-txt"><LinkedinOutlined className="icon-linkedin" /> <span className="txt-link">Gabriela Razo Roldán</span></a>
        </Col>
        <Col lg={{span:22, offset:1}} xs={{span:23, offset:1}}>
            <p className="txt-footer">Project created during Wizeline Academy React Testing Bootcamp</p>
        </Col>
        <div className="top-space-footer"/>
      </Row>
           
      </div>
    )
  }