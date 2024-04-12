import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap, faArrowRight, faSignOutAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ExitToApp } from '@mui/icons-material';
import Swal from 'sweetalert2'; // Import SweetAlert
import ConfirmLogout from '../helper/CustomAlert/ConfirmLogout';
import HorizontalMenu from './NavHorizontalMenu';
import '../App';

function Navbarr() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username').replace(/^"(.*)"$/, '$1');
    const navigate = useNavigate();
    const text_username = <span style={{ color: "#673F69" }}>Hello! {username}</span>;

    useEffect(() => {
        setIsLoggedIn(!!userId);
    }, [userId]);

    const navigateToLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        // Show confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Confirm Logout',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                confirmLogout(); // If confirmed, proceed with logout
            }
        });
    };

    const confirmLogout = () => {
        try {
            localStorage.clear();
            setIsLoggedIn(false);
            navigateToLogin();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: "white" }} className='navbar'>
                <Container fluid className='nav-content '  >
                    <Navbar.Brand as={Link} to="/" style={{ marginBottom: "13px", color: "#673F69", fontWeight: "bold" }}>
                        <div className="d-none d-sm-block" style={{ marginLeft: "6rem" }}>
                            <FontAwesomeIcon icon={faSitemap} style={{ fontSize: "32px", color: "#673F69", marginRight: "10px" }} />
                        </div>
                        <div className="d-block d-sm-none">
                            <FontAwesomeIcon icon={faSitemap} style={{ fontSize: "32px", color: "#673F69", marginRight: "10px" }} />
                            <span className='brand'>{text_username}</span>
                        </div>
                    </Navbar.Brand>

                    <div className="d-lg-none" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button onClick={handleLogout} style={{ color: "white", border: "none", backgroundColor: "white", display: "flex", alignItems: "center", marginBottom: "2px" }}>
                            <Fragment>
                                <FontAwesomeIcon icon={faPowerOff} style={{ color: "red", marginLeft: "5px" }} />
                            </Fragment>
                        </Button>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            {isLoggedIn && (<Nav.Link as={Link} to="/" className='nav-link-'>ພິມໃບບິນ</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link as={Link} to="/Checkout" className='nav-link-'>ລົດໃນຄອກຂະນະນີ້</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link as={Link} to="/report" className='nav-link-'>ລາຍງານ</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link as={Link} to="/setting" className='nav-link-'>ຕັ້ງຄ່າ</Nav.Link>)}
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown style={{ color: "#D74B76", marginRight: "6rem" }} id="nav-dropdown-dark-example" title={text_username} menuVariant="light">
                                    {isLoggedIn && (
                                        <NavDropdown.Item onClick={handleLogout} style={{ color: "#E53E3E", fontWeight: "bold" }}>
                                            ອອກຈາກລະບົບ <FontAwesomeIcon icon={faPowerOff} style={{ color: "#E53E3E", marginLeft: "5px" }} />
                                        </NavDropdown.Item>
                                    )}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <HorizontalMenu />

            <ConfirmLogout
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
                confirmLogout={confirmLogout}
                msg="Confirm Logout"
                icon={faSignOutAlt}
                cancelText="Cancel"
                ConfirmText="Logout"
            />
        </>
    );
}

export default Navbarr;
