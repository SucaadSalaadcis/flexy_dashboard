import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

import { PacmanLoader } from 'react-spinners';

export default function Edit_country() {

    const getToken = () => {
        return Cookies.get('token');
    };

    const [country_name, setCountry_name] = useState("");
    const [id, setid] = useState("");
    const { countryId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);



    // Function to fetch country data
    const handleSingleData = async () => {
        setLoading(true);
        try {
            const response = await axiosPublicURL().post(
                'api/country/get',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            setLoading(false);
            // Extract data
            const countries = response.data?.data;
            console.log(countries)
            // Find the country by ID
            const country = countries?.find(item => item.id === parseInt(countryId));

            if (country) {
                setCountry_name(country.country_name || '');
                setid(country.id || '');
            } else {
                toast.error('Country not found.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching country data:', error);
            toast.error('An error occurred while fetching country data.');
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        handleSingleData();
    }, []);




    // edit
    const handleUpdate = (e) => {
        e.preventDefault();
        axiosPublicURL().post(`api/country/update`, {
            country_name, id
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/country')
        }).catch((err) => {
            const errorMessage =
                err.response?.data?.message || err.message || "An error occurred";
            toast.error(errorMessage);
            console.log(err);
        });
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
                                <Typography sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Country Edit Form</Typography>
                                {
                                    loading ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                            <PacmanLoader
                                                speedMultiplier={3} color='#a41af4' loading={loading} size={20} />
                                        </div>
                                    ) : (
                                        <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="ID"
                                                value={id}
                                                onChange={(e) => setid(e.target.value)}
                                            />
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Country Name"
                                                value={country_name}
                                                onChange={(e) => setCountry_name(e.target.value)}
                                            />

                                        </FormControl>
                                    )}
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button variant="contained"
                                        startIcon={<EditIcon />}
                                        style={{ paddingRight: '25px', }}
                                        onClick={handleUpdate}
                                    >
                                        Update
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
