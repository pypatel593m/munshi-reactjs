import { Box, Button, Grid } from "@mui/material"; 
import Header  from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate} from 'react-router-dom';

const Welcome = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
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
                      <Box display="flex" sx={{ gridColumn: "span 2" }} >
                        <h3 class="hello">
                          Great teams made on <span class="name">MUNSHI</span>
                        </h3>
                      </Box>
                      <Box display="flex"  sx={{ gridColumn: "span 4" }}>
                        <h3 class="hello">
                        Munshi helps small businesses manage their work schedules, time
                        clocks, availabilities, multiple-locations, and more — so they can focus on their people.
                        </h3>
                      </Box>
                      <Box display="flex" justifyContent={"left"} sx={{ gridColumn: "span 8" }} >
                      <Box display="flex" justifyContent="end" mt="20px">
                        <Button color="secondary" variant="contained" onClick={()=>{navigate("/login")}}>
                          Let's Get Started!
                        </Button>
                      </Box>
                      </Box>
                    </Box>
                  </Box>
            </Box>

            <Box display="flex" justifyContent={"center"}>
                  <Box display="grid" justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
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
                      <Box sx={{ gridColumn: "span 2" }} className="home-info" >
                        <h3 class="hello">
                          Time Clocks
                        </h3>
                        <p>
                          MUNSHI turns (almost) any device into a time clock to track
                          hours, breaks, and overtime. Plus, they can check their
                          availabilities for upcoming week.
                        </p>
                      </Box>
                      <Box sx={{ gridColumn: "span 4" }} className="home-img">
                        <img src="/munshi-front-end/src/Images/img1.jpeg" alt="" />
                      </Box>
                    </Box>
                  </Box>
            </Box>


            <Box display="flex" justifyContent={"center"}>
                  <Box display="grid" justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
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
                      <Box sx={{ gridColumn: "span 2" }} className="home-info" >
                        <h3 class="hello">
                          Employee Scheduling
                        </h3>
                        <p>
                          With Munshi, your schedule is online and always up to date for your team. You can adjust it on the fly,
                          on the bus, or from just about anywhere. And then instantly share it. Isn't it that convenient?
                        </p>
                      </Box>
                      <Box sx={{ gridColumn: "span 4" }} className="home-img">
                        <img src="/munshi-front-end/src/Images/img1.jpeg" alt="" />
                      </Box>
                    </Box>
                  </Box>
            </Box>


            <Box display="flex" justifyContent={"center"}>
                  <Box display="grid" justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
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
                      <Box sx={{ gridColumn: "span 2" }} className="home-info" >
                        <h3 class="hello">
                          Employee's Availabilities
                        </h3>
                        <p>
                          Munshi can help all employee to check their availabilities whenever and whatever time they want to check,
                          they can check without any hassle.
                        </p>
                      </Box>
                      <Box sx={{ gridColumn: "span 4" }} className="home-img">
                        <img src="/munshi-front-end/src/Images/img1.jpeg" alt="" />
                      </Box>
                    </Box>
                  </Box>
            </Box>
    </Box>;
}

export default Welcome;