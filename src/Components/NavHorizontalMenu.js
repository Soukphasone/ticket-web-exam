import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import '../App';
// import './HorizontalMenu.css'; // Import your CSS file

const HorizontalMenu = () => {
    return (
        <div className="sticky-top mb-2  " style={{ backgroundColor: "white" }}>
            <div className='d-flex justify-content-center '>
                <div className="d-lg-none">
                    <div className="menu-container">
                        <Nav className="horizontal-menu" >

                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className='main-menu-list' style={{ width: "100%" }}>In hóa đơn

                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/checkout" className='main-menu-list' style={{ width: "100%" }}>
                                    Xe ở bãi đậu

                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/report" className='main-menu-list' >
                                    Thông kê

                                </Nav.Link >
                            </Nav.Item>

                            <Nav.Item style={{ width: "100%" }}>
                                <Nav.Link as={Link} to="/setting" className='main-menu-list' style={{ width: "100%" }}>Cái đặt</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalMenu;
