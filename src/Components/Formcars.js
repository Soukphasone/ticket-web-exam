// src/components/Cars.js
import React, { useEffect, useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { submitCarForm } from "../Services/api";
// import { useData } from '../Context/DataContext';

import { showErrorAlert, showSuccessAlert } from "../helper/SweetAlert";
import "../App";
// import App from "../App";

function Cars({ fetchData }) {
    // const { data = {} } = useData(); // Assuming useData is a custom hook for fetching data
    // const [newState, setNewState] = useState(data);
    // console.log("new", newState)
    const [showModal, setShowModal] = useState(false);
    const [sign, setSign] = useState('');
    const [carType, setCarType] = useState("ລົດໃຫຍ່");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [money, setMoney] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    // Add useEffect to log data changes and handle errors
    // useEffect(() => {
    //     console.log("Data:", data);
    //     if (!data) {
    //         // Handle the case where data is undefined
    //         // You can set default values or handle this case as needed
    //         setError('Data is undefined');
    //     }
    // }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (sign.trim() === '' || money.trim() === '') {
            setError('Please enter sign');
            return;
        }

        const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        const headers = {
            'Authorization': `STORE ${token}`
        };

        try {
            await submitCarForm({ userId, sign, carType, amount, note, money, headers });
            navigate("/");
            showSuccessAlert('');

            handleClose();
            fetchData();
            setSign('');
            setNote('');
            setMoney('');
        } catch (error) {
            console.error("Error:", error);
            showErrorAlert('');
        }
    };
    const handleButtonClick = (value) => {
        setAmount(value);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='Modal ' size='md' style={{ backgroundColor: "#FB6D48", color: "white", border: "none" }}>
                <FontAwesomeIcon icon={faCar} /> ລົດໃຫຍ່
            </Button >

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ໃສ່ຂໍ້ມູນລົດໃຫຍ່</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body >
                        <Form.Group controlId="formTitle" className='mb-2'>
                            <Form.Control
                                className="font-content"
                                type="text"
                                placeholder="ໃສ່ທະບຽນລົດ ຫຼື ເລກກົງເຕີ"
                                name="title"
                                value={sign}
                                onChange={(e) => setSign(e.target.value)}
                                style={{ border: error && sign.trim() === '' ? '1px solid red' : '' }}
                            />
                            {error && sign.trim() === '' && <div style={{ color: 'red' }}>ກະລຸນາ ໃສ່ທະບຽນລົດ ຫລື ເລກກົງເຕີ</div>}
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="select"
                                value={carType} onChange={(e) => setCarType(e.target.value)}
                                required disabled
                                className="mb-2 font-content">
                                <option >ລົດໃຫຍ່</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="mb-2 font-content"
                            >
                                <option value="">ເລືອກລາຄາ</option>
                                <option value="5000">5,000</option>
                                <option value="8000">8,000</option>
                                <option value="10000">10,000</option>
                                <option value="12000">12,000</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Form.Group>
                            <div className="mb-2 font-content">
                                <Button
                                    variant={amount === '5000' ? 'primary' : 'outline-primary'}
                                    onClick={() => handleButtonClick('5000')}
                                >
                                    5,000
                                </Button>
                                <Button
                                    variant={amount === '8000' ? 'primary' : 'outline-primary'}
                                    onClick={() => handleButtonClick('8000')}
                                >
                                    8,000
                                </Button>
                                <Button
                                    variant={amount === '10000' ? 'primary' : 'outline-primary'}
                                    onClick={() => handleButtonClick('10000')}
                                >
                                    10,000
                                </Button>
                                <Button
                                    variant={amount === '12000' ? 'primary' : 'outline-primary'}
                                    onClick={() => handleButtonClick('12000')}
                                >
                                    12,000
                                </Button>
                            </div>
                        </Form.Group> */}
                        <Form.Group controlId="formNote" className="mb-2">
                            <Form.Control as="textarea" rows={3} value={note}
                                onChange={(e) => setNote(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPaymentMethod">
                            <div>
                                <Form.Check
                                    className="font-content"
                                    type="radio"
                                    name="money"
                                    defaultChecked={money === 'cash'}
                                    onChange={() => setMoney("cash")}
                                    label={<span style={{ color: error && money.trim() === '' ? 'red' : '' }}>ເງິນສົດ</span>}
                                />
                                <Form.Check
                                    className="font-content"
                                    type="radio"
                                    name="money"
                                    defaultChecked={money === 'transfer'}
                                    onChange={() => setMoney("transfer")}
                                    label={<span style={{ color: error && money.trim() === '' ? 'red' : '' }}>ເງິນໂອນ</span>}
                                />
                                {error && money.trim() === '' && <div style={{ color: 'red' }}>ກະລຸນາ ເລືືອກປະເພດສຳລະ</div>}
                            </div>



                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} className="font-content">
                            ຍົກເລີກ
                        </Button>
                        <Button variant="primary" type="submit" className="font-content">
                            ບັນທຶກ
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Cars;
