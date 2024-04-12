import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Spinner, InputGroup, Button } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import PaginationComponent from '../helper/PaginationComponent';
import NoDataComponent from '../helper/NoDataComponents';
import imgNoData from "../asset/image/Animation - 1711077741146.gif"; // Import your image file here
import Navbarr from '../Components/Navbar';
import { fetchCancelbill } from '../Services/api';
import { FaCar, FaCoins } from 'react-icons/fa';
import { Money } from '@mui/icons-material';

function CancelBill() {
    const [data, setData] = useState([]);
    const [note, setNote] = useState('');
    const [sign, setSign] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const [loading, setLoading] = useState(true);
    const [carTypeCount, setCarTypeCount] = useState({});
    const [sumByType, setSumByType] = useState({
        "ເງິນສົດ": 0,
        "ເງິນໂອນ": 0,
        "Total": 0
    });

    useEffect(() => {
        fetchData();
    }, [sign, dateFrom, dateTo, note]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const fetchedData = await fetchCancelbill({ sign, note, dateFrom, dateTo });
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
            "ລົດຈັກ": 0,
            "ລົດໃຫຍ່": 0,
            "VIP": 0,
        };
        data.forEach(item => {
            const carType = item.carType;
            counts[carType] = (counts[carType] || 0) + 1;
        });

        // Summing all car types
        const totalCarTypes = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
        counts["ລວມ"] = totalCarTypes;

        setCarTypeCount(counts);
    };

    const calculateAmountSumByType = (data) => {
        const sumByType = {
            "ເງິນສົດ": 0,
            "ເງິນໂອນ": 0
        };

        data.forEach(item => {
            const money = item.money;
            if (money === "ເງິນສົດ") {
                sumByType["ເງິນສົດ"] += parseFloat(item.amount);
            } else if (money === "ເງິນໂອນ") {
                sumByType["ເງິນໂອນ"] += parseFloat(item.amount);
            }
        });

        // Calculate total sum for each type
        const totalSum = Object.values(sumByType).reduce((total, value) => total + value, 0);
        sumByType["ລວມ"] = totalSum;

        setSumByType(sumByType);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0" }} className='font-content'>
                <Row>
                    <Col>
                        <h3 className='page-title p-2'>ປະຫວັດບິນຍົກເລີກ</h3>
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
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faMagnifyingGlass} className='' /></InputGroup.Text>
                                        <Form.Control type="text" onChange={(e) => setSign(e.target.value)} placeholder='ຄົ້ນຫາທະບຽນ/ກົງເຕີ' />
                                    </InputGroup>
                                </Form.Group>
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
                                            <h5 className="card-title " style={{ color: "#FFAF45" }}><FaCar size={32} style={{ margin: "0rem 1rem 0rem 1rem", }} /> ປະເພດລົດ </h5>
                                            <ul className="list-group list-group-flush">
                                                {Object.keys(carTypeCount).map((carType, index) => (
                                                    <li key={carType} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <strong>{carType}</strong>
                                                        <span className="badge bg-primary rounded-pill">ຈຳນວນ : {carTypeCount[carType]} ຄັນ </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} xs={12}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title " style={{ marginBottom: "1.6rem", color: "#FFAF45" }}> <FaCoins size={31} style={{ margin: "0rem 1rem 0rem 1rem" }} /> ຈຳນວນເງິນ</h5>
                                            <br></br>
                                            <ul className="list-group list-group-flush">
                                                {Object.entries(sumByType).map(([type, sum]) => (
                                                    <li key={type} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <strong>{type}</strong>
                                                        <span className="badge bg-primary rounded-pill">ຈຳນວນ : {sum.toLocaleString()} ກີບ  </span>
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
                        <Button variant="primary" onClick={() => window.open("data:application/vnd.ms-excel," + encodeURIComponent(document.getElementById('table-to-xls').outerHTML), "_blank", "fullscreen=yes")} >ດາວໂຫລດສູ່ excel</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table id="table-to-xls" striped bordered hover responsive>
                            <thead className='main-menu'>
                                <tr>
                                    <th>#</th>
                                    <th>ທະບຽນ/ເລກກົງເຕີ</th>
                                    <th>ປະເພດ</th>
                                    <th>ລາຄາ</th>
                                    <th>ປະເພດສຳລະ</th>
                                    <th>ຫມາຍເຫດ</th>
                                    <th>ເວລາເຂົ້າ</th>
                                    <th>ເວລາອອກ</th>
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
        </>
    );
}

export default CancelBill;
