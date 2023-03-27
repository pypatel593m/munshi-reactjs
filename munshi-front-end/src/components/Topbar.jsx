import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, Redirect  } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useNavigate} from 'react-router-dom';
import { CheckLogin } from "../util";
import { loggedUser } from "../util";

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
    window.sessionStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }
  function toggleLogin()
  {
    let checkLogin = CheckLogin();
    if(checkLogin == false)
    {
      return(
        <IconButton onClick={Login}>
          <LoginOutlinedIcon />
        </IconButton>
      );
    }
    
  }
  function toggleLogout()
  {
    let checkLogin = CheckLogin();
    if(checkLogin == true)
    {
      return(
        <IconButton onClick={LoggedOut}>
             <LogoutOutlinedIcon />
            </IconButton>
      );
    }
    
  }
  function toggleUserName()
  {
    let checkLogin = CheckLogin();
    if(checkLogin == true)
    {
      return(
        <h2>{loggedUser.m_user_fname} {loggedUser.m_user_fname}</h2>
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
      <Box display="flex">
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