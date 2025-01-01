import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import Select from 'react-select';

import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function Edit_branch() {

    const getToken = () => {
        return Cookies.get('token');
    };
    const [id, setid] = useState('');
    const [branch, setBranch] = useState('');
    const [short, setShort] = useState('');
    const [location, setLocation] = useState('');
    const [mail, setMail] = useState('');
    const [number, setNumber] = useState('');
    const [term, setTerm] = useState('');
    const [remark, setRemark] = useState('');
    const [biller, setBiller] = useState('');
    const [land, setLand] = useState('');
    const [stateId, setStateId] = useState('');
    const [cityId, setCityId] = useState('');

    const [getCity, setGetCity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [getState, setGetState] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const { branchId } = useParams();

    const navigate = useNavigate();



    const handleSingleData = async () => {
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

            // Extract data
            const branches = response.data?.data;
            console.log(branches);
            // Find the branch by ID
            const branch = branches?.find(item => item.id === parseInt(branchId));

            if (branch) {
                setBranch(branch.name || '');
                setid(branch.id);
                setShort(branch.short);
                setLocation(branch.location);
                setMail(branch.mail);
                setNumber(branch.number);
                setTerm(branch.term);
                setRemark(branch.remark);
                setBiller(branch.biller);
                setLand(branch.land);

                // Extract state details
                const stateID = branch.state.id;
                // Option for Select
                const stateOption = { value: stateID, label: stateID };
                setStateId(stateOption);

                // Extract city details
                const cityID = branch.city.id;
                // Option for Select
                const cityOption = { value: cityID, label: cityID };
                setCityId(cityOption);

            } else {
                toast.error('Branch not found.');
            }
        } catch (error) {
            console.error('Error fetching branch data:', error);
            toast.error('An error occurred while fetching branch data.');
        }
    };


    useEffect(() => {
        handleSingleData();
    }, []);



    // get branch
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
                    value: item.state?.id || null, // Use optional chaining to handle undefined/null `state`
                    label: item.state?.id || 'No State ID', // Provide a fallback label if `state.id` is unavailable
                }));

                setGetState(states);
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
        
        if (!selectedState && !selectedCity) {
            toast.error('Please select a State or City.');
            return;
        }
        const data = {
            id,
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
        axiosPublicURL().post(`api/branch/update`, data, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/branch')
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
                                    Branch Edit Form
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
                                    <Select
                                        options={getCity}
                                        value={cityId} // Selected value
                                        onChange={(selected) => {
                                            setCityId(selected); // Update selected country in state
                                            setSelectedCity(selected); // Optionally update additional state
                                        }}
                                        placeholder="Select City ID"
                                    />
                                    <Select
                                        options={getState}
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
