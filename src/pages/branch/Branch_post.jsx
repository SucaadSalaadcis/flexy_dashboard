import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';

import Select from 'react-select';

import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';
import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function Branch_post() {


    const [branch, setBranch] = useState('');
    const [short, setShort] = useState('');
    const [location, setLocation] = useState('');
    const [mail, setMail] = useState('');
    const [number, setNumber] = useState('');
    const [term, setTerm] = useState('');
    const [remark, setRemark] = useState('');
    const [biller, setBiller] = useState('');
    const [land, setLand] = useState('');

    const [getCity, setGetCity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [getState, setGetState] = useState('');
    const [selectedState, setSelectedState] = useState('');


    const navigate = useNavigate();

    const getToken = () => {
        return Cookies.get('token');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublicURL().post(
                    'api/branch/get',
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
                const city = data.map((item) => ({
                    value: item.city.id,
                    label: item.city.id,
                }));
                setGetCity(city);
                // console.log(city);
                
              
                const states = data.map((item) => ({
                    value: item.state.id,
                    label: item.state.id,
                }));
                setGetState(states);
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

        if (!selectedState && !selectedCity) {
            toast.error('Please select a state.');
            return;
        }

        const data = {
            branch,
            short,
            location,
            mail,
            number,
            term,
            remark,
            biller,
            land,
            city: selectedCity.value,
            state: selectedState.value
        };

        try {
            const response = await axiosPublicURL().post(
                'api/branch/store',
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
                navigate('/branch ');
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
                            <BackIcon pathUrl={'/branch'} />
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
                                    Branch Post Form
                                </Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ margin: 1, width: '100%', gap: '10px' }}
                                >
                                    {/* Input for branch name */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Branch Name"
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                    />
                                    {/* Input for short  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Short"
                                        value={short}
                                        onChange={(e) => setShort(e.target.value)}
                                    />
                                    {/* Input for location  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Location "
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                    {/* Input for mail  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Mail "
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                    />
                                    {/* Input for number */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Number"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                    {/* Input for term  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Term"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                    />
                                    {/* Input for remark  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Remark"
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                    {/* Input for biller  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Biller"
                                        value={biller}
                                        onChange={(e) => setBiller(e.target.value)}
                                    />
                                    {/* Input for land  */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Land"
                                        value={land}
                                        onChange={(e) => setLand(e.target.value)}
                                    />

                                    {/* Dropdown for selecting  */}
                                    <Select
                                        options={getCity}
                                        value={selectedCity} // Selected value
                                        onChange={setSelectedCity} // Update selected state
                                        placeholder="Select City ID"
                                    />
                                    <Select
                                        options={getState}
                                        value={selectedState} 
                                        onChange={setSelectedState} 
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
