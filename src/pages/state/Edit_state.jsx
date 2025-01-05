import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import Select from 'react-select';

import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

import { PacmanLoader } from 'react-spinners';

export default function Edit_state() {

    const getToken = () => {
        return Cookies.get('token');
    };

    const [id, setid] = useState('');
    const [region, setRegion] = useState('');
    const [countryId, setCountryId] = useState('');

    const [getCountry, setGetCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    // console.log(selectedState); // state id ga a dortey

    const { stateId } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const handleSingleData = async () => {
        setLoading(true);
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
            setLoading(false);
            // Extract data
            const staties = response.data?.data;

            // Find the state by ID
            const state = staties?.find((item) => item.id === parseInt(stateId));
            console.log(state);

            if (state) {
                console.log(state.country.id);

                // Update region and state ID
                setRegion(state.name || '');
                setid(state.id || '');

                // Extract country details
                const countryId = state.country.id;
                const countryName = state.country.name;

                // Option for Select
                const countryOption = { value: countryId, label: countryId };

                // Update selected country in state
                setCountryId(countryOption);
            } else {
                toast.error('City not found.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching state data:', error);
            toast.error('An error occurred while fetching state data.');
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        handleSingleData();
    }, []);



    // get country
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


    // edit
    const handleUpdate = (e) => {
        e.preventDefault();

        if (!selectedCountry) {
            toast.error('Please select Country.');
            return;
        }
        axiosPublicURL().post(`api/state/update`, {
            id, region,
            country: selectedCountry.value, // Correct field name is "country"
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/state')
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
                                    State Edit Form
                                </Typography>
                                {
                                    loading ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                            <PacmanLoader
                                                speedMultiplier={3} color='#a41af4' loading={loading} size={20} />
                                        </div>
                                    ) : (
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
                                            {/* Input for state name */}
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="State Name"
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value)}
                                            />

                                            {/* Dropdown for selecting state */}
                                            {/* <Select
                                        options={getCountry}
                                        value={selectedCountry} // Selected value
                                        onChange={setSelectedCountry} // Update selected state
                                        placeholder="Select Country ID"
                                    /> */}
                                            <Select
                                                options={getCountry} // Options list
                                                value={countryId} // Selected value (single object with `value` and `label`)
                                                onChange={(selected) => {
                                                    setCountryId(selected); // Update selected country in state
                                                    setSelectedCountry(selected); // Optionally update additional state
                                                }}
                                                placeholder="Select Country ID"
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
