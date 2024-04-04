// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://soukphasone.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
});


export const loginUser = async (name, password, setIsLoggedIn, setError, Navigate) => {
    try {
        const response = await api.post('/login', {
            username: name,
            password: password,
        });

        localStorage.setItem('username', JSON.stringify(response.data.data.username));
        localStorage.setItem('user_id', JSON.stringify(response.data.data._id));
        localStorage.setItem('token', JSON.stringify(response.data.accessToken));
        setIsLoggedIn(true);
        Navigate('/');
    } catch (error) {
        console.error(error);
        setError('Incorrect username or password');
        setTimeout(() => {
            setError('');
        }, 3000);
    }
};

const submitCarForm = async ({ userId, sign, carType, amount, note, money, headers }) => {

    try {
        const response = await api.post('/order', { userId, sign, carType, amount, note, money }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error submitting car form:', error);
        throw error;
    }
};
export { submitCarForm };

export const fetchReportData = async (userId) => {
    try {
        const response = await api.get(`/report/?status=ONLINE&userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching report data:', error);
        throw error;
    }
};


const getUserId = () => {
    return localStorage.getItem('user_id').replace(/^"(.*)"$/, '$1');
};

export const fetchCarHistory = async ({ sign, note, dateFrom, dateTo }) => {
    const userId = getUserId();
    const status = 'OFFLINE';

    try {
        const response = await api.get(`/orders?sign=${sign}&note=${note}&dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}&userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching car history:', error);
        throw error;
    }
};

export const fetchOrders = async ({ dateFrom, dateTo, userId }) => {
    try {
        const response = await api.get(`/orders?dateFrom=${dateFrom}&dateTo=${dateTo}&userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchOrder = async (status, sign) => {
    try {
        const response = await api.get(`/orders?status=${status}&sign=${sign}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const updateOrderStatus = async (id, status, headers) => {
    try {
        const response = await api.put(`/order/${id}`, { status }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

export const fetchReport = async (status, userId) => {
    try {
        const response = await api.get(`/report/?status=${status}&userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching report:', error);
        throw error;
    }
};

export const fetchData = async (status = 'ONLINE') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/report/?status=${status}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

//report car

export const getReportCar = async (userId) => {
    try {
        const response = await api.get(
            `/report/?status=ONLINE&userId=${userId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

//report money
export const fetchReportMoney = async () => {
    try {
        const response = await api.get(
            `/orders`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
