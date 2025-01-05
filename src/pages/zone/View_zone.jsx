import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import BackIcon from '../../reusible/BackIcon';
import axiosPublicURL from '../../views/hooks/AxiosHook';

import { PacmanLoader } from 'react-spinners';

export default function View_zone() {

    const [id, setid] = useState('');
    const [zone, setZone] = useState('');
    const [short, setShort] = useState('');

    const { zoneId } = useParams();


    const getToken = () => Cookies.get('token');

    const [loading, setLoading] = useState(false);


    const handleSingleData = async () => {
        setLoading(true);
        try {
            const response = await axiosPublicURL().post(
                'api/zone/get',
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
            const zonies = response.data?.data;

            // Find the country by ID
            const zone = zonies?.find(item => item.id === parseInt(zoneId));
            console.log(zone);

            if (zone) {
                setZone(zone.zone || '');
                setShort(zone.short || '');
                setid(zone.id || '');
            } else {
                toast.error('Zone not found.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching zone data:', error);
            toast.error('An error occurred while fetching zone data.');
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
                            <BackIcon pathUrl="/zone" />
                            <Box
                                sx={{
                                    position: 'relative',
                                    padding: '71px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(164, 26, 244, 0.5)',
                                    backgroundImage: 'url(https://img.freepik.com/premium-photo/bright-beautiful-sunset-outside-city-orange-blue_356877-1518.jpg?w=740)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: '#fff',
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: '22px',
                                    }}
                                >
                                    Zone View Form
                                </Typography>
                                {
                                    loading ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                            <PacmanLoader
                                                speedMultiplier={3}
                                                color="rgba(255, 255, 255, 0.7)" // Semi-transparent white color
                                                loading={loading}
                                                size={20}
                                            />
                                        </div>
                                    ) : (
                                        <FormControl
                                            variant="standard"
                                            sx={{ margin: 1, width: '100%', gap: '10px' }}
                                        >
                                            <label className='ml-1 text-2xl' htmlFor="">ID :</label>
                                            <TextField
                                                required
                                                id="zone-id"
                                                // label="ID"
                                                value={id}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            <label className='ml-1 text-2xl' htmlFor="" >Zone Name :</label>
                                            <TextField
                                                required
                                                id="zone-name"
                                                value={zone}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            <label className='ml-1 text-2xl' htmlFor="" >Short :</label>
                                            <TextField
                                                required
                                                id="short"
                                                value={short}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                        </FormControl>
                                    )}
                            </Box>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}
