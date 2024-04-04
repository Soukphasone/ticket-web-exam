import React, { useState } from 'react';
import '../App.css'; // Import your CSS file for styling

const initialData = [
    { id: 1, sign: 'KK 9009', carType: 'Motocycle', amount: '5000', amoney: 'cash', note: '', createdAt: "_", createdOut: "_" },
    // Add more items as needed
];

export default function ConfirmScanner() {
    const [data, setData] = useState(initialData);

    const handleConfirmDelete = (id) => {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        console.log("Item with ID", id, "confirmed for deletion.");
        console.log("Updated Data:", updatedData);
    };

    return (
        <div className="confirm-scanner-container">

            <div className="card-container">
                {data.map(item => (
                    <div key={item.id} className="card-confirm">
                        <div className="card-details">
                            <h3>ສະແກນຢືນຢັນລົດອອກ</h3>
                            <hr></hr>
                            <ul className="description-list">
                                <li><strong>ທະບຽນລົດ ຫລື ເລກກົງເຕີ:</strong> {item.sign}</li>
                                <li><strong>ປະເພດລົດ:</strong> {item.carType}</li>
                                <li><strong>ຈຳນວນເງິນ:</strong> {item.amount}</li>
                                <li><strong>ປະເພດສຳລະ:</strong> {item.amoney}</li>
                                <li><strong>ຫມາຍເຫດ:</strong> {item.note}</li>
                                <li><strong>ເວລາເຂົ້າ:</strong> {item.createdAt}</li>
                                <li><strong>ເວລາອອກ:</strong> {item.createdOut}</li>
                            </ul>
                        </div>
                        <button className="confirm-button" onClick={() => handleConfirmDelete(item.id)}>
                            ຢືນຢັນລົດອອກ
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
