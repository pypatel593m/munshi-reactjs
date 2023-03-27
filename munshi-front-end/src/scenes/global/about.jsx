import { Box, Button, Link, useTheme } from "@mui/material"; 
import Header  from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import dhruv from "../../Images/dhruv.jpg";
import parth from "../../Images/parth.png";
import arin from "../../Images/arin.jpg";
import { tokens } from "../../theme";

const About = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return <Box m="20px">
            <Box display="flex" justifyContent={"center"}>
                  <Box display="grid" justifyContent={"center"}>
                    <Box display={"flex"} justifyContent="center">
                      <Header title="About!" subtitle="" />
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
                      <section className="home section ">
                          <div className="container">
                              <div className="row">
                                <div className="home-info padd-15">
                                  <h3 className="hello">Hello, My name is <span>Dhruv Patel</span></h3>
                                  <h3 className="my-profession">I'm a <span>Web Developer</span></h3>
                                  <p>I'm a Web Developer with minimal experience. I'm a entry level developer who works on Front-End, Bakc-End as well as Database.
                                      I have gained great skills on Programming and making it more outstanding by Goofing around and make new projects.
                                      I am currently studying in Final-Year of my Studies and Looking for Developer/Programmer position as a Entry-Level for Full-Time.
                                  </p>
                                  <Link href="#contact" className="btn hire-me">Hire Me</Link>
                                </div> 
                                <div className="home-img padd-15">
                                <CardMedia
                                  component="img"
                                  image={dhruv}
                                  alt="green iguana"
                                />
                                </div>
                              </div>
                          </div>
                      </section>

                      <section className="home section ">
                          <div className="container">
                              <div className="row">
                                <div className="home-info padd-15">
                                  <h3 className="hello">Hello, My name is <span>Parth Patel</span></h3>
                                  <h3 className="my-profession">I'm a <span>Web Developer</span></h3>
                                  <p>I'm a Web Developer with minimal experience. I'm a entry level developer who works on Front-End, Bakc-End as well as Database.
                                      I have gained great skills on Programming and making it more outstanding by Goofing around and make new projects.
                                      I am currently studying in Final-Year of my Studies and Looking for Developer/Programmer position as a Entry-Level for Full-Time.
                                  </p>
                                  <Link href="#contact" className="btn hire-me">Hire Me</Link>
                                </div> 
                                <div className="home-img padd-15">
                                <CardMedia
                                  component="img"
                                  image={parth}
                                  alt="green iguana"
                                />
                                </div>
                              </div>
                          </div>
                      </section>

                      <section className="home section ">
                          <div className="container">
                              <div className="row">
                                <div className="home-info padd-15">
                                  <h3 className="hello">Hello, My name is <span>Arin Patodia</span></h3>
                                  <h3 className="my-profession">I'm a <span>Web Developer</span></h3>
                                  <p>I'm a Web Developer with minimal experience. I'm a entry level developer who works on Front-End, Bakc-End as well as Database.
                                      I have gained great skills on Programming and making it more outstanding by Goofing around and make new projects.
                                      I am currently studying in Final-Year of my Studies and Looking for Developer/Programmer position as a Entry-Level for Full-Time.
                                  </p>
                                  <Link href="#contact" className="btn hire-me">Hire Me</Link>
                                </div> 
                                <div className="home-img padd-15">
                                <CardMedia
                                  component="img"
                                  image={arin}
                                  alt="green iguana"
                                />
                                </div>
                              </div>
                          </div>
                      </section>
                      </Box>
                      <Box sx={{ gridColumn: "span 8" }}>

                      </Box>
                      
                    </Box>
                  </Box>
            </Box>
    </Box>;
}

export default About;