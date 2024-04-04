
import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, faCar } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { submitCarForm } from "../Services/api";
import { showErrorAlert, showSuccessAlert } from "../helper/SweetAlert";
import Loading from "../helper/Loading";
import "../App";


function Bicycle({ fetchData }) {
    const [showModal, setShowModal] = useState(false);
    const [sign, setSign] = useState("")
    const [carType, setCarType] = useState("ລົດຖີບ");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [money, setMoney] = useState('');
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        //sign.trim() === '' ||
        if (money.trim() === '') {
            setError('hhhhhh')
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
            <Button onClick={handleShow} className='Modal' size='md' style={{ backgroundColor: "#FB6D48", color: "white", border: "none" }}>
                <FontAwesomeIcon icon={faBicycle} /> ລົດຖີບ
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ໃສ່ຂໍ້ມູນລົດຖີບ</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {/* <Form.Group controlId="formTitle" className='mb-2'>
                            <Form.Control
                                type="text"
                                placeholder="ຂໍ້ມູນລົດຖີບ"
                                name="title"
                                value={sign} onChange={(e) => setSign(e.target.value)}
                            />
                        </Form.Group> */}
                        <Form.Group >
                            <Form.Control as="select"
                                value={carType} onChange={(e) => setCarType(e.target.value)}
                                required disabled
                                className="mb-2 font-content">
                                <option >ລົດຖີບ</option>
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
                                <option value="1000">1,000</option>
                                <option value="2000">2,000</option>
                                <option value="30000">3,000</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formNote"
                            className="mb-2 font-content">
                            <Form.Control as="textarea"
                                rows={3}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className=" font-content"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPaymentMethod">
                            <div>
                                <Form.Check
                                    className=" font-content"
                                    type="radio"
                                    name="money"
                                    defaultChecked={money === 'cash'}
                                    onChange={() => setMoney("cash")}
                                    label={<span style={{ color: error && money.trim() === '' ? 'red' : '' }}>ເງິນສົດ</span>}
                                />
                                <Form.Check
                                    className=" font-content"
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
                        <Button variant="secondary" onClick={handleClose} className=" font-content">
                            ຍົກເລີກ
                        </Button>
                        <Button variant="primary" type="submit" className=" font-content">
                            {loading ? <Loading /> : 'ຕົກລົງ'}
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal >
        </>
    );
}

export default Bicycle;