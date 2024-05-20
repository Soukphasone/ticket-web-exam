import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import { motion } from 'framer-motion';

import { loginUser } from '../Services/api';


import Loading from '../helper/Loading';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [showPassword, setShowPassword] = useState(false); // Add state to track if password is visible



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting
        loginUser(name, password, setIsLoggedIn, setError, Navigate)
            .finally(() => setLoading(false)); // Set loading to false after login attempt
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <section className="vh-100 " style={{ backgroundColor: " #FFAF45", }} >
            <motion.div className="container py-5 h-100 "
                initial={{ x: "-100vw", y: 0 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 2, ease: "easeOut", type: "spring", bounce: 0.3 }}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: " 10px", boxShadow: "10px 10px" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://images.pexels.com/photos/1974520/pexels-photo-1974520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="login form" className="img-fluid" style={{ borderRadius: " 10px 0 0 10px" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit}>
                                            <div >
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    {/* <FontAwesomeIcon icon={faCar} style={{ color: "#FB6D48" }} className='fas fa-cubes fa-3x me-3' /> */}
                                                    {/* <span className="h1 fw-bold mb-0" style={{ color: "#673F69", fontFamily: "monospace" }}>MY NOTE CARS</span> */}
                                                </div>
                                                <br></br>
                                                <h2 className="fw-normal mb-3 pb-3" style={{
                                                    letterSpacing: "1px",
                                                    color: "#673F69",
                                                    display: "flex",
                                                    justifyContent: "center", // Center horizontally
                                                    alignItems: "center", // Center vertically
                                                    textAlign: "center", // Center text
                                                    fontWeight: 800 // Make text even more bold

                                                }}>
                                                    Đăng nhập
                                                </h2>

                                            </div>
                                            <div className="form-outline mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text" style={{ backgroundColor: "transparent", }}>
                                                        <FontAwesomeIcon icon={faUser} style={{ color: "#FB6D48" }} />
                                                    </span>
                                                    <input type="text" id="name" className="form-control form-control-md" placeholder='Nhập tài khoản' value={name}
                                                        onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <div className="input-group">
                                                    <span className="input-group-text" style={{ backgroundColor: "transparent", }}>
                                                        <FontAwesomeIcon icon={faLock} style={{ color: "#FB6D48" }} />
                                                    </span>
                                                    <input type={showPassword ? "text" : "password"} id="password" className="form-control form-control-md" placeholder='Nhập mật khẩu' value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                    <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ color: "#FB6D48" }} />
                                                    </span>
                                                </div>
                                            </div>
                                            {error && <div style={{ color: 'red' }}>{error}</div>}
                                            <div className="pt-1 mb-4" style={{ display: "flex", textAlign: "center", justifyContent: "end", }}>
                                                <button className="btn btn-md btn-block" type="submit" style={{ backgroundColor: "#FB6D48", color: 'white', width: "100%", boxShadow: " 5px 5px 5px #888888", display: "flex", justifyContent: "center" }}>
                                                    {loading ? <Loading /> : 'đông ý '}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </motion.div >
        </section >
    );
};

export default LoginPage;
