import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route exact path='/vehicleAd/create'>
          Hello add form
        </Route>
        {/* Add components */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
