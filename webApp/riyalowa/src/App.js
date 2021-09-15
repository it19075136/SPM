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
import categoryList from './components/categoryList'; 
import homepage from './components/homepage';
import vehicleAdsView from './components/vehicleAdsView';
import sparepartsAdView from './components/sparepartsAdView';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter className="App">
      <NavBar/>
      <Switch>
        <Route exact path='/vehicleAd/create' component={vehicleAdForm} />
        <Route exact path='/vehicleAd/update/:id' component={updateVehicleAdForm} />
        <Route exact path='/vehicleAds' component={vehicleAdsView} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/sparePartsAd/create' component={sparePartAdForm}/>
        <Route exact path='/sparepartAds' component={sparepartsAdView}/>
        <Route exact path='/sparePartsAd/update/:id' component={updateSparePartsAdForm} />
        <Route exact path='/userProfile' component={UserProfile}/>
        <Route exact path='/category/add' component={AddCategoryForm} />
        <Route exact path='/category/update' component={updateCategoryForm} />
        <Route exact path='/forgetPassword' component={ForgetPassword} />
        <Route exact path='/category/list' component={categoryList} />
        <Route exact path='/' component={homepage} />

        {/* Add components */}
      </Switch>
      {/* <Footer/> */}
    </BrowserRouter>
    </Provider>
  );
}

export default App;
