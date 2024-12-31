import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import BackIcon from '../../reusible/BackIcon';
import axiosPublicURL from '../../views/hooks/AxiosHook';

export default function View_site() {

    const [id, setid] = useState('');
    const [site, setSite] = useState('');
    const [short, setShort] = useState('');

    const { siteId } = useParams();


    const getToken = () => Cookies.get('token');




    const handleSingleData = async () => {
        try {
            const response = await axiosPublicURL().post(
                'api/site/get',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            // Extract data
            const sities = response.data?.data;

            // Find the country by ID
            const site = sities?.find(item => item.id === parseInt(siteId));
            console.log(site);
            
            if (site) {
                setSite(site.site || '');
                setShort(site.short || '');
                setid(site.id || '');
            } else {
                toast.error('Site not found.');
            }
        } catch (error) {
            console.error('Error fetching site data:', error);
            toast.error('An error occurred while fetching site data.');
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
                            <BackIcon pathUrl="/site" />
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

                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: '22px',
                                    }}
                                >
                                    Site View Form
                                </Typography>
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
                                    <label className='ml-1 text-2xl' htmlFor="" >Site Name :</label>
                                    <TextField
                                        required
                                        id="site-name"
                                        value={site}
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
                            </Box>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}
