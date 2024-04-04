import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import Body from '../Pages/Body';
import Checkout from '../Pages/Checkout';
import CarHistory from '../Pages/CarHistory';
import BalanceHistoryForm from '../Pages/BanlanceHistory';
import Setting from '../Pages/Setting';
import DisplayData from '../Pages/DisplayData';
import Adddata from '../Components/AddDataComponen';
import Ticket from '../Pages/TicKet';
import QRScanner from '../Components/QRScanner';
import ConfirmScanner from '../Pages/ConfirmScanner';




function Router() {
    // Retrieve the login status from localStorage on component mount
    const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    // Update localStorage when the login state changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    // handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };



    return (
        <div>
            {/* <Navbarr /> */}
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage onLogin={handleLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route path="/" element={isLoggedIn ? <Ticket /> : <Navigate to="/login" />} />
                    <Route path="/report" element={isLoggedIn ? <Body /> : <Navigate to="/" />} />
                    <Route path="/Checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/" />} />
                    <Route path="/Carhistory" element={isLoggedIn ? <CarHistory /> : <Navigate to="/" />} />
                    <Route path="/moneyhistory" element={isLoggedIn ? <BalanceHistoryForm /> : <Navigate to="/" />} />
                    <Route path="/setting" element={isLoggedIn ? <Setting /> : <Navigate to="/" />} />
                    <Route path="/displaydata" element={isLoggedIn ? <DisplayData /> : <Navigate to="/" />} />
                    <Route path="/adddata" element={isLoggedIn ? <Adddata /> : <Navigate to="/" />} />

                    <Route path="/confirmscanner" element={isLoggedIn ? <ConfirmScanner /> : <Navigate to="/" />} />


                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Router;