import React from "react";
import DesktopNavBar from "@/components/layout/DesktopNavBar";
import {Col, Row} from "antd";
import TopBar from "@/components/layout/TopBar";

const NavBar = () => {
    return(
        <>
            <Row>
                <Col span={24}>
                    <TopBar></TopBar>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DesktopNavBar/>
                </Col>
            </Row>
        </>
    )
}
export default NavBar;