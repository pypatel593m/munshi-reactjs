import { Box, IconButton, Link, useTheme } from "@mui/material"; 
import Header  from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate} from 'react-router-dom';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PersonOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image1 from "../../Images/img1.jpeg";
import { tokens } from "../../theme";

const Contact = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return <Box m="20px">
            <Box display="flex" justifyContent={"center"}>
                  <Box display="grid" justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
                      <Header title="Contact Us!" subtitle="" />
                    </Box>
                    <Box
                      display="grid"
                      justifyContent={"center"} 
                      marginLeft={15}
                      gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}//sx={{ gridColumn: "span 2" }}
                    >
                      
                        <Box height={120} display={"flex"} marginRight={15} justifyContent={"center"} sx={{ gridColumn: "span 8" }}>
                        <section className="contact section" >
                            <Box className="row">
                                    </Box>
                                    <h3 className="contact-title padd-15">Got any questions?</h3>
                                    <h4 className="contact-sub-title padd-15">WE ARE AT YOUR SERVICE</h4> 
                            </section>
                        
                        </Box>
                        <Box display={"flex"} justifyContent="right"  marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                                <PersonOutlinedIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <h4>Parth Patel</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right" marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                            <LocalPhoneRoundedIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <h4>Phone: +1(365) 688-8828</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right" marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                            <AttachEmailIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 3" }}>
                            <h4>Email : pypatel593m@gmail.com@gmail.com</h4>
                        </Box>


                        <Box display={"flex"} justifyContent="right"  marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                                <PersonOutlinedIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <h4>Dhruv Patel</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right" marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                            <LocalPhoneRoundedIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <h4>Phone: +1(365) 688-8828</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right" marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                            <AttachEmailIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 3" }}>
                            <h4>Email : pypatel593m@gmail.com@gmail.com</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right"  marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                                <PersonOutlinedIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <h4>Arin Patodia</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right" marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                            <LocalPhoneRoundedIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 1" }}>
                            <h4>Phone: +1(365) 688-8828</h4>
                        </Box>

                        <Box display={"flex"} justifyContent="right" marginRight={1} sx={{ gridColumn: "span 1" }} marginTop={2}>
                            <AttachEmailIcon fontSize="large" sx={{ color: colors.redAccent[500] }}/>
                        </Box>
                        <Box sx={{ gridColumn: "span 3" }}>
                            <h4>Email : pypatel593m@gmail.com@gmail.com</h4>
                        </Box>
                      
                    </Box>
                  </Box>
            </Box>
    </Box>;
}

export default Contact;
