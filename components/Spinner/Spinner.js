import { Box } from "@chakra-ui/react"
import HashLoader from "react-spinners/HashLoader";

export default function Spinner() {
    return (
        <Box height="95vh" display="flex" alignItems="center" justifyContent="center">
            <HashLoader color="white" size={100} margin={20} />
        </Box>
    )
}
