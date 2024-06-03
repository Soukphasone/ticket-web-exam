import { Nav } from 'react-bootstrap';
import Footer from '../Components/Footer';
import '../App.css';
import { Row, Col, Container } from 'react-bootstrap';
import Navbarr from '../Components/Navbar';
import { FaCar, FaDollarSign, FaUser, FaTimesCircle } from 'react-icons/fa';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Body() {
    return (
        <>
            <Navbarr />
            <div>
                <Container className='vh-100' style={{ backgroundColor: "#ffaf45", borderRadius: "20px 20px 0 0" }}>
                    <br />
                    <Row className='justify-content-center'>
                        <Col xs={12} md={6} className='mb-md-2'>
                            <Nav>
                                <Nav.Link href="/Carhistory" className='card-report d-flex justify-content-between align-items-center'>
                                    <div>
                                        <FaCar className='icon-report' /> Thông kế lịch sử xe ra-vào và thu nhập
                                        <br />
                                        <span className='card-report-child'>xe ra-vào và thu nhập</span>
                                    </div>
                                    <ArrowForwardIosIcon />
                                </Nav.Link>
                            </Nav>
                        </Col>
                        {/* <Col xs={12} md={6} className='mb-md-2'>
                            <Nav>
                                <Nav.Link href="/moneyhistory" className='card-report d-flex justify-content-between align-items-center'>
                                    <div>
                                        <FaDollarSign className='icon-report' /> ລາຍງານ ປະຫວັດຍອດເງິນ
                                        <br />
                                        <span className='card-report-child'>ຍອດເງິນ</span>
                                    </div>
                                    <ArrowForwardIosIcon />
                                </Nav.Link>
                            </Nav>
                        </Col> */}
                        <Col xs={12} md={6} className='mb-md-2'>
                            <Nav>
                                <Nav.Link href="/topconsumer" className='card-report d-flex justify-content-between align-items-center'>
                                    <div>
                                        <FaUser className='icon-report' /> Thông kế khách hàng
                                        <br />
                                        <span className='card-report-child'>Xếp hạng khách hàng</span>
                                    </div>
                                    <ArrowForwardIosIcon />
                                </Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>

                        <Col xs={12} md={12} className='mb-md-2'>
                            <Nav>
                                <Nav.Link href="/cancelbill" className='card-report d-flex justify-content-between align-items-center'>
                                    <div>
                                        <FaTimesCircle className='icon-report' /> Thông kế Hóa đơn bị hủy bỏ
                                        <br />
                                        <span className='card-report-child'>Hóa đơn bị hủy bỏ</span>
                                    </div>
                                    <ArrowForwardIosIcon />
                                </Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Body;
