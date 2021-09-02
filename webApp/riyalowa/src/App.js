import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {store} from './redux/store';
import {Provider} from 'react-redux';
import vehicleAdForm from './components/vehicleAdForm';
import NavBar from './layouts/navbar';
import Footer from './layouts/footer';
import sparePartAdForm from './components/sparePartsAdForm';
import Signup from './components/signup';
import Signin from './components/signin';
import UserProfile from './components/userProfile';
import AddCategoryForm from './components/addCategoryForm';
import updateVehicleAdForm from './components/updateVehicleAdForm';
import updateSparePartsAdForm from './components/updateSparePartsAdForm';
import updateCategoryForm from './components/updateCategoryForm';
import ForgetPassword from './components/forgetPassword';

function App() {
  return (
    <Provider store={store}>
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
        <Route exact path='/category/update' component={updateCategoryForm} />
        <Route exact path='/forgetPassword' component={ForgetPassword} />
        {/* Add components */}
      </Switch>
      <Footer/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
