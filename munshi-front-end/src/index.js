import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EmployerApp from './EmployerApp';
import EmployeeApp from './EmployeeApp';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { loggedUser, CheckLogin } from './util';


const root = ReactDOM.createRoot(document.getElementById('root'));
function toggleApp() {

  if(CheckLogin() && loggedUser.m_user_type_id == 1)
  {
    return (
        
      <EmployerApp />
    );

  }
  else if(!CheckLogin() && loggedUser.m_user_type_id == 2)
  {
    return (
      <EmployeeApp />
    );
  }
  else{
    return (
      <App />
    );
  }
};
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
