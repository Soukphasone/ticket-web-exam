import React, { useEffect, useState } from 'react';
import Navbarr from '../Components/Navbar';
import { Button, Col, Container, Row, Form, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { showSuccessAlert } from '../helper/SweetAlert';
import '../App';
import QRScanner from '../Components/QRScanner';
import ReportCars from '../Components/ReportCars';
import ReportMoney from '../Components/ReportMonney';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Ticket() {
    const [formData, setFormData] = useState({
        sign: '',
        note: '',
        money: null,
    });
    const username = localStorage.getItem('username').replace(/^"(.*)"$/, '$1');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true); // Initial loading state set to true

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

                // Print the bill
                printBill(response.data);
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

    const printBill = (data) => {
        // Example bill content with better UI
        const billContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="text-align: center; color: #333;">Bill</h1>
                <hr style="border: 0; border-top: 2px solid #eee; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <div>
                        <h2 style="margin: 0; color: #555;">Chi tiết hóa đơn </h2>
                         <p style="margin: 5px 0; color: #777;">Số hóa đơn: ${data._Id}</p>
                        <p style="margin: 5px 0; color: #777;">Nhân viên: ${username || 'N/A'}</p>
                    </div>
                    <div>
                        <h2 style="margin: 0; color: #555;">Chi tiết xe</h2>
                        <p style="margin: 5px 0; color: #777;">Loại xe: ${data.carType}</p>
                       
                    </div>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Số biển / công tơ</th>
                        <td style="border: 1px solid #ddd; padding: 8px;">${data.sign}</td>
                    </tr>
                    <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Số lượng</th>
                    <td style="border: 1px solid #ddd; padding: 8px;">${data.amount}</td>
                </tr>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Ghi chú</th>
                        <td style="border: 1px solid #ddd; padding: 8px;">${data.note}</td>
                    </tr>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Thanh toán</th>
                        <td style="border: 1px solid #ddd; padding: 8px;">${data.money}</td>
                    </tr>
                </table>
                <div style="text-align: center; color: #555;">
                    <p style="margin: 5px 0;">Thank you for your order!</p>
                </div>
            </div>
        `;

        const billWindow = window.open('', '_blank', 'width=800,height=600');
        billWindow.document.write('<html><head><title>Bill</title></head><body>');
        billWindow.document.write(billContent);
        billWindow.document.write('</body></html>');
        billWindow.document.close();
        billWindow.print();
    };



    useEffect(() => {
        fetchCars();
    }, []);


    const getUserId = () => {
        return localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    };
    const fetchCars = async () => {
        const userId = getUserId();
        try {
            const response = await axios.get(`https://soukphasone.onrender.com/prices?userId=${userId}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
            setError('Failed to fetch car data. Please try again later.');
        } finally {
            // After fetching data, set loading to false
            setLoading(false);
        }
    };

    return (
        <>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0", }} className='vh-100' >
                <Row className="my-3">
                    <Col md={2} xs={12}></Col>
                    <Col md={8} xs={12} className="d-flex align-items-center justify-content-between mt-2">
                        <h3 className="page-title">
                            <FontAwesomeIcon icon={faPrint} className="mr-2" /> in hóa đơn
                        </h3>
                        <QRScanner />
                    </Col>
                    <Col md={2} xs={12}></Col>
                </Row>


                <hr />
                <Row>
                    <Col md={2} xs={12} ></Col>
                    <Col md={8} xs={12} >  <Form>
                        <Form.Group controlId="name">
                            <Form.Label className='main-menu'>Biển số xe / Công tơ mét xe</Form.Label>
                            <Form.Control type="text" name="sign" value={formData.sign} onChange={handleChange} style={{ border: error && !formData.sign.trim() ? '1px solid red' : '' }} />
                            {error && !formData.sign.trim() && <div style={{ color: 'red' }} className='font-content'>Vui lòng, Nhập số biển /số công tơ</div>}
                        </Form.Group>

                        <Form.Group controlId="message">
                            <Form.Label className='main-menu'>Ghi chú</Form.Label>
                            <Form.Control as="textarea" name="note" value={formData.note} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='main-menu'>thanh toán:</Form.Label>
                            <InputGroup>
                                <Form.Check
                                    inline
                                    type="radio"
                                    id="cash"
                                    label="Tiền mặt"
                                    name="paymentMethod"
                                    value="Tiền mặt"
                                    checked={formData.money === 'Tiền mặt'}
                                    onChange={handlePaymentMethodChange}
                                    className='main-menu'
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    id="transfer"
                                    label="Chuyển khoản"
                                    name="paymentMethod"
                                    value="Chuyển khoản"
                                    checked={formData.money === 'Chuyển khoản'}
                                    onChange={handlePaymentMethodChange}
                                    className='main-menu'
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form>


                        <hr />
                        <div className="App">
                            {loading ? (
                                <Spinner animation="border" variant="primary" />
                            ) : (
                                data.length === 0 ? (
                                    <p>
                                        <a href="/setting">Vui lòng , đặt giá từng loại xe</a>
                                    </p>
                                ) : (
                                    data.map(item => (
                                        <Button
                                            key={item.id}
                                            onClick={(e) => handleClick(e, item.carType, item.amount)}
                                            disabled={loading}
                                            className='m-1 main-menu'
                                            style={{ backgroundColor: "#FB6D48", border: "none" }}
                                        >
                                            {item.carType}
                                        </Button>
                                    ))
                                )
                            )}
                        </div>
                    </Col>
                    <Col md={2} xs={12}></Col>
                </Row>


            </Container>
        </>
    );
}

export default Ticket;
