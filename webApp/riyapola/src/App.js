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
import AddCategoryForm from './components/addCategoryForm';
import updateVehicleAdForm from './components/updateVehicleAdForm';
import updateSparePartsAdForm from './components/updateSparePartsAdForm';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/vehicleAd/create' component={vehicleAdForm} />
        <Route exact path='/vehicleAd/update/:id' component={updateVehicleAdForm} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/sparePartsAd/create' component={sparePartAdForm}/>
        <Route exact path='/sparePartsAd/update/:id' component={updateSparePartsAdForm} />
        <Route exact path='/userProfile' component={UserProfile}/>
        <Route exact path='/category/add' component={AddCategoryForm} />
        {/* Add components */}
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
