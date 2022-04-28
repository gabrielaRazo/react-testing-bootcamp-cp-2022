import React from "react";
import '../../stylesheets/header.css'
import {Col, Row } from 'antd';
import {
  LinkedinOutlined
} from '@ant-design/icons';

export const Header = () => {

    return (
      <div className="container-header">
      <div className="top-space-header"/>
      <Row>
        <Col lg={{span:10, offset:1}}>
            <h1 className="txt-title-header">Testing Capstone Project</h1>
        </Col>
        <Col lg={{span:5, offset:8}}>
            <a href="https://www.linkedin.com/in/gabriela97/" target="_blank"><LinkedinOutlined className="icon-linkedin"/> <span className="txt-link">Gabriela Razo Roldán</span></a>
        </Col>
      </Row>
           
      </div>
    )
  }