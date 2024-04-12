import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";


import Navbarr from "../Components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalculator, faMoneyBillAlt, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { fetchOrders } from "../Services/api";
import ".././App.css"

const BalanceHistoryForm = (props) => {
    const [data, setData] = useState([]);
    console.log("data", data)
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // Fetch userId from local storage
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId.replace(/^"(.*)"$/, '$1'));
        }

        fetchData();
    }, []);

    async function fetchData() {
        try {
            const orders = await fetchOrders({ dateFrom, dateTo, userId }); // Use fetchOrders function
            setData(orders);
            console.log(orders);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [dateFrom, dateTo, userId]);

    const Cashtotal = () => {
        return data
            .filter((item) => item.money === "ເງິນສົດ" && !isNaN(item.amount))
            .reduce((total, item) => (total += parseFloat(item.amount)), 0);
    };

    const Tranfertotal = () => {
        return data
            .filter((item) => item.money === "ເງິນໂອນ" && !isNaN(item.amount))
            .reduce((total, item) => (total += parseFloat(item.amount)), 0);
    };


    return (
        <>
            <Navbarr />
            <Container
                className="con-balance vh-100"
                style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0", }}
            >
                <Row>
                    <Col>
                        <h3 className="page-title">ປະຫວັດຍອດເງິນ</h3>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col md={2} xs={5} >
                        <Form>
                            <Form.Label>ແຕ່ວັນທີ</Form.Label>
                            <Form.Group>
                                <Form.Control type="date" onChange={(e) => setDateFrom(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                    {/* <Col md={2} xs={2} style={{ padding: "0px" }}><FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ width: "100%", color: 'white' }} /></Col> */}
                    <Col md={2} xs={5}>
                        <Form>
                            <Form.Label>ຫາວັນທີ</Form.Label>
                            <Form.Group>
                                <Form.Control type="date" onChange={(e) => setDateTo(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col xs={4} md={4} className="justify-content-center ">
                        <Card text="white" style={{ backgroundColor: "#FB6D48" }}>
                            <Card.Body>
                                <Card.Title className="main-menu" ><FontAwesomeIcon icon={faMoneyBillTransfer} /> ເງິນໂອນ | {Tranfertotal().toLocaleString()} ກີບ</Card.Title>
                                <Card.Text></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={4} className="justify-content-center ">
                        <Card style={{ backgroundColor: "#D74B76" }} text="white">
                            <Card.Body>
                                <Card.Title className="main-menu"><FontAwesomeIcon icon={faMoneyBillAlt} /> ເງິນສົດ | {Cashtotal().toLocaleString()} ກີບ</Card.Title>
                                <Card.Text></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={4} md={4} className="justify-content-center">
                        <Card style={{ backgroundColor: "#673F69" }} text="white">
                            <Card.Body>
                                <Card.Title className="font-content">
                                    <FontAwesomeIcon icon={faCalculator} className="main-menu" /> ລວມຍອດ | {(Tranfertotal() + Cashtotal()).toLocaleString()} ກີບ
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BalanceHistoryForm;