import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import vehicleAdForm from './components/vehicleAdForm';
import NavBar from './layouts/navbar';
import Footer from './layouts/footer';
import signup from './components/signup';
import signin from './components/signin';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/vehicleAd/create' component={vehicleAdForm} />
        <Route exact path='/signup' component={signup} />
        <Route exact path='/signin' component={signin} />
        {/* Add components */}
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
