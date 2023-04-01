import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Router } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";

import { CheckLogin } from "../src/util";

import Topbar from "./components/Topbar";
import Dashboard from "./scenes/protected/dashboard";
import Profile from "./scenes/protected/profile";
import Sidebar from "./components/Sidebar";
import Login from "./scenes/auth/login";
import Register from "./scenes/auth/register";
import Welcome from "./scenes/global/welcome";
import About from "./scenes/global/about";
import Contact from "./scenes/global/contact";
import Business from "./scenes/global/business";
import UpdateBusiness from "./scenes/protected/updatebusiness";
import ProtectedRoute from "./components/PrivateRoute";
import Team from "./scenes/protected/team";
import UserProfile from "./scenes/protected/userprofile";
import ManageTeam from "./scenes/protected/manageteam";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState({});

  useEffect(() => {
    setIsLoggedIn(CheckLogin());
    setValue({});
  }, []);

  function toggleSidebar() {
    if (isLoggedIn) {
      return <Sidebar />;
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
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/business" element={<Business />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/updatebusiness" element={<UpdateBusiness />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/team" element={<Team />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/userprofile/:id" element={<UserProfile />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/manageteam" element={<ManageTeam />} />
                </Route>CreateTeam
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
