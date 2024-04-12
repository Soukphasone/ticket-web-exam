
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
