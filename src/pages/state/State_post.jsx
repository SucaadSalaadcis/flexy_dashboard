import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';

import Select from 'react-select';

import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';
import BackIcon from '../../reusible/BackIcon';
import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function State_post() {

    const [getCountry, setGetCountry] = useState([]); // Stores the list of Country
    const [region, setRegion] = useState(''); // Stores the state name
    const [selectedCountry, setSelectedCountry] = useState(null); // Stores the selected country object
    // console.log(selectedState); // state id ga a dortey

    const navigate = useNavigate();

    const getToken = () => {
        return Cookies.get('token');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublicURL().post(
                    'api/state/get',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );

                const data = response.data.data;

                // Map the data to the required format for react-select
                const states = data.map((item) => ({
                    value: item.country.id,
                    label: item.country.id,
                }));

                setGetCountry(states);
                // console.log(states);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    
    // Post data
    const handlePost = async (e) => {
        e.preventDefault();

        if (!selectedCountry) {
            toast.error('Please select a state.');
            return;
        }

        const data = {
            region,                 // state name
            country: selectedCountry.value, // Correct field name is "country"
        };

        try {
            const response = await axiosPublicURL().post(
                'api/state/store',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            if (response.data.status) {
                toast.success(response.data.message);
                navigate('/state ');
            }
        } catch (error) {
            console.error('Error posting data:', error);
            toast.error(error.response?.data?.message || 'Failed to save the record');
        }
    };


    return (
        <body className="g-sidenav-show">
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <div className="py-4 container-fluid">
                    <div className="row">
                        <div className="mx-auto col-lg-8 col-md-10">
                            <BackIcon pathUrl={'/state'} />
                            <Paper
                                elevation={3}
                                style={{
                                    padding: '71px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(164, 26, 244, 0.5)',
                                }}
                            >
                                {/* Content page */}
                                <Typography
                                    sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}
                                >
                                    State Post Form
                                </Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ margin: 1, width: '100%', gap: '10px' }}
                                >
                                    {/* Input for state name */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="State Name"
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                    />

                                    {/* Dropdown for selecting state */}
                                    <Select
                                        options={getCountry}
                                        value={selectedCountry} // Selected value
                                        onChange={setSelectedCountry} // Update selected state
                                        placeholder="Select Country ID"
                                    />
                                </FormControl>
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        style={{ paddingRight: '25px' }}
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
    );
}
