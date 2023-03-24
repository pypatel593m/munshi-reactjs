import { Box } from "@mui/material"; 
import Header  from "../../components/Header";

const Welcome = () => {
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Welcome" subtitle="Welcome to Munshi!" />
        </Box>
    </Box>;
}

export default Welcome;