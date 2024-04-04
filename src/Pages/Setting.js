import React, { useEffect, useState } from 'react';
import Navbarr from '../Components/Navbar';
import { Button, Col, Container, Modal, Row, Table, Form, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'; // Import Form from 'react-bootstrap'
import '../App';
import { Delete, Edit, TramSharp } from '@mui/icons-material';
import NoDataComponent from '../helper/NoDataComponents';
import imgNoDaTa from "../asset/image/Animation - 1711077741146.gif"; // Import your image file here

function Setting() {
    const [show, setShow] = useState(false);
    const [carType, setCarType] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNotes] = useState('');
    const [cars, setCars] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("cars", cars)


    useEffect(() => {
        // Simulate fetching data from an API
        setTimeout(() => {
            // Assuming fetchData() is an asynchronous function fetching your car data
            const fetchedData = fetchData();
            setCars(fetchedData);
            setLoading(false);
        }, 2000); // Simulating a 2-second loading time
    }, []);


    const fetchData = () => {
        // Simulate fetching data
        return [
            { carType: 'Car1', price: 10000, note: 'Note 1' },
            { carType: 'Car2', price: 15000, note: 'Note 2' },
            // Add more data as needed
        ];
    };

    const handleClose = () => {
        setShow(false);
        setEditIndex(null);
        setCarType('');
        setPrice('');
        setNotes('');
    };

    const handleShow = () => {
        // Check if the length of cars array is less than or equal to a certain limit
        if (cars.length >= 3) {
            // If it reaches the limit, do not show the modal
            setShow(false);
            // You can optionally show a message or perform any other action here
            alert("You can't add more items.");
        } else {
            // If it's within the limit, show the modal
            setShow(true);
        }
    };

    const handleCarTypeChange = (event) => {
        setCarType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleSubmit = () => {
        if (editIndex !== null) {
            const updatedCars = [...cars];
            updatedCars[editIndex] = {
                carType: carType,
                price: price,
                notes: note
            };
            setCars(updatedCars);
        } else {
            const newCar = {
                carType: carType,
                price: price,
                notes: note
            };
            setCars([...cars, newCar]);
        }
        handleClose();
    };

    const handleEdit = (index) => {
        const car = cars[index];
        setEditIndex(index);
        setCarType(car.carType);
        setPrice(car.price);
        setNotes(car.note);
        setShow(true);
    };

    const handleDelete = (index) => {
        const updatedCars = [...cars];
        updatedCars.splice(index, 1);
        setCars(updatedCars);
    };

    return (
        <div>
            <Navbarr />
            <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0" }} className='vh-100'>
                <Row>
                    <Col>
                        <h3 className='mt-4 page-title'>ຕັ້ງຄ່າລາຄາລົດແຕ່ລະປະເພດ</h3>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={handleShow} className='main-menu' style={{ backgroundColor: "#FB6D48", color: "white", border: "none" }}>
                                    ຕັ້ງຄ່າລາຄາ
                                </Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Table striped bordered hover responsive className='main-menu'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ປະເພດລົດ</th>
                                    <th>ລາຄາ</th>
                                    <th>ເພີ່ມເຕີມ</th>
                                    <th>ຈັດການ</th>
                                </tr>
                            </thead>
                            <tbody className='font-content'>
                                {loading ? (
                                    // Display spinner while loading
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            <Spinner animation="border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </td>
                                    </tr>
                                ) : cars.length === 0 ? (
                                    // Display "No data" if there is no data
                                    <tr>
                                        <td colSpan="5" className="text-center"> <div
                                            style={{
                                                fontSize: "18px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#6B7280",
                                                fontWeight: "400",
                                            }}>
                                            {/* Display when no data */}
                                            <NoDataComponent imgSrc={imgNoDaTa} altText="Sidebar Icon" /> ບໍ່ມີຂໍ້ມູນ</div></td>
                                    </tr>
                                ) : (
                                    // Display data if available
                                    cars.map((car, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{car.carType}</td>
                                            <td>{car.price}</td>
                                            <td>{car.note}</td>
                                            <td>
                                                <OverlayTrigger
                                                    key={`edit-tooltip-${index}`}
                                                    placement="top"
                                                    overlay={<Tooltip id={`tooltip-edit-${index}`}>ແກ້ໄຂ</Tooltip>}
                                                >
                                                    <Button
                                                        variant="info"
                                                        onClick={() => handleEdit(index)}
                                                        className='main-menu'
                                                        style={{ backgroundColor: 'transparent', border: 'none' }} // Customize button style
                                                    >
                                                        <Edit style={{ color: "green", padding: "0px" }} /> {/* Icon */}
                                                    </Button>
                                                </OverlayTrigger>
                                                {' '}
                                                <OverlayTrigger
                                                    key={`delete-tooltip-${index}`}
                                                    placement="top"
                                                    overlay={<Tooltip id={`tooltip-delete-${index}`}>ລົບ</Tooltip>}
                                                >
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(index)}
                                                        className='main-menu'
                                                        style={{ backgroundColor: 'transparent', border: 'none' }} // Customize button style
                                                    >
                                                        <Delete style={{ color: "red", padding: "0px" }} /> {/* Icon */}
                                                    </Button>
                                                </OverlayTrigger>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editIndex !== null ? 'ແກ້ໄຂລາຍລະອຽດ' : 'ເພີ່ມລາຍລະອຽດ'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Select aria-label="Default select example" onChange={handleCarTypeChange} value={carType} className='main-menu'>
                                <option className='font-content'>ເລືອກປະເພດລົດ</option>
                                <option className='font-content' value="ລົດຈັກ">ລົດຈັກ</option>
                                <option className='font-content' value="ລົດໃຫຍ່">ລົດໃຫຍ່</option>
                                <option className='font-content' value="ລົດຖີບ">ລົດຖີບ</option>
                            </Form.Select>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicPrice">
                                <Form.Control type="number" placeholder="ໃສ່ລາຄາ" onChange={handlePriceChange} value={price} className='font-content' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNotes">
                                <Form.Label className='main-menu'>ຫມາຍເຫດ</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={handleNotesChange} value={note} className='font-content' />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} className='main-menu'>
                            ຍົກເລີກ
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} className='main-menu'>
                            {editIndex !== null ? 'ບັນທຶກການແກ້ໄຂ' : 'ບັນທຶກການເພີ່ມ'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}

export default Setting;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbarr from '../Components/Navbar';
// import { Button, Col, Container, Modal, Row, Table, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { Delete, Edit } from '@mui/icons-material';

// function Setting() {
//     const [show, setShow] = useState(false);
//     const [carType, setCarType] = useState('');
//     const [price, setPrice] = useState('');
//     const [note, setNotes] = useState('');
//     const [cars, setCars] = useState([]);
//     const [editIndex, setEditIndex] = useState(null);

//     useEffect(() => {
//         // Fetch cars data when the component mounts
//         fetchCars();
//     }, []);

//     const fetchCars = async () => {
//         try {
//             const response = await axios.get('/api/cars'); // Replace '/api/cars' with your actual API endpoint
//             setCars(response.data);
//         } catch (error) {
//             console.error('Error fetching cars:', error);
//         }
//     };

//     const handleClose = () => {
//         setShow(false);
//         setEditIndex(null);
//         setCarType('');
//         setPrice('');
//         setNotes('');
//     };

//     const handleShow = () => {
//         if (cars.length >= 3) {
//             setShow(false);
//             alert("You can't add more items.");
//         } else {
//             setShow(true);
//         }
//     };

//     const handleCarTypeChange = (event) => {
//         setCarType(event.target.value);
//     };

//     const handlePriceChange = (event) => {
//         setPrice(event.target.value);
//     };

//     const handleNotesChange = (event) => {
//         setNotes(event.target.value);
//     };

//     const handleSubmit = async () => {
//         const carData = {
//             carType: carType,
//             price: price,
//             notes: note
//         };

//         try {
//             if (editIndex !== null) {
//                 await axios.put(`/api/cars/${editIndex}`, carData); // Replace '/api/cars' with your actual API endpoint
//             } else {
//                 await axios.post('/api/cars', carData); // Replace '/api/cars' with your actual API endpoint
//             }
//             fetchCars(); // Refetch cars data after successful submission
//             handleClose();
//         } catch (error) {
//             console.error('Error submitting car data:', error);
//         }
//     };

//     const handleEdit = (index) => {
//         const car = cars[index];
//         setEditIndex(index);
//         setCarType(car.carType);
//         setPrice(car.price);
//         setNotes(car.notes);
//         setShow(true);
//     };

//     const handleDelete = async (index) => {
//         try {
//             await axios.delete(`/api/cars/${index}`); // Replace '/api/cars' with your actual API endpoint
//             fetchCars(); // Refetch cars data after successful deletion
//         } catch (error) {
//             console.error('Error deleting car:', error);
//         }
//     };

//     return (
//         <div>
//             <Navbarr />
//             <Container style={{ backgroundColor: "#FFAF45", borderRadius: "20px 20px 0 0" }} className='vh-100'>
//                 <Row>
//                     <Col>
//                         <h3 className='mt-4 page-title'>ຕັ້ງຄ່າລາຄາລົດແຕ່ລະປະເພດ</h3>
//                     </Col>
//                 </Row>
//                 <br></br>
//                 <Row>
//                     <Col>
//                         <Row>
//                             <Col>
//                                 <Button variant="primary" onClick={handleShow} className='main-menu' style={{ backgroundColor: "#FB6D48", color: "white", border: "none" }}>
//                                     ຕັ້ງຄ່າລາຄາ
//                                 </Button>
//                             </Col>
//                         </Row>
//                         <br></br>
//                         <Table striped bordered hover responsive className='main-menu'>
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>ປະເພດລົດ</th>
//                                     <th>ລາຄາ</th>
//                                     <th>ເພີ່ມເຕີມ</th>
//                                     <th>ຈັດການ</th>
//                                 </tr>
//                             </thead>
//                             <tbody className='font-content'>
//                                 {cars.map((car, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>{car.carType}</td>
//                                         <td>{car.price}</td>
//                                         <td>{car.notes}</td>
//                                         <td>
//                                             <OverlayTrigger
//                                                 key={`edit-tooltip-${index}`}
//                                                 placement="top"
//                                                 overlay={<Tooltip id={`tooltip-edit-${index}`}>ແກ້ໄຂ</Tooltip>}
//                                             >
//                                                 <Button variant="info" onClick={() => handleEdit(index)} className='main-menu'>
//                                                     <Edit style={{ color: "white" }} />
//                                                 </Button>
//                                             </OverlayTrigger>
//                                             {' '}
//                                             <OverlayTrigger
//                                                 key={`delete-tooltip-${index}`}
//                                                 placement="top"
//                                                 overlay={<Tooltip id={`tooltip-delete-${index}`}>ລົບ</Tooltip>}
//                                             >
//                                                 <Button variant="danger" onClick={() => handleDelete(index)} className='main-menu'>
//                                                     <Delete />
//                                                 </Button>
//                                             </OverlayTrigger>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </Col>
//                 </Row>
//                 <Modal show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>{editIndex !== null ? 'ແກ້ໄຂລາຍລະອຽດ' : 'ເພີ່ມລາຍລະອຽດ'}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Select aria-label="Default select example" onChange={handleCarTypeChange} value={carType} className='main-menu'>
//                                 <option className='font-content'>ເລືອກປະເພດລົດ</option>
//                                 <option className='font-content' value="ລົດຈັກ">ລົດຈັກ</option>
//                                 <option className='font-content' value="ລົດໃຫຍ່">ລົດໃຫຍ່</option>
//                                 <option className='font-content' value="ລົດຖີບ">ລົດຖີບ</option>
//                             </Form.Select>
//                             <Form.Group className="mb-3 mt-3" controlId="formBasicPrice">
//                                 <Form.Control type="number" placeholder="ໃສ່ລາຄາ" onChange={handlePriceChange} value={price} className='font-content' />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicNotes">
//                                 <Form.Label className='main-menu'>ຫມາຍເຫດ</Form.Label>
//                                 <Form.Control as="textarea" rows={3} onChange={handleNotesChange} value={note} className='font-content' />
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose} className='main-menu'>
//                             ຍົກເລີກ
//                         </Button>
//                         <Button variant="primary" onClick={handleSubmit} className='main-menu'>
//                             {editIndex !== null ? 'ບັນທຶກການແກ້ໄຂ' : 'ບັນທຶກການເພີ່ມ'}
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </Container>
//         </div>
//     );
// }

// export default Setting;

