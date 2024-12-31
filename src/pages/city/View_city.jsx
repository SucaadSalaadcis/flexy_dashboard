import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import BackIcon from '../../reusible/BackIcon';
import axiosPublicURL from '../../views/hooks/AxiosHook';

import Select from 'react-select';

export default function View_city() {

    const [id, setId] = useState('');
    const [city, setCity] = useState('');
    const { cityId } = useParams();

    const getToken = () => Cookies.get('token');



    // Function to fetch country data
    const handleSingleData = async () => {
        try {
            const response = await axiosPublicURL().post(
                'api/city/get',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            // Extract data
            const cities = response.data?.data;

            // Find the country by ID
            const city = cities?.find(item => item.id === parseInt(cityId));

            if (city) {
                setCity(city.name || '');
                setId(city.id || '');
            } else {
                toast.error('City not found.');
            }
        } catch (error) {
            console.error('Error fetching city data:', error);
            toast.error('An error occurred while fetching city data.');
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        handleSingleData();
    }, []);





    const textFieldStyle = {
        '& input': {
            color: 'black', // Text color
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 255)', // Light background to ensure text contrast
            '& fieldset': {
                borderColor: 'white', // Border color
            },
            '&:hover fieldset': {
                borderColor: '#bd71ed', // Hover border color
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white', // Label color
        },
    };


    return (
        <body className="g-sidenav-show">
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <div className="py-4 container-fluid">
                    <div className="row">
                        <div className="mx-auto col-lg-8 col-md-10">
                            <BackIcon pathUrl={'/city'} />
                            <Box
                                sx={{
                                    position: 'relative',
                                    padding: '71px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(164, 26, 244, 0.5)',
                                    backgroundImage: 'url(https://img.freepik.com/premium-photo/view-sky-city-sunset-landscape_20658-213.jpg?w=740)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: '#fff',
                                }}
                            >
                                {/* Content page */}
                                <Typography
                                    sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '22px' }}
                                >
                                    City View Form
                                </Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ margin: 1, width: '100%', gap: '10px' }}
                                >
                                    <label className='ml-1 text-2xl' htmlFor="">ID :</label>
                                    <TextField
                                        required
                                        id="id"
                                        value={id}
                                        sx={textFieldStyle}
                                        disabled
                                    />
                                    <label className='ml-1 text-2xl' htmlFor="" >City Name :</label>
                                    <TextField
                                        required
                                        id="name"
                                        value={city}
                                        sx={textFieldStyle}
                                        disabled
                                    />
                                </FormControl>


                            </Box>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}
