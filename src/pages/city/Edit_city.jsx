import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import Select from 'react-select';

import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function Edit_city() {

    const getToken = () => {
        return Cookies.get('token');
    };

    const [id, setid] = useState('');
    const [city, setCity] = useState('');
    const [stateId, setStateId] = useState('');

    const [getStates, setGetStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    // console.log(selectedState); 

    const { cityId } = useParams();

    const navigate = useNavigate();



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

            // Find the city by ID
            const city = cities?.find(item => item.id === parseInt(cityId));
            // console.log(city);
            if (city) {
                setCity(city.name || '');
                setid(city.id || '');

                // Extract state details
                const stateID = city.state.id;

                // Option for Select
                const stateOption = { value: stateID, label: stateID };
                setStateId(stateOption);

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



    // get city
    useEffect(() => {
        const fetchData = async () => {
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



    // edit
    const handleUpdate = (e) => {
        e.preventDefault();

        if (!selectedState) {
            toast.error('Please select a state.');
            return;
        }

        axiosPublicURL().post(`api/city/update`, {
            id, city,
            state: selectedState.value,
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/city')
        }).catch((err) => {
            const errorMessage =
                err.response?.data?.message || err.message || "An error occurred";
            toast.error(errorMessage);
            console.log(err);
        });
    }


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
                                    City Edit Form
                                </Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ margin: 1, width: '100%', gap: '10px' }}
                                >
                                    {/* Input for id */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="ID"
                                        value={id}
                                        onChange={(e) => setid(e.target.value)}
                                    />
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
                                        value={stateId} // Selected value (single object with `value` and `label`)
                                        onChange={(selected) => {
                                            setStateId(selected); // Update selected country in state
                                            setSelectedState(selected); // Optionally update additional state
                                        }}
                                        placeholder="Select State ID"
                                    />
                                </FormControl>
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
