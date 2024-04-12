import React, { useState, useEffect } from 'react'
import '../App'
import { Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { fetchReportMoney } from '../Services/api'




function ReportMoney({ children }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const ordersData = await fetchReportMoney();
                setData(ordersData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [data]);

    const userId = localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
    const CashtotalToday = () => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'
        return data
            .filter(
                (item) =>
                    item.createdAt.startsWith(currentDate) &&
                    item.money === "ເງົນສົດ" &&
                    item.userId === userId
            )
            .reduce((total, item) => (total += item.amount), 0);
    };

    const TranfertotalToday = () => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format 'YYYY-MM-DD'
        return data
            .filter(
                (item) =>
                    item.createdAt.startsWith(currentDate) &&
                    item.money === "ເງິນໂອນ" &&
                    item.userId === userId
            )
            .reduce((total, item) => (total += item.amount), 0);
    };
    return (

        <div className="card-report" style={{ boxShadow: "10px 10px" }}>
            <h3 className='main-menu'>ລວມຍອດມື້ນີ້ :</h3>
            <hr></hr>

            <div style={{ display: "flex" }}><p className='font-content'>ລວມຍອດ :</p><span className='font-content' >{(TranfertotalToday() + CashtotalToday()).toLocaleString()} ກີບ </span></div>
            <div style={{ display: "flex" }}><p className='font-content'>ເງິນໂອນ :</p><span className='font-content' >{TranfertotalToday().toLocaleString()} ກີບ </span></div>
            <div style={{ display: "flex" }}><p className='font-content'>ເງີນສົດ :</p><span className='font-content' > {CashtotalToday().toLocaleString()} ກີບ </span></div>
            <Link as={Link} to="/moneyhistory">
                <Button style={{ marginTop: "0rem", color: "white", width: "100%", background: "#FB6D48", border: "none" }} className='btn main-menu '> ເບິ່ງລາຍລະອຽດ</Button>
            </Link>
        </div>


    )
}

export default ReportMoney