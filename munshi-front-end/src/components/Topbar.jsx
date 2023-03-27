import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, Redirect  } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useNavigate} from 'react-router-dom';
import { CheckLogin, loggedUser, GetUser} from "../util";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  let User = GetUser();
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
    if(!CheckLogin)
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
    if(CheckLogin)
    {
      //console.log(User.m_user_fname, User.m_user_business_id, "The USERERRRR");
      return(
        <IconButton onClick={LoggedOut}>
             <LogoutOutlinedIcon />
            </IconButton>
      );
    }
    
  }
  function toggleUserName()
  {
    if(CheckLogin)
    {
      return(
        <h2>{User.m_user_fname} {User.m_user_lname}</h2>
      );
    }
    
  }
  function toggleBusiness()
  {
    if(CheckLogin)
    {
      return(
        <h2>Business ID: {User.m_user_business_id}</h2>
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
      {toggleBusiness()}
      {toggleUserName()}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        <IconButton>
          <PersonOutlinedIcon/>
        </IconButton>
        
        {toggleLogin()}
        {toggleLogout()}
      </Box>
    </Box>
  );

  
};

export default Topbar; 