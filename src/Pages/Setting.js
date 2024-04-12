import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarr from '../Components/Navbar';
import { Button, Col, Container, Modal, Row, Table, Form, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2';

function Setting() {
    const [show, setShow] = useState(false);
    const [carType, setCarType] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNotes] = useState('');
    const [cars, setCars] = useState([]);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for data fetching and submission


    useEffect(() => {
        fetchCars();
    }, []);


    const getUserId = () => {
        return localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    };

    const fetchCars = async () => {
        const userId = getUserId();
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await axios.get(`https://soukphasone.onrender.com/prices?userId=${userId}`);
            setCars(response.data);


        } catch (error) {
            console.error('Error fetching cars:', error);
            setError('Failed to fetch car data. Please try again later.');
        } finally {
            setLoading(false); // Set loading back to false after data fetching
        }
    };


    const handleClose = () => {
        setShow(false);
        setEditId(null);
        setCarType('');
        setAmount('');
        setNotes('');
        setError('');
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleCarTypeChange = (event) => {
        setCarType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setAmount(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleSubmit = async () => {
        if (!carType || !amount) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true); // Set loading to true when submitting
        const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
        const carData = {
            carType: carType,
            amount: amount,
            note: note,
            userId: userId,
        };

        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');

        const headers = {
            'Authorization': `STORE ${token}`,

        };

        try {
            if (editId !== null) {
                await axios.put(`https://soukphasone.onrender.com/price/${editId}`, carData, { headers });
            } else {
                await axios.post('https://soukphasone.onrender.com/price', carData, { headers });
            }
            fetchCars();
            handleClose();
        } catch (error) {
            console.error('Error submitting car data:', error);
            setError('Failed to submit car data. Please try again later.');
        } finally {
            setLoading(false); // Set loading back to false after submission
        }
    };


    const handleEdit = (id) => {
        const car = cars.find(car => car._id === id);
        setEditId(id);
        setCarType(car.carType);
        setAmount(car.amount);
        setNotes(car.note);
        setShow(true);
    };

    const handleDelete = async (id) => {
        // Show SweetAlert confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this car data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                    const headers = {
                        'Authorization': `STORE ${token}`
                    };
                    await axios.delete(`https://soukphasone.onrender.com/price/${id}`, { headers });
                    fetchCars();
                    Swal.fire(
                        'Deleted!',
                        'Your car data has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting car:', error);
                    setError('Failed to delete car. Please try again later.');
                }
            }
        });
    };


    return (
        <div>
            <Navbarr />
            <Container className='vh-100' style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0" }}>
                <Row>
                    <Col>
                        <h3 className='mt-4 page-title'>ຕັ້ງຄ່າລາຄາລົດແຕ່ລະປະເພດ</h3>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        {error && <p className="error">{error}</p>}
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={handleShow} className='main-menu' style={{ backgroundColor: "#FB6D48", color: "white", border: "none" }}>
                                    + ຕັ້ງຄ່າລາຄາ
                                </Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Table striped bordered hover responsive className='main-menu'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ປະເພດລົດ</th>
                                    <th>ລາຄາ</th>
                                    <th>ເພີ່ມເຕີມ</th>
                                    <th>ຈັດການ</th>
                                </tr>
                            </thead>
                            <tbody className='font-content'>
                                {loading ? ( // Render spinner when loading is true
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center" }}>
                                            <Spinner animation="border" variant="primary" />
                                        </td>
                                    </tr>
                                ) : cars.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center" }}>
                                            ບໍ່ທັນມີຂໍ້ມູນ ກະລຸນາ ຕັ້ງຄ່າລາຄາກ່ອນ
                                        </td>
                                    </tr>
                                ) : (
                                    cars.map((car, index) => (
                                        <tr key={car._id}>
                                            <td>{index + 1}</td>
                                            <td>{car.carType}</td>
                                            <td>{car.amount}</td>
                                            <td>{car.note}</td>
                                            <td>
                                                <OverlayTrigger
                                                    key={`edit-tooltip-${index}`}
                                                    placement="top"
                                                    overlay={<Tooltip id={`tooltip-edit-${index}`}>ແກ້ໄຂ</Tooltip>}
                                                >
                                                    <Button variant="info" className='main-menu' onClick={() => handleEdit(car._id)} style={{ padding: "2px" }}>
                                                        <Edit style={{ color: "white" }} />
                                                    </Button>
                                                </OverlayTrigger>
                                                {' '}
                                                <OverlayTrigger
                                                    key={`delete-tooltip-${index}`}
                                                    placement="top"
                                                    overlay={<Tooltip id={`tooltip-delete-${index}`}>ລົບ</Tooltip>}
                                                >
                                                    <Button variant="danger" className='main-menu' onClick={() => handleDelete(car._id)} style={{ padding: "2px" }}>
                                                        <Delete />
                                                    </Button>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </Table>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editId !== null ? 'ແກ້ໄຂລາຍລະອຽດ' : 'ເພີ່ມລາຍລະອຽດ'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Select aria-label="Default select example" onChange={handleCarTypeChange} value={carType} className='main-menu' style={{ border: error && !carType ? '1px solid red' : '' }}>
                                <option className='font-content'>ເລືອກປະເພດລົດ</option>
                                <option className='font-content' value="ລົດຈັກ">ລົດຈັກ</option>
                                <option className='font-content' value="ລົດໃຫຍ່">ລົດໃຫຍ່</option>
                                <option className='font-content' value="VIP">VIP</option>
                                {/* <option className='font-content' value="VIP2">VIP2</option> */}
                            </Form.Select>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicPrice">
                                <Form.Control type="number" placeholder="ໃສ່ລາຄາ" onChange={handlePriceChange} value={amount} className='font-content' style={{ border: error && !amount ? '1px solid red' : '' }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNotes">
                                <Form.Label className='main-menu'>ຫມາຍເຫດ</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={handleNotesChange} value={note} className='font-content' />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} className='main-menu'>
                            ຍົກເລີກ
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} className='main-menu'>
                            {loading ? <Spinner animation="border" variant="light" size="sm" /> : (editId !== null ? 'ບັນທຶກການແກ້ໄຂ' : 'ບັນທຶກການເພີ່ມ')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}

export default Setting;
