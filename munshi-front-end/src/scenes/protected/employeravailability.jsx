import { Box } from "@mui/material"; 
import Header  from "../../components/Header";
import {getCurrentWeekDates, getDayOfWeek} from "../../util";
import {useNavigate} from 'react-router-dom';

const EmployerAvailability = () => {
  const navigate = useNavigate();
  
  return <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AVAILABILITIES" subtitle="Welcome employer" />
      </Box>
  </Box>;
    
}

export default EmployerAvailability;