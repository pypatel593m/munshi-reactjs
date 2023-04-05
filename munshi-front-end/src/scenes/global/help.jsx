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
                  <Box display="grid" justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
                      <Header title="Welcome!" subtitle="" />
                    </Box>
                    <Box
                      display="grid"
                      gap="30px"
                      marginLeft={40}
                      justifyContent={"center"} 
                      gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}//sx={{ gridColumn: "span 2" }}
                    >
                      <Box display="flex" sx={{ gridColumn: "span 2" }}  className="home-info">
                        <h3 className="hello">
                          Great teams made on <span className="name">M</span>UNSHI
                        </h3>
                      </Box>
                      <Box display="flex"  sx={{ gridColumn: "span 4" }}  className="home-info">
                        <p>
                        Munshi helps small businesses manage their work schedules, time
                        clocks, availabilities, multiple-locations, and more — so they can focus on their people.
                        </p>
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 8" }} >
                        <Box display="flex" justifyContent="end" mt="20px">
                          <h2><Link href="./register" color={colors.blueAccent[300]} className="register-link">Let's Get Started!</Link></h2>
                        </Box>
                      </Box>
                      

                      <Box display="grid" sx={{ gridColumn: "span 2" }} marginTop={10} className="home-info">
                        <h3 className="hello">
                          Time Clocks
                        </h3>
                        <p>
                          MUNSHI turns (almost) any device into a time clock to track
                          hours, breaks, and overtime. Plus, they can check their
                          availabilities for upcoming week.
                        </p>
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 4" }}  marginTop={10} >
                          <CardMedia
                            component="img"
                            height="340"
                            width="300"
                            image={image1}
                            alt="green iguana"
                            className="image1"
                          />
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 8" }} >
                        <Box display="flex" justifyContent="end" mt="20px">
                          <h2><Link href="./register" color={colors.blueAccent[300]} className="register-link">Let's Get Started!</Link></h2>
                        </Box>
                      </Box>

                      <Box display="grid" sx={{ gridColumn: "span 2" }} marginTop={10}  className="home-info">
                        <h3 className="hello">
                         Employee Scheduling
                        </h3>
                        <p>
                        With Munshi, your schedule is online and always up to date for your team. You can adjust it on the fly,
                          on the bus, or from just about anywhere. And then instantly share it. Isn't it that convenient?
                        </p>
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 4" }}  marginTop={10}>
                          <CardMedia
                            component="img"
                            height="340"
                            width="300"
                            image={image1}
                            alt="green iguana"
                          />
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 8" }} >
                        <Box display="flex" justifyContent="end" mt="20px">
                          <h2><Link href="./register" color={colors.blueAccent[300]} className="register-link">Let's Get Started!</Link></h2>
                        </Box>
                      </Box>

                      <Box display="grid" sx={{ gridColumn: "span 2" }} marginTop={10}  className="home-info">
                        <h3 className="hello">
                        Employee's Availabilities
                        </h3>
                        <p>
                        Munshi can help all employee to check their availabilities whenever and whatever time they want to check,
                          they can check without any hassle.
                        </p>
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 4" }}  marginTop={10}>
                          <CardMedia
                            component="img"
                            height="340"
                            width="300"
                            image={image1}
                            alt="green iguana"
                          />
                      </Box>
                      <Box sx={{ gridColumn: "span 8" }}>

                      </Box>
                      <Box sx={{ gridColumn: "span 8" }}>

                      </Box>
                      
                    </Box>
                  </Box>
            </Box>
    </Box>;
}

export default Help;