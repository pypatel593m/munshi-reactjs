import { Box } from "@mui/material"; 
import Header  from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

const Welcome = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    return <Box>
            <Box 
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              justifyContent="space-between" alignItems="center">
                <Box row>
                  <Box sx={{ gridColumn: "span 2" }} display="flex" marginLeft={20}>
                    
                    <Header title="Welcome" subtitle="Welcome to Munshi!" />
                  </Box>
                </Box>

                
                <Box sx={{ gridColumn: "span 2" }} display="flex" justifyContent="center">
                  <Box>
                    <h3 className="hello">
                      Great teams made on <span className="name">MUNSHI</span>
                    </h3>
                  </Box>
                  <Box>
                    <h2>
                      Munshi helps small businesses manage their work schedules, time
                      clocks, availabilities, multiple-locations, and more—so they can focus on their people.
                    </h2>
                    <h3><a href="/register">Let's Get Started!</a></h3>
                  </Box>
                        
                        
                      
                     
                  </Box>
              

                
            </Box>
    </Box>;
}

export default Welcome;