// ChildComponent.js
import React from 'react';
import { useData } from '../Context/DataContext';
import '../App';


const ChildComponent = () => {
    const { data } = useData();

    return (
        <div>
            <h3 className='page-title'>Child Component</h3>
            <p>Name: {data.name}</p>
            <p>Age: {data.age}</p>
        </div>
    );
}

export default ChildComponent;
