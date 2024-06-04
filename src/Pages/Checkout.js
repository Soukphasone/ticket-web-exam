import React, { useState, useEffect } from 'react';
import {
    Spinner,
    Form,
    Table,
    InputGroup,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbarr from '../Components/Navbar';
import { fetchOrder, updateOrderStatus } from '../Services/api';
import PaginationComponent from '../helper/PaginationComponent';
import imgNoData from "../asset/image/Animation - 1711077741146.gif";
import NoDataComponent from '../helper/NoDataComponents';
import Swal from 'sweetalert2';
import { FaCar, FaCoins } from 'react-icons/fa';

const Checkout = () => {
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    const [tableData, setTableData] = useState([]);
    const [sign, setSign] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [carTypeCount, setCarTypeCount] = useState({});
    const [sumByType, setSumByType] = useState({ "Tiền mặt": 0, "Chuyển khoản": 0 });
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, [sign]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const orders = await fetchOrder('ONLINE', sign);
            setTableData(orders);
            calculateCarTypeCount(orders);
            calculateAmountSumByType(orders);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const calculateCarTypeCount = (data) => {
        const counts = {
            "Xe máy": 0,
            "Xe ô tô": 0,
            // "VIP": 0
        };
        data.forEach(item => { counts[item.carType] = (counts[item.carType] || 0) + 1; });
        const totalCarTypes = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
        counts["Tổng"] = totalCarTypes;
        setCarTypeCount(counts);
    };

    const calculateAmountSumByType = (data) => {
        const sumByType = { "Tiền mặt": 0, "Chuyển khoản": 0 };
        data.forEach(item => {
            const money = item.money;
            sumByType[money] += parseFloat(item.amount || 0);
        });
        const totalSum = Object.values(sumByType).reduce((total, value) => total + value, 0);
        sumByType["Tổng"] = totalSum;
        setSumByType(sumByType);
    };

    const headers = { 'Authorization': `STORE ${token}` };

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateOrderStatus(id, status, headers);
            fetchData();
            setShowConfirmationModal(false);
            setShowSuccessModal(true);
            setTimeout(() => { setShowSuccessModal(false); }, 1000);
        } catch (error) { console.log(error); }
    }

    const handlePageChange = (pageNumber) => { setCurrentPage(pageNumber); }

    const showConfirmationDialog = (orderId, status) => {
        const actionText = status === 'CANCEL' ? ' hủy bỏ?' : ' Xe đi?';
        Swal.fire({
            title: 'Bạn muốn?',
            text: actionText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý'
        }).then((result) => {
            if (result.isConfirmed) {
                handleUpdateStatus(orderId, status);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thực hiện thành công",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    };

    const handleButtonClick = (id, status) => {
        setSelectedOrderId(id);
        showConfirmationDialog(id, status);
    };

    const filteredData = tableData.filter(item => item.userId === userId && (
        (item.sign && item.sign.toString().toLowerCase().includes(sign.toLowerCase())) ||
        (item.carType && item.carType.toString().toLowerCase().includes(sign.toLowerCase()))
    ));

    return (
        <>
            <Navbarr />
            <Container className='con-checkout' style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0", height: "100%" }}>
                <Row className="my-4">
                    <Col>
                        <div className="title-container">
                            <h3 className="page-title">Xe trong bãi đậu</h3>
                        </div>
                    </Col>
                </Row>
                {loading ? (
                    <div className="text-center mt-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row>
                        <Col md={6} xs={12}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: "#FFAF45" }}>
                                        <FaCar size={32} style={{ margin: "0rem 1rem 0rem 1rem" }} />Loại xe
                                    </h5>
                                    <ul className="list-group list-group-flush">
                                        {Object.keys(carTypeCount).map((carType, index) => (
                                            <li key={carType} className="list-group-item d-flex justify-content-between align-items-center">
                                                <strong>{carType}</strong>
                                                <span className="badge bg-primary rounded-pill">Số lượng: {carTypeCount[carType]} xe</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} xs={12}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: "#FFAF45" }}>
                                        <FaCoins size={31} style={{ margin: "0rem 1rem 0rem 1rem" }} /> Số tiền
                                    </h5>
                                    <ul className="list-group list-group-flush">
                                        {Object.entries(sumByType).map(([type, sum]) => (
                                            <li key={type} className="list-group-item d-flex justify-content-between align-items-center">
                                                <strong>{type}</strong>
                                                <span className="badge bg-primary rounded-pill">Số lượng: {sum.toLocaleString()} đ</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                )}
                <Row className='mb-2 mt-2'>
                    <Col xs={12} md={6}>
                        <Form>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "white" }}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder='Tìm kiếm số biển / công tơ mét xe'
                                        onChange={(e) => setSign(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive className='main-menu'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Số biến xe/Công tơ mét xe</th>
                                    <th>Loại xe</th>
                                    <th>Đơn giá</th>
                                    <th>Thanh toán</th>
                                    <th>Ghi chú</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className='font-content'>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>
                                            <Spinner animation="border" role="status"></Spinner>
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>
                                            <div style={{ fontSize: "18px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#6B7280", fontWeight: "400" }}>
                                                <NoDataComponent imgSrc={imgNoData} altText="No Data" /> Không có dữ liệu
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData
                                        .slice((currentPage - 1) * 30, currentPage * 30)
                                        .map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.sign}</td>
                                                <td>{item.carType}</td>
                                                <td>{item.amount ? item.amount.toLocaleString() : '-'}</td>
                                                <td>{item.money}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                    <button
                                                        style={{ backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", marginRight: "5px" }}
                                                        onClick={() => handleButtonClick(item._id, 'CANCEL')}
                                                    >
                                                        Hủy bỏ
                                                    </button>
                                                    <button
                                                        style={{ backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}
                                                        onClick={() => handleButtonClick(item._id, 'OFFLINE')}
                                                    >
                                                        Xe đi
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </Table>
                        <br />
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredData.length / 30)}
                            handlePageChange={handlePageChange}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Checkout;
