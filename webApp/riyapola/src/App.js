import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import vehicleAdForm from './components/vehicleAdForm';
import NavBar from './layouts/navbar';
import Footer from './layouts/footer';
import sparePartAdForm from './components/sparePartsAdForm';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/vehicleAd/create' component={vehicleAdForm} />
        <Route exact path='/sparePartsAd/create' component={sparePartAdForm}/>
        {/* Add components */}
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
