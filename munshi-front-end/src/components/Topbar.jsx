import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {useNavigate} from 'react-router-dom';
import { loggedUser, Logout, CheckLogin } from "../util";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  function LoggedOut()
  {
    Logout();
    navigate("/login");
  }
  function toggleLogin()
  {
    
    if(!CheckLogin())
    {
      return(
        // <IconButton onClick={Login}>
        //       Login
        // </IconButton>
        <IconButton onClick={() => {navigate("/login")}}>
          <LoginOutlinedIcon />
        </IconButton>
        //<button className="btnLogin" onClick={Login}>Login</button>
      );
    }
    
  }
  function toggleLogout()
  {
    if(CheckLogin())
    {
      return(
        // <IconButton onClick={LoggedOut}>
        //       Logout
        //     </IconButton>
        <IconButton onClick={LoggedOut()}>
          <LogoutOutlinedIcon />
        </IconButton>
        //<button className="btnLogin" onClick={LoggedOut}>Logout</button>
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