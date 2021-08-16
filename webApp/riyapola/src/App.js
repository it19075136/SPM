import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import vehicleAdForm from './components/vehicleAdForm';

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route exact path='/vehicleAd/create' component={vehicleAdForm} />
        {/* Add components */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
