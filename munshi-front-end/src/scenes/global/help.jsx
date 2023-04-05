import { Box, Link, useTheme } from "@mui/material"; 
import Header  from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate} from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import image1 from "../../Images/img1.jpeg";
import { tokens } from "../../theme";

const Help = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return <Box m="20px">
            <Box display="flex" justifyContent={"center"}>
                  <Box  justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
                      <Header title="Help!" subtitle="" />
                    </Box>
                    <Box
                      justifyContent={"center"} 
                      padding={"10px 80px 30px 80px"}
                    >
                      <Box className="home-info">
                        <h2 className="hello" style={{ textAlign: 'center' }}>
                          Welcome to the Help Page of Munshi, which will guide you through various features 
                          which are available on this website, focusing on employee side as well as employer side.
                        </h2>
                      </Box>

                      <Box className="home-info">

                        <p className="help-p">
                          On this website, Employer, who has their own business or who is manager at particlar store, then they have to register
                          their business first which will create their own business ID will help them to register themselves to the website, because
                          it will be needed when they register themselves as employer.<br /><br />
                          After they are registered, they will redirected to main page of the website which will have mulitple link on their left side of sidebar.<br /> <br /> <br />

                          <span>Availability</span> For the availability page on Employer side, they will be able to see the availability which is being set 
                          by employee and employer can check the availablity of all employee in the single table where all employees 
                          are being located. <br /> <br />
                          Employer can delete the availability of the employee if they want to. <br /><br />
                          Whereas, employee can only see their own availability which they have set for particular week. So, they can insert 
                          multiple availablity of the week in the availabity form and submit with appropriate notes which can be taken in 
                          consideration by employer. <br /> <br /> <br />

                          <span>Scheduling</span> For the scheduling page for employer, they can see all the availablities which are posted for all employees
                          and can make schedule depending on the availabilities and can post where eemployees can see their own schedule by logging in their own 
                          account. <br /><br />
                          Employer can remove the schedule form the schedule which is posted and can make other changes, because they have that level of accesibility. <br /><br /> 
                          Whereas, employee only have accessbitlity of view the schedule of their own. They don't have any other functionality. <br /> <br /> <br />

                          <span>Time-Sheets</span> For the availability page on Employer side, they will be able to see the availability which is being set 
                          by employee and employer can check the availablity of all employee in the single table where all employees 
                          are being located. <br /> 
                          Whereas, employee can only see their own availability which they have set for particular week. So, they can insert 
                          multiple availablity of the week in the availabity form and submit with appropriate notes which can be taken in 
                          consideration by employer.
                        </p> 
                          
                      </Box>
                    </Box>
                  </Box>
            </Box>
    </Box>;
}

export default Help;