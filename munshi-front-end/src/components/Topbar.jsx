import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from 'react-router-dom';
import { Logout, CheckLogin } from "../util";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  function Login()
  {
    navigate("/login");
  }
  function LoggedOut()
  {
    Logout();
    navigate("/login");
  }
  function toggleLogin()
  {
    let checkLogin = CheckLogin();
    if(checkLogin == false)
    {
      return(
        // <IconButton onClick={Login}>
        //       Login
        // </IconButton>
        <button className="btnLogin" onClick={Login}>Login</button>
      );
    }
    
  }
  function toggleLogout()
  {
    let checkLogin = CheckLogin();
    if(checkLogin == true)
    {
      return(
        // <IconButton onClick={LoggedOut}>
        //       Logout
        //     </IconButton>
        <button className="btnLogin" onClick={LoggedOut}>Logout</button>
      );
    }
    
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>

      {/* ICONS */}
      <Box display="flex" className="navigation">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
            
        {toggleLogin()}
        {toggleLogout()}
      </Box>
    </Box>
  );

  
};

export default Topbar; 