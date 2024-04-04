
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Card, InputGroup, Pagination, Spinner } from 'react-bootstrap';
import moment from 'moment';
import '../App';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbarr from '../Components/Navbar';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { fetchCarHistory } from '../Services/api';
import PaginationComponent from '../helper/PaginationComponent';
import NoDataComponent from '../helper/NoDataComponents';
import imgNoDaTa from "../asset/image/Animation - 1711077741146.gif"; // Import your image file here

function CarHistory() {
    const [data, setData] = useState([])
    const [note, setNote] = useState('')
    const [sign, setSign] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const [loading, setLoading] = useState(true);





    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [sign, dateFrom, dateTo, note]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const fetchedData = await fetchCarHistory({ sign, note, dateFrom, dateTo });
            setData(fetchedData);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const countCar = () => {
        return data.filter((item) => item.carType === "ລົດໃຫຍ່").length;
    };
    const countBike = () => {
        return data.filter((item) => item.carType === "ລົດຈັກ").length;
    };
    const countCycle = () => {
        return data.filter((item) => item.carType === "ລົດຖີບ").length;
    };

    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0", }} className='font-content'>
                <Row>
                    <Col>
                        <h3 className='page-title p-2'>ປະຫວັດລົດເຂົ້າ-ອອກ</h3>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Form >
                        <Row >
                            <Col xs={5} md={4} className='mb-2' style={{ paddingRight: "0px", }}>
                                <Form.Group >
                                    <Form.Control type="date" id="date-picker" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className='mb-2' />
                                </Form.Group>
                            </Col>
                            <Col style={{ paddingRight: "0px", paddingLeft: '0px' }} ><FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ width: "100%", color: 'white' }} /></Col>
                            <Col xs={5} md={4} style={{ paddingLeft: "0px" }}>
                                <Form.Group >
                                    <Form.Control type="date" id="date-picker" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className='mb-2' />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3} >
                                <Form.Group >
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faMagnifyingGlass} className='' /></InputGroup.Text>
                                        <Form.Control type="text" onChange={(e) => setSign(e.target.value)} placeholder='ຄົ້ນຫາທະບຽນ/ກົງເຕີ' />
                                    </InputGroup> {/* <Button variant="primary" type="submit" onClick={''} style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} >ຄົ້ນຫາ</Button> */}
                                </Form.Group>
                            </Col>

                        </Row>
                    </Form>
                </Row>
                <br></br>
                <Row style={{ marginTop: "" }}>
                    <Col xs={6} md={3} className="justify-content-center mb-2"  >
                        <Card style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title className='main-menu'>ຈຳນວນລົດຖີບ :</Card.Title>
                                <Card.Text className='font-content'>{countCycle() || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3}>
                        <Card className='font-content' style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title className='main-menu'>ຈຳນວນລົດຈັກ :</Card.Title>
                                <Card.Text className='font-content'>{countBike() || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3}>
                        <Card className='font-content' style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title className='main-menu'> ຈຳນວນລົດໃຫຍ່ :</Card.Title>
                                <Card.Text className='font-content'>{countCar() || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3}>
                        <Card className='font-content' style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title className='main-menu'> ຈຳນວນທັງໝົດ :</Card.Title>
                                <Card.Text className='font-content'>{countCar() + countBike() + countCycle() || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive >
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
                                            <Spinner animation="border" role="status">
                                            </Spinner>
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
                                                    <NoDataComponent imgSrc={imgNoDaTa} altText="Sidebar Icon" /> ບໍ່ມີຂໍ້ມູນ/</div>
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
                        <br></br>


                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </Col>
                </Row>
            </Container></>
    );
}

export default CarHistory;
