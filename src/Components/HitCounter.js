import React, { useState, useEffect } from 'react';
import { fetchCarHistory } from '../Services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbarr from './Navbar';
import { Container, Row, Col, Table, Spinner, InputGroup, Form, Button, Modal } from 'react-bootstrap';
import PaginationComponent from '../helper/PaginationComponent';
import App from '../App';
import moment from 'moment';
import { BsEye } from 'react-icons/bs'; // Import the eye icon from react-icons library

const HitCounter = () => {
    const [data, setData] = useState([]);
    const [note, setNote] = useState('');
    const [sign, setSign] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);
    const [showModal, setShowModal] = useState(false);
    const [selectedTimeRange, setSelectedTimeRange] = useState('');
    const [selectedHitDetails, setSelectedHitDetails] = useState(null); // New state for selected hit details

    useEffect(() => {
        fetchData();
    }, [sign, dateFrom, dateTo, note, selectedTimeRange]);

    const fetchData = async () => {
        try {
            setLoading(true);
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
            const fetchedData = await fetchCarHistory({ sign, note, dateFrom: fromDate, dateTo: toDate });
            setData(fetchedData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const countHits = () => {
        const hits = {};
        data.forEach(item => {
            const key = `${item.sign}_${item.carType}`;
            hits[key] = hits[key] || [];
            hits[key].push(item);
        });
        const sortedHits = Object.entries(hits).sort((a, b) => b[1].length - a[1].length);
        return sortedHits;
    };

    const hitsData = countHits();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, hitsData.length);
    const visibleHitsData = hitsData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(hitsData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTimeRangeSelect = (timeRange) => {
        setSelectedTimeRange(timeRange);
        setShowModal(false);
    };

    const handleHitDetails = (hitDetails) => {
        setSelectedHitDetails(hitDetails);
    };

    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0" }} className='font-content'>

                <Row>
                    <Col>
                        <h3 className='page-title p-2'>Xếp hạng khách hàng</h3>
                    </Col>
                </Row>
                <Row className="mt-3">

                    <Col xs={6} md={3} className='mb-2'>
                        <Form.Group>
                            <Form.Control type="date" id="date-picker" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={3} className='mb-2'>
                        <Form.Group>
                            <Form.Control type="date" id="date-picker" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={3} className='mb-2'>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                                <Form.Control type="text" onChange={(e) => setSign(e.target.value)} placeholder='Tìm kiếm Số biến / Số công tơ' />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    {/* Add button to open time range selection modal */}
                    <Col xs={12} md={3}>
                        <Button variant="primary" onClick={() => setShowModal(true)} xs={5} md={4} className='mb-2 w-100'>Chọn một khoảng thới gian</Button>
                    </Col>

                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={12}>
                        <div>
                            {loading ? (
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            ) : (
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Số biến</th>
                                            <th>Loại xe</th>
                                            <th>Sồ lần</th>
                                            <th className="text-center">Xem chi tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleHitsData.map(([key, hitDetails], index) => (
                                            <tr key={index} onClick={() => handleHitDetails(hitDetails)}>
                                                <td>{startIndex + index + 1}</td>
                                                <td>{key.split('_')[0]}</td>
                                                <td>{key.split('_')[1]}</td>
                                                <td>{hitDetails.length}</td>
                                                <td className="text-center"> {/* Apply Bootstrap's text-center class */}
                                                    <Button onClick={() => handleHitDetails(hitDetails)}>
                                                        <BsEye /> {/* Eye icon */}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                            <Row>
                                <Col>
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        handlePageChange={handlePageChange}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* Modal for time range selection */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn một khoảng thới gian</Modal.Title>
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

            {/* Modal for displaying hit details */}
            <Modal show={selectedHitDetails !== null} onHide={() => setSelectedHitDetails(null)} size="xl" centered >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết của khách hàng</Modal.Title>
                    <br></br>

                </Modal.Header>
                <Modal.Body>
                    <h5>Số lượng : {selectedHitDetails?.length || 0} lần</h5>
                    {selectedHitDetails && (
                        <Table striped bordered hover>
                            <thead>

                                <tr>

                                    <th>#</th>
                                    <th>Sồ tiền </th>
                                    <th>Loại xe</th>
                                    <th>Ngày vào</th>
                                    <th>Nhày ra</th>
                                    <th>Thanh toán</th>
                                    <th>Ghi chú</th>
                                    <th>Số biến </th>
                                    {/* Add more fields as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedHitDetails.map((hit, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{hit.amount}</td>
                                        <td>{hit.carType}</td>
                                        <td>{moment(hit?.createdAt).format('DD-MM-YY, h:mm:ss a')}</td>
                                        <td>{moment(hit?.createdOut).format('DD-MM-YY, h:mm:ss a')}</td>
                                        <td>{hit.money}</td>
                                        <td>{hit.note}</td>
                                        <td>{hit.sign}</td>
                                        {/* Add more fields as needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>

            </Modal>
        </>
    );
};

export default HitCounter;
