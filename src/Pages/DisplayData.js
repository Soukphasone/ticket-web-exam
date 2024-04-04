import React from 'react'
import { DataProvider } from '../Context/DataContext'
import ParentComponent from '../Components/ParentComponen'

export default function DisplayData() {
    return (
        <DataProvider>
            <div>
                <h1>My App</h1>
                <ParentComponent />
            </div>
        </DataProvider>
    )
}
