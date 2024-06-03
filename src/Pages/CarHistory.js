import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Spinner, InputGroup, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PaginationComponent from '../helper/PaginationComponent';
import NoDataComponent from '../helper/NoDataComponents';
import imgNoData from "../asset/image/Animation - 1711077741146.gif"; // Import your image file here
import Navbarr from '../Components/Navbar';
import { fetchCarHistory } from '../Services/api';
import { FaCar, FaCoins } from 'react-icons/fa';
import Breadcrumb from '../Components/BreadCrumNav';

function CarHistory() {
    const paths = ['report', 'Category', 'Subcategory', 'Product'];
    const [data, setData] = useState([]);
    const [note, setNote] = useState('');
    const [sign, setSign] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);
    const [loading, setLoading] = useState(true);
    const [carTypeCount, setCarTypeCount] = useState({});
    const [sumByType, setSumByType] = useState({
        "Tiền mặt": 0,
        "Chuyển khoản": 0,
        "Total": 0
    });
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [sign, dateFrom, dateTo, note, selectedTimeRange]);

    const fetchData = async () => {
        let fromDate = dateFrom;
        let toDate = dateTo;
        if (selectedTimeRange) {
            const today = new Date();
            switch (selectedTimeRange) {
                case 'today':
                    fromDate = toDate = today.toISOString().split('T')[0];
                    break;
                case 'yesterday':
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    fromDate = toDate = yesterday.toISOString().split('T')[0];
                    break;
                case 'week':
                    fromDate = new Date(today);
                    fromDate.setDate(fromDate.getDate() - 7);
                    fromDate = fromDate.toISOString().split('T')[0];
                    toDate = today.toISOString().split('T')[0];
                    break;
                case 'month':
                    fromDate = new Date(today);
                    fromDate.setMonth(fromDate.getMonth() - 1);
                    fromDate = fromDate.toISOString().split('T')[0];
                    toDate = today.toISOString().split('T')[0];
                    break;
                case '3months':
                    fromDate = new Date(today);
                    fromDate.setMonth(fromDate.getMonth() - 3);
                    fromDate = fromDate.toISOString().split('T')[0];
                    toDate = today.toISOString().split('T')[0];
                    break;
                case '6months':
                    fromDate = new Date(today);
                    fromDate.setMonth(fromDate.getMonth() - 6);
                    fromDate = fromDate.toISOString().split('T')[0];
                    toDate = today.toISOString().split('T')[0];
                    break;
                case 'year':
                    fromDate = new Date(today);
                    fromDate.setFullYear(fromDate.getFullYear() - 1);
                    fromDate = fromDate.toISOString().split('T')[0];
                    toDate = today.toISOString().split('T')[0];
                    break;
                default:
                    break;
            }
        }
        try {
            setLoading(true);
            const fetchedData = await fetchCarHistory({ sign, note, dateFrom: fromDate, dateTo: toDate });
            setData(fetchedData);
            calculateCarTypeCount(fetchedData);
            calculateAmountSumByType(fetchedData);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const calculateCarTypeCount = (data) => {
        const counts = {
            "Xe máy": 0,
            "Xe ô tô": 0,
            "VIP": 0,
        };
        data.forEach(item => {
            const carType = item.carType;
            counts[carType] = (counts[carType] || 0) + 1;
        });
        const totalCarTypes = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
        counts["Tổng"] = totalCarTypes;
        setCarTypeCount(counts);
    };

    const calculateAmountSumByType = (data) => {
        const sumByType = {
            "Tiền mặt": 0,
            "Chuyển khoản": 0
        };
        data.forEach(item => {
            const money = item.money;
            if (money === "Tiền mặt") {
                sumByType["Tiền mặt"] += parseFloat(item.amount);
            } else if (money === "Chuyển khoản") {
                sumByType["Chuyển khoản"] += parseFloat(item.amount);
            }
        });
        const totalSum = Object.values(sumByType).reduce((total, value) => total + value, 0);
        sumByType["Tổng"] = totalSum;
        setSumByType(sumByType);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTimeRangeSelect = (range) => {
        setSelectedTimeRange(range);
        setShowModal(false);
    };

    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0" }} className='font-content'>
                <div className="App">
                    {/* <Breadcrumb paths={paths} /> */}
                    {/* Other components */}
                </div>
                <Row>
                    <Col>
                        <h3 className='page-title p-2'>Lịch sử xe ra-vào và thu nhập </h3>
                    </Col>
                </Row>
                <br />
                <Row >
                    <Form>
                        <Row>
                            <Col xs={6} md={3} className="mb-3 mb-md-0">
                                <Form.Group>
                                    <Form.Control type="date" id="date-picker" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={3} className="mb-3 mb-md-0">
                                <Form.Group>
                                    <Form.Control type="date" id="date-picker" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={3}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faMagnifyingGlass} className='' /></InputGroup.Text>
                                        <Form.Control type="text" onChange={(e) => setSign(e.target.value)} placeholder='Tìm kiểm Số biến /Số công tơ ' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={3}>
                                <Button variant="primary" onClick={() => setShowModal(true)} xs={5} md={4} className='mb-2 w-100'>Chọn một khoảng thời gian</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <br />
                <div className="" style={{ margin: "0 0.5rem 0 0.5rem" }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <React.Fragment>
                            <Row >
                                <Col md={6} xs={12} className='mb-2'>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title " style={{ color: "#FFAF45" }}><FaCar size={32} style={{ margin: "0rem 1rem 0rem 1rem", }} /> Loại xe </h5>
                                            <ul className="list-group list-group-flush">
                                                {Object.keys(carTypeCount).map((carType, index) => (
                                                    <li key={carType} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <strong>{carType}</strong>
                                                        <span className="badge bg-primary rounded-pill">Số lượng : {carTypeCount[carType]} xe </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} xs={12}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title " style={{ marginBottom: "1.6rem", color: "#FFAF45" }}> <FaCoins size={31} style={{ margin: "0rem 1rem 0rem 1rem" }} /> Số tiền </h5>
                                            <br></br>
                                            <ul className="list-group list-group-flush">
                                                {Object.entries(sumByType).map(([type, sum]) => (
                                                    <li key={type} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <strong>{type}</strong>
                                                        <span className="badge bg-primary rounded-pill">Số lượng : {sum.toLocaleString()} đ  </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                </div>
                <br />
                <Row style={{ marginBottom: "2px" }}>
                    <Col>
                        <Button variant="primary" onClick={() => window.open("data:application/vnd.ms-excel," + encodeURIComponent(document.getElementById('table-to-xls').outerHTML), "_blank", "fullscreen=yes")} >Download to excel</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table id="table-to-xls" striped bordered hover responsive>
                            <thead className='main-menu'>
                                <tr>
                                    <th>#</th>
                                    <th>Số biến /số công tơ mét xe</th>
                                    <th>Loại xe</th>
                                    <th>Đơn gía</th>
                                    <th>Thanh toán</th>
                                    <th>Ghi chú</th>
                                    <th>Giờ vào </th>
                                    <th>Giờ ra</th>
                                </tr>
                            </thead>
                            <tbody className='font-content'>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: "center" }}>
                                            <Spinner animation="border" role="status" />
                                        </td>
                                    </tr>
                                ) : (
                                    data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: "center" }}>
                                                <div
                                                    style={{
                                                        fontSize: "18px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        color: "#6B7280",
                                                        fontWeight: "400",
                                                    }}>
                                                    <NoDataComponent imgSrc={imgNoData} altText="Sidebar Icon" /> ບໍ່ມີຂໍ້ມູນ/
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{row?.sign || "-"}</td>
                                                <td>{row?.carType}</td>
                                                <td>{row?.amount ? row.amount.toLocaleString() : "-"}</td>
                                                <td>{row?.money}</td>
                                                <td>{row?.note}</td>
                                                <td>{moment(row?.createdAt).format('DD-MM-YY, h:mm:ss a')}</td>
                                                <td>{moment(row?.createdOut).format('DD-MM-YY, h:mm:ss a')}</td>
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </Table>

                        <br />
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </Col>
                </Row>

            </Container>
            {/* Modal for time range selection */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Time Range</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="time-range-buttons">
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('today')}>Today</button>
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('yesterday')}>Yesterday</button>
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('week')}>1 Week Ago</button>
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('month')}>1 Month Ago</button>
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('3months')}>3 Months Ago</button>
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('6months')}>6 Months Ago</button>
                        <button className="time-range-button" onClick={() => handleTimeRangeSelect('year')}>1 Year Ago</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CarHistory;
