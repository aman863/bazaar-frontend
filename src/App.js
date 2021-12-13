import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register/Register';
import RegisterOTP from './Pages/Register/RegisterOTP';
import Registration from './Pages/Register/Registration';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/registerWithOTP">
          <RegisterOTP></RegisterOTP>
        </Route>
        <Route path="/registration">
          <Registration></Registration>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
