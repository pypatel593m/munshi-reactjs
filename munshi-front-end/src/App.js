import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route} from "react-router-dom";
import React, { useState, useEffect } from "react";


import {useNavigate} from 'react-router-dom';
import { CheckLogin } from "../src/util";

import Topbar from "./components/Topbar";
import  Dashboard from "./scenes/protected/dashboard";
import Sidebar from "./components/Sidebar";
import Login from "./scenes/auth/login";
import Register from "./scenes/auth/register";
import Welcome from "./scenes/global/welcome";
// import  Team  from "./scenes/team";
// import  Invoices  from "./scenes/invoices";
// import  Contacts  from "./scenes/Contacts";
// import  Bar  from "./scenes/dashboard";
// import  Form  from "./scenes/form";
// import  Line  from "./scenes/line";
// import  Pie  from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar";




function App() {
  const [theme, colorMode] = useMode();


  function toggleSidebar()
  {
    let isLoggedIn = CheckLogin();
    if(isLoggedIn == true)
    {
      return(
        <Sidebar />
      );
    }
    
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          
          {toggleSidebar()}
          <main className="content">
          <Topbar />
          <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
              {/* { <Route path="/team" element={<Team />} /> */}
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route path="/bar" element={<Bar />} /> */}
              {/* <Route path="/pie" element={<Pie />} /> */}
              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> } */}
          </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
