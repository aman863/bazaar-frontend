import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register/Register';
import Registration from './Pages/Register/Registration';
import Dashboard from './Pages/Dashboard/Dashboard';
import Bookings from './Pages/bookings/bookings';
const App =()=>(
  
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard/:id" component={Dashboard}/>
        <Route path="/bookings/:id" component={Bookings}/>
        <Route path="/register" component={Register}/>
        <Route path="/registration" component={Registration}/>
      </Switch>
    </BrowserRouter>
  
)

export default App;
