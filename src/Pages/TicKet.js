import React, { useState } from 'react';
import Navbarr from '../Components/Navbar';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { showSuccessAlert } from '../helper/SweetAlert';
import '../App';
import QRScanner from '../Components/QRScanner';
import ReportCars from '../Components/ReportCars';
import ReportMoney from '../Components/ReportMonney';

function Ticket() {
    const [formData, setFormData] = useState({
        sign: '',
        note: '',
        money: null,
    });
    const [error, setError] = useState('');
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        setFormData({ ...formData, money: e.target.value });
    };

    const handleClick = (e, carType, amount) => {
        e.preventDefault();
        const { sign, note, money } = formData;
        if (!sign.trim() || !money.trim()) {
            setError('Please enter sign');
            return;
        }

        // Disable the button while the request is in progress
        setLoading(true);

        const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        const headers = {
            'Authorization': `STORE ${token}`
        };
        const newData = { userId, carType, amount, sign, note, money };

        const apiUrl = 'https://soukphasone.onrender.com/order';

        axios.post(apiUrl, newData, { headers })
            .then(response => {
                showSuccessAlert('');
                console.log('Data posted successfully:', response.data);
                setAlldata(prevData => [...prevData, response.data]);
                setFormData({ sign: '', note: '', money: '' });
                setError('');
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.error('Token expired. Please log in again.');
                } else {
                    console.error('Error posting data:', error);
                }
            })
            .finally(() => {
                // Enable the button after the request is complete
                setLoading(false);
            });
    };

    const data = [
        { id: 1, carType: "ລົດໃຫຍ່", amount: 10000 },
        { id: 2, carType: "ລົດຖີບ", amount: 2000 },
        { id: 3, carType: "ລົດຈັກ", amount: 5000 }
    ];

    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0", }} className='vh-100' >
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0 0", textAlign: "center", alignItems: "center" }}>
                    <div>
                        <h3 className='page-title' >ໃບບິນລົດ</h3>
                    </div>
                    <div> <QRScanner /></div>
                </div>

                <hr />

                <Form>
                    <Form.Group controlId="name">
                        <Form.Label className='main-menu'>ທະບຽນລົດ ຫລື ເລກກົງເຕີ</Form.Label>
                        <Form.Control type="text" name="sign" value={formData.sign} onChange={handleChange} style={{ border: error && !formData.sign.trim() ? '1px solid red' : '' }} />
                        {error && !formData.sign.trim() && <div style={{ color: 'red' }} className='font-content'>ກະລຸນາ ໃສ່ທະບຽນລົດ ຫລື ເລກກົງເຕີ</div>}
                    </Form.Group>

                    <Form.Group controlId="message">
                        <Form.Label className='main-menu'>ຫມາຍເຫດ</Form.Label>
                        <Form.Control as="textarea" name="note" value={formData.note} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='main-menu'>ປະເພດສຳລະ:</Form.Label>
                        <InputGroup>
                            <Form.Check
                                inline
                                type="radio"
                                id="cash"
                                label="ເງົນສົດ"
                                name="paymentMethod"
                                value="cash"
                                checked={formData.money === 'cash'}
                                onChange={handlePaymentMethodChange}
                                className='main-menu'
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="transfer"
                                label="ເງິນໂອນ"
                                name="paymentMethod"
                                value="transfer"
                                checked={formData.money === 'transfer'}
                                onChange={handlePaymentMethodChange}
                                className='main-menu'
                            />
                        </InputGroup>
                    </Form.Group>
                </Form>

                <hr />
                <div className="App">
                    {data.map(item => (
                        <Button
                            key={item.id}
                            onClick={(e) => handleClick(e, item.carType, item.amount)}
                            disabled={loading}
                            className='m-1 main-menu'
                            style={{ backgroundColor: "#FB6D48", border: "none" }}
                        >
                            {item.carType}
                        </Button>

                    ))}
                </div>
                <hr></hr>
                <div className='pb-3'>
                    {/* <ReportCars />
                    <ReportMoney /> */}
                </div>
            </Container>
        </>
    );
}

export default Ticket;
