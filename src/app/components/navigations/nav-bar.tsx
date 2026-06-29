import DesktopNavBar from "@/app/components/navigations/desktop-nav-bar";
import {Col, Row} from "antd";
import TopBar from "@/app/components/navigations/top-bar";
import MobileNavBar from "@/app/components/navigations/mobile-nav-bar";

const NavBar = () => {
    return(
        <>
            <Row>
                <Col span={24}>
                    <TopBar/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DesktopNavBar/>
                    <MobileNavBar/>
                </Col>
            </Row>
        </>
    )
}
export default NavBar;
