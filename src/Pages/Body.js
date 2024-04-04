import React, { useState } from 'react';
import ReportMoney from '../Components/ReportMonney';
import ReportCars from '../Components/ReportCars';
import Footer from '../Components/Footer';
import '../App.css';
import Bicycle from '../Components/FormBicycle';
import Cars from '../Components/Formcars';
import Motocycle from '../Components/FormMotocycle';
import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Navbarr from '../Components/Navbar';
import { fetchData } from '../Services/api';
import MotionContainer from '../helper/MotionContainer'; // Import the MotionContainer component
import { Link, useNavigate } from 'react-router-dom';



function Body() {
    const [datacars, setDataCars] = useState([]);


    const _fetchData = async () => {
        try {
            const data = await fetchData('ONLINE');
            setDataCars(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbarr />

            <MotionContainer> {/* Use MotionContainer here */}
                <Container style={{ height: "100%" }}>
                    {/* <Breadcrumb>
                        <Breadcrumb.Item href='/'>ຫນ້າຫລັກ</Breadcrumb.Item>
                        <Breadcrumb.Item href='/Checkout'>ລົດໃນຄອກຂະນະນີ້ </Breadcrumb.Item>
                        <Breadcrumb.Item href="/Carhistory">ປະຫວັດລົດເຂົ້າ-ອອກ</Breadcrumb.Item>
                        <Breadcrumb.Item href="/moneyhistory">ປະຫວັດຍອດເງິນ</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className='top-title'>
                        <h3 className='page-title'>ລະບົບຈັດການປີ້ລົດ</h3>
                        <hr></hr>
                    </div>
                    {/* 
                    <div className='container-cars'>
                        <Cars fetchData={_fetchData} />
                        <Motocycle fetchData={_fetchData} />
                        <Bicycle fetchData={_fetchData} />
                    </div> */}

                    <Row className='justify-content-center'>
                        <Col xs={12} md={4}>
                            <ReportMoney />
                        </Col>
                        <Col xs={12} md={4}>
                            <ReportCars />
                        </Col>
                    </Row>
                    <br></br>
                </Container>
            </MotionContainer>
            <Footer />
        </>
    );
}

export default Body;
