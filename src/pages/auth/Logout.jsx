import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Box } from "@mui/material";

export default function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {
        // localStorage.clear();
        Cookies.remove('token');
        navigate('/sign_in');
        window.location.reload(1);
    };

    return (
        <Box onClick={handleLogout}>
            Logout
        </Box>
    );
}
