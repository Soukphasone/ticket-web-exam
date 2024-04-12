import React from 'react';

const HitDetailsPage = ({ selectedHitDetails }) => {
    return (
        <div>
            <h2>Hit Details</h2>
            {selectedHitDetails && (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Car Type</th>
                            <th>Created At</th>
                            <th>Created Out</th>
                            <th>Money</th>
                            <th>Note</th>
                            <th>Sign</th>
                            {/* Add more fields as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {selectedHitDetails.map((hit, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{hit.amount}</td>
                                <td>{hit.carType}</td>
                                <td>{hit.createdAt}</td>
                                <td>{hit.createdOut}</td>
                                <td>{hit.money}</td>
                                <td>{hit.note}</td>
                                <td>{hit.sign}</td>
                                {/* Add more fields as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HitDetailsPage;
