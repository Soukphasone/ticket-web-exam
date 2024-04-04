
import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { submitCarForm } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../helper/SweetAlert";
import "../App";


function Motocycle({ fetchData }) {
    const [showModal, setShowModal] = useState(false);
    const [sign, setSign] = useState("")
    const [carType, setCarType] = useState("ລົດຈັກ");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [money, setMoney] = useState('');
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [error, setError] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (sign.trim() === '' || money.trim() === '') {
            setError('please enter sign')
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




    return (
        <>
            <Button variant="primary" onClick={handleShow} className='Modal' size='md' style={{ backgroundColor: "#FB6D48", color: "white", border: "none" }}>
                <FontAwesomeIcon icon={faMotorcycle} /> ລົດຈັກ
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ໃສ່ຂໍ້ມູນລົດຈັກ</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle" className='mb-2'>
                            <Form.Control
                                className="font-content"
                                type="text"
                                placeholder="ໃສ່ທະບຽນລົດ ຫຼື ເລກກົງເຕີ"
                                name="title"
                                value={sign} onChange={(e) => setSign(e.target.value)}
                                style={{ border: error && sign.trim() === '' ? '1px solid red' : '' }}
                            />
                            {error && sign.trim() === '' && <div style={{ color: 'red' }}>Please enter a value for sign</div>}
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="select"
                                value={carType} onChange={(e) => setCarType(e.target.value)}
                                required disabled className="mb-2 font-content">
                                <option >ລົດຈັກ</option>
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

                                <option value="3000">3000</option>
                                <option value="4000">4,000</option>
                                <option value="5000">5,000</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formNote"
                            className="mb-2 font-content">
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
                                {error && money.trim() === '' && <div style={{ color: 'red' }}>Please enter a value for money</div>}
                            </div>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={handleClose}
                            className="font-content">
                            ຍົກເລີກ
                        </Button>
                        <Button variant="primary"
                            type="submit"
                            className="font-content">
                            ບັນທຶກ
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal >
        </>
    );
}

export default Motocycle;