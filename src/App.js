
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Routes/Router';
import { PriceProvider } from './Context/PriceContext';



function App() {
  return (
    <>
      <PriceProvider>
        <div>

          < Router />
        </div>
      </PriceProvider>
    </>
  );
}

export default App;

// // App.js
// import React from 'react';
// import { CarProvider } from './Context/CarContext';
// import CarForm from './Components/CarForm';
// import CarPrice from './Components/CarPrice';

// const App = () => {
//   return (
//     <CarProvider>
//       <div>
//         <h1>Car Prices</h1>
//         <CarForm />
//         <hr />
//         <h2>Prices</h2>
//         <CarPrice carName="Toyota" />
//         <CarPrice carName="Ford" />
//         <CarPrice carName="Honda" />
//         {/* Add more CarPrice components as needed */}
//       </div>
//     </CarProvider>
//   );
// };

// export default App;


