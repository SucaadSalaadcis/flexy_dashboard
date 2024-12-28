import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';

import Select from 'react-select';

import axios from 'axios';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';
import BackIcon from '../../reusible/BackIcon';

export default function City_post() {

    const [getStates, setGetStates] = useState([]); // Stores the list of states
    const [city, setCity] = useState(''); // Stores the city name
    const [selectedState, setSelectedState] = useState(null); // Stores the selected state object
    // console.log(selectedState); // state id ga a dortey

    const navigate = useNavigate();

    const getToken = () => {
        return Cookies.get('token');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://peculiar-darkness-68u4yutcfh.ploi.dev/api/city/get',
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
                    value: item.state.id,
                    label: item.state.id,
                }));

                setGetStates(states);
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

        if (!selectedState) {
            toast.error('Please select a state.');
            return;
        }

        const data = {
            city,                 // City name
            state: selectedState.value, // Correct field name is "state"
        };

        try {
            const response = await axios.post(
                'https://peculiar-darkness-68u4yutcfh.ploi.dev/api/city/store',
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
                navigate('/city ');
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
                            <BackIcon pathUrl={'/city'} />
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
                                    City Post Form
                                </Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ margin: 1, width: '100%', gap: '10px' }}
                                >
                                    {/* Input for city name */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="City Name"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />

                                    {/* Dropdown for selecting state */}
                                    <Select
                                        options={getStates}
                                        value={selectedState} // Selected value
                                        onChange={setSelectedState} // Update selected state
                                        placeholder="Select State ID"
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
