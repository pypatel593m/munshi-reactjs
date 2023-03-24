import { Box } from "@mui/material"; 
import Header  from "../../components/Header";
import {CheckLogin} from "../../util";
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  if (!CheckLogin)
  {
    navigate('/login');
  }
  return <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <p></p>
  </Box>;
    
}

export default Dashboard;