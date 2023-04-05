import { Box, Link, useTheme } from "@mui/material"; 
import Header  from "../../components/Header";
import {CheckLogin, IsEmployer} from "../../util";
import {useNavigate} from 'react-router-dom';
import { tokens } from "../../theme";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
    </Box>
    { IsEmployer() === "employer" ? (
      //This section is for employers 
      <Box>
        
    <Box display="flex" justifyContent={"center"}>
      <h3>Are you an employer, haven't registered your business yet, then <Link href="./business" color={colors.blueAccent[300]} className="register-link"> Click Here!</Link></h3>

      </Box>
      <Box display="flex" justifyContent={"center"}>
      <h3>Are you an employer, haven't registered your business yet, then <Link href="./business" color={colors.blueAccent[300]} className="register-link"> Click Here!</Link></h3>

      </Box>
      <Box display="flex" justifyContent={"center"}>
      <h3>Are you an employer, haven't registered your business yet, then <Link href="./business" color={colors.blueAccent[300]} className="register-link"> Click Here!</Link></h3>

      </Box>
      </Box>
    ): (
      
      // this section is for employees
      <Box>
        
    <Box display="flex" justifyContent={"center"}>
      <h3>Allllllllllllllllllllllllllllllllllllllllhen <Link href="./business" color={colors.blueAccent[300]} className="register-link"> Click Here!</Link></h3>

      </Box>
      <Box display="flex" justifyContent={"center"}>
      <h3>Are you an employer, haven't registered your business yet, then <Link href="./business" color={colors.blueAccent[300]} className="register-link"> Click Here!</Link></h3>

      </Box>
      <Box display="flex" justifyContent={"center"}>
      <h3>Are you an employer, haven't registered your business yet, then <Link href="./business" color={colors.blueAccent[300]} className="register-link"> Click Here!</Link></h3>

      </Box>
      </Box>
    )}
      
  </Box>;
    
}

export default Dashboard;