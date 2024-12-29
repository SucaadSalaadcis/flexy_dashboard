import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';

import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';


import Cookies from 'js-cookie';
import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function Country_post() {


    const [country_name, setCountry_name] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();


    const getToken = () => {
        return Cookies.get('token');
    };
    // post
    const handlePost = async (e) => {
        e.preventDefault();
        const data = {
            country_name, status,
        }

        const response = await axiosPublicURL().post("api/country/store", data, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            console.log(response)
            if (response.data) {
                toast.success('Record has been been saved')
                navigate('/country')
            }
        }).catch((error) => console.log(error));
    }


    return (
        <body class="g-sidenav-show">

            <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">


                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-lg-8 col-md-10 mx-auto">
                            <BackIcon pathUrl={'/country'} />
                            <Paper elevation={3} style={{ padding: '71px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(164, 26, 244, 0.5)' }}>
                                {/* content page */}
                                <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Country Post Form</Typography>
                                <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Country Name"
                                        value={country_name}
                                        onChange={(e) => setCountry_name(e.target.value)}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Status 1: active 2: inActive"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />

                                </FormControl>
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button variant="contained"
                                        startIcon={<AddIcon />}
                                        style={{ paddingRight: '25px', }}
                                        onClick={handlePost}
                                    >
                                        Post
                                    </Button>
                                </Box>

                            </Paper>
                        </div>
                    </div>

                </div>
            </main>

        </body>
    )
}
