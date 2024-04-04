import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { Container, Row, Col, Form, Table, Button, Card, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbarr from '../Components/Navbar';
import { fetchOrder, fetchReport, updateOrderStatus } from '../Services/api';
import PaginationComponent from '../helper/PaginationComponent';
import imgNoDaTa from "../asset/image/Animation - 1711077741146.gif"; // Import your image file here
import NoDataComponent from '../helper/NoDataComponents';
import Swal from 'sweetalert2';

const Checkout = () => {
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const [tableData, setTableData] = useState([]);
    const [datacars, setDataCars] = useState([]);
    const [sign, setSign] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);
    const [loading, setLoading] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        fetchData();
        getCars();
    }, [sign]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const orders = await fetchOrder('ONLINE', sign);
            setTableData(orders);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getCars = async () => {
        try {
            const report = await fetchReport('ONLINE', userId);
            setDataCars(report);
        } catch (error) {
            console.log(error);
        }
    }

    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    const headers = {
        'Authorization': `STORE ${token}`
    };

    const handleUpdateStatus = async (id) => {
        try {
            await updateOrderStatus(id, 'OFFLINE', headers);
            fetchData();
            getCars();
            setShowConfirmationModal(false);
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    const totalVehicles = datacars ? (
        (datacars.totalCars || 0) + (datacars.totalCycle || 0) + (datacars.totalBike || 0)
    ) : 0;

    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const showConfirmationDialog = (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update status!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateStatus(orderId);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    };


    const handleButtonClick = (id) => {
        setSelectedOrderId(id);
        showConfirmationDialog(id); // Call the function to show the confirmation dialog
    };

    return (
        <>
            {/* Navbar component */}
            <Navbarr />
            <Container className='con-checkout' style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0", height: "100%" }} >
                {/* Container for the checkout section */}
                <Row>
                    <Col>
                        <h3 className='page-title'>ລົດໃນຄອກຂະນະນີ້</h3>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={12} md={3}>
                        <Form>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                                    <Form.Control type="text" placeholder='ຄົ້ນຫາທະບຽນ/ກົງເຕີ' onChange={(e) => setSign(e.target.value)} />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br />
                {/* Cards displaying vehicle counts */}
                <Row>
                    <Col xs={6} md={3} className="justify-content-center pb-4">
                        <Card style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title className='main-menu'>ຈຳນວນລົດຖີບ :</Card.Title>
                                <Card.Text className='font-content'>{datacars.totalCycle || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className="justify-content-center">
                        <Card style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title className='main-menu'>ຈຳນວນລົດຈັກ :</Card.Title>
                                <Card.Text className='font-content'>{datacars.totalBike || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className="justify-content-center">
                        <Card style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title className='main-menu'> ຈຳນວນລົດໃຫຍ່ :</Card.Title>
                                <Card.Text className='font-content'>{datacars.totalCars || 0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className="justify-content-center">
                        <Card style={{ backgroundColor: 'white' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title className='main-menu'> ຈຳນວນທັງໝົດ :</Card.Title>
                                <Card.Text className='font-content'>{totalVehicles}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Table striped bordered hover responsive className='main-menu'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ທະບຽນ/ເລກກົງເຕີ</th>
                                    <th>ປະເພດ</th>
                                    <th>ລາຄາ</th>
                                    <th>ປະເພດສຳລະ</th>
                                    <th>ຫມາຍເຫດ</th>
                                    <th style={{ textAlign: "center" }}>ສະຖານະ</th>
                                </tr>
                            </thead>

                            {/* Conditional rendering of table data or loading/spinner */}
                            <tbody className='font-content'>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>
                                            <Spinner animation="border" role="status"></Spinner>
                                        </td>
                                    </tr>
                                ) : tableData
                                    .filter(item => item.userId === userId)
                                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                    .length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>
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
                                                {/* Display when no data */}
                                                <NoDataComponent imgSrc={imgNoDaTa} altText="Sidebar Icon" /> ບໍ່ມີຂໍ້ມູນ</div>
                                        </td>
                                    </tr>
                                ) : (
                                    // Render table rows
                                    tableData
                                        .filter(item => item.userId === userId)
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((item, index) => (
                                            <tr key={item._id} onClick={() => handleButtonClick(item._id)}>
                                                <td>{index + 1}</td>
                                                <td>{item.sign}</td>
                                                <td>{item.carType}</td>
                                                <td>{item.amount ? item.amount.toLocaleString() : '-'}</td> {/* Add conditional check */}
                                                <td>{item.money}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                    <button style={{ backgroundColor: "#FB6D48", color: "white", border: "none", borderRadius: "5px" }}>{item.status}</button>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </Table>
                        <br />
                        {/* Pagination component */}
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </Col>
                </Row>
            </Container >

            {/* Success Modal */}

        </>
    );
}

export default Checkout;
