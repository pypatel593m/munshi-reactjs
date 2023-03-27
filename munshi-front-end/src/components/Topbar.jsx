import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
import { useContext, Redirect  } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
    
    if(!CheckLogin())
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
    if(CheckLogin())
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
    if(CheckLogin())
    {
      return(
        <Typography fontSize={20} marginLeft={5}>{User.m_user_fname} {User.m_user_lname}</Typography>
      );
    }
    
  }
  function toggleBusiness()
  {
    if(CheckLogin())
    {
      return(
        <Typography fontSize={20}>Location ID: {User.m_user_business_id}</Typography>
      );
    }
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
      >
        <div className="aside">
        <div className="logo">
                <a href="/welcome"><span>M</span>unshi</a>
            </div>
        </div>
        
        {toggleBusiness()}
      {toggleUserName()}
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
      <IconButton onClick={()=> {navigate("/contact")}}>
          <ConnectWithoutContactOutlinedIcon />
        </IconButton>
        <IconButton onClick={()=> {navigate("/about")}}>
          <InfoOutlinedIcon />
        </IconButton>
        
        
        <IconButton onClick={()=> {navigate("/profile")}}>
          <PersonOutlinedIcon />
        </IconButton>
        
        {toggleLogin()}
        {toggleLogout()}
      </Box>
    </Box>
  );

  
};

export default Topbar; 