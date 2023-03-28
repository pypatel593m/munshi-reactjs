import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
import { useContext, Redirect } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { CheckLogin, loggedUser, GetUser, GetBusiness } from "../util";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  let User = GetUser();
  let Business = GetBusiness();
  function Login() {
    navigate("/login");
  }
  function LogOut() {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("business");
    navigate("/login");
    window.location.reload();
  }

  return (
    <Box display="flex" sx={{ ...(theme.palette.mode === 'dark' ? { backgroundColor: colors.primary[600]} : { backgroundColor: colors.primary[900]}) }}
       height={ CheckLogin() ? 50 : 70} justifyContent="space-between" p={2}>
      <Box display="flex">
        {!CheckLogin() ? (
          <Box className="logo">
            <Link color={colors.blueAccent[300]} href="/welcome">
              <span>M</span>unshi
            </Link>
          </Box>
        ) : null}

        {CheckLogin() ? (
          <Typography fontSize={20} lineHeight={1}>
            Location: {Business.m_business_name}
          </Typography>
        ) : null}
        
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {CheckLogin() ? (
            <Typography fontSize={20} lineHeight={1}>
              {User.m_user_fname} {User.m_user_lname}
            </Typography>
          ) : null}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton
          onClick={() => {
            navigate("/contact");
          }}
        >
          <ConnectWithoutContactOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            navigate("/about");
          }}
        >
          <InfoOutlinedIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            navigate("/profile");
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>

        { !CheckLogin() ? (
          <IconButton onClick={Login}>
          <LoginOutlinedIcon />
        </IconButton>
        ) : null }
        { CheckLogin() ? (
          <IconButton onClick={LogOut}>
          <LogoutOutlinedIcon />
        </IconButton>
        ) : null }
      </Box>
    </Box>
  );
};

export default Topbar;
