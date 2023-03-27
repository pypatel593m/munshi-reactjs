import { Box, IconButton, Link, useTheme } from "@mui/material"; 
import Header  from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate} from 'react-router-dom';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
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
                      <Header title="Contact!" subtitle="" />
                    </Box>
                    <Box
                      display="grid"
                      gap="30px"
                      justifyContent={"center"} 
                      gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}//sx={{ gridColumn: "span 2" }}
                    >
                      
                      <Box sx={{ gridColumn: "span 8" }}>
                      <section className="contact section" sx={{ gridColumn: "span 8" }}>
                          <Box className="row">
                                      <Box className="section-title padd-15">
                                          <h2>Contact Me</h2>
                                      </Box>
                                  </Box>
                                  <h3 className="contact-title padd-15">Have you any Questions?</h3>
                                  <h4 className="contact-sub-title padd-15">I'm AT YOUR SERVICES</h4>
                                  <Box className="row">
                                      <Box className="contact-info-item padd-15">
                                          <LocalPhoneRoundedIcon color={colors.blueAccent[600]}/>
                                          <h4>Phone</h4>
                                          <p>(905) 260-1008</p>
                                      </Box>
                                      <Box className="contact-info-item padd-15">
                                          <Box className="icon"><i className="fa fa-envelope"></i></Box>
                                          <h4>Email</h4>
                                          <p>pateldhruv9825@gmail.com</p>
                                      </Box>
                                  </Box>
                                  <h3 className="contact-title padd-15">Send me and Email</h3>
                                  <h4 className="contact-sub-title padd-15">I'm Very Responsive to Messages</h4>
                                  <Box className="row">
                                      <Box className="contact-form padd-15">
                                          <Box className="row">
                                              <Box className="form-item col-6 padd-15">
                                                  <Box className="form-group">
                                                      <input type="text" className="form-control" placeholder="Name" />
                                                  </Box>
                                              </Box>
                                          </Box>

                                          <Box className="row">
                                              <Box className="form-item col-6 padd-15">
                                                  <Box className="form-group">
                                                      <input type="email" className="form-control" placeholder="Email" />
                                                  </Box>
                                              </Box>
                                          </Box>
                                              
                                          <Box className="row">
                                              <Box className="form-item col-12 padd-15">
                                                  <Box className="form-group">
                                                      <input type="text" className="form-control" placeholder="Subject" />
                                                  </Box>
                                              </Box>
                                          </Box>
                                              
                                          <Box className="row">
                                              <Box className="form-item col-12 padd-15">
                                                  <Box className="form-group">
                                                      <textarea name="" id="" className="form-control" placeholder="Message"></textarea>
                                                  </Box>
                                              </Box>
                                          </Box>
                                              

                                          <Box className="row">
                                              <Box className="form-item col-12 padd-15">
                                                  <Box className="form-group">
                                                      <button className="btn" type="submit">Send Message</button>
                                                  </Box>
                                              </Box>
                                          </Box>
                                      </Box>
                                  </Box>
                          </section>

                      
                      </Box>
                      <Box sx={{ gridColumn: "span 8" }}>

                      </Box>
                      
                    </Box>
                  </Box>
            </Box>
    </Box>;
}

export default Contact;
