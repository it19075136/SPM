import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import vehicleAdForm from './components/vehicleAdForm';
import NavBar from './layouts/navbar';
import Footer from './layouts/footer';
import signup from './components/signup';
import signin from './components/signin';
import sparePartAdForm from './components/sparePartsAdForm';
import userProfile from './components/userProfile';
import Signup from './components/signup';
import Signin from './components/signin';
import UserProfile from './components/userProfile';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/vehicleAd/create' component={vehicleAdForm} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/sparePartsAd/create' component={sparePartAdForm}/>
        <Route exact path='/userProfile' component={UserProfile}/>
        {/* Add components */}
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
