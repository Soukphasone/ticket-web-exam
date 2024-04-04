import React, { useState, useEffect } from 'react'
import '../App'

import { Link } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { getReportCar } from '../Services/api';



function ReportCars() {//props
    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const [datacars, setDataCars] = useState([]);

    // async function fetchData() {
    //     try {
    //         const response = await axios.get(
    //             `https://soukphasone.onrender.com/report/?status=ONLINE&userId=${userId}`
    //         );
    //         setDataCars(response.data);
    //         // console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // useEffect(() => {
    //     fetchData();
    // },);

    async function fetchData() {
        const response = await getReportCar(userId);
        if (response) {
            setDataCars(response);
        }
    }

    useEffect(() => {
        fetchData();
    }, [datacars]);

    return (
        <>
            <div className="card-report " style={{ boxShadow: "10px 10px" }}>
                <h3 className='main-menu'>ລົດໃນຄອກຂະນະນີ້:</h3>
                <hr></hr>
                <div>
                    <div style={{ display: "flex" }} className='font-content'><span className='font-content' >ລົດຈັກ :</span><p className='font-content'>{datacars.totalBike} ຄັນ </p></div>
                    <div style={{ display: "flex" }} className='font-content'><span className='font-content' >ລົດຖີບ :</span><p className='font-content'>{datacars.totalCycle} ຄັນ </p></div>
                    <div style={{ display: "flex" }} className='font-content'><span className='font-content' >ລົດໃຫຍ່ :</span><p className='font-content' >{datacars.totalCars} ຄັນ </p></div>
                </div>
                <Link as={Link} to="/Checkout">
                    <Button style={{ marginTop: "0rem", color: "white", width: "100%", background: "#FB6D48", border: "none", }} className='btn hover main-menu'> ເບິ່ງລາຍລະອຽດ</Button>
                </Link>
            </div>
        </>
    )
}

export default ReportCars