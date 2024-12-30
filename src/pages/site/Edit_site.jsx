import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import Select from 'react-select';

import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function Edit_site() {

    const getToken = () => {
        return Cookies.get('token');
    };

    const [id, setid] = useState('');
    const [site, setSite] = useState('');
    const [short, setShort] = useState('');
    const [getBranch, setGetBranch] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [getZone, setGetZone] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);
    // console.log(selectedBranch,selectedZone);



    const navigate = useNavigate();

    // get site
    useEffect(() => {
        const fetchData = async () => {
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

                const data = response.data.data;

                // Map the data to the required format for react-select
                const branch = data.map((item) => ({
                    value: item.branch.id,
                    label: item.branch.id,
                }));

                setGetBranch(branch);
                // console.log(branch);


                const zone = data.map((item) => ({
                    value: item.zone.id,
                    label: item.zone.id,
                }));

                setGetZone(zone);
                // console.log(zone);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    // edit
    const handleUpdate = (e) => {
        e.preventDefault();
        axiosPublicURL().post(`api/site/update`, {
            id,
            site,
            short,
            branch: selectedBranch.value,
            zone: selectedZone.value,
        }, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(() => {
            toast.success("Updated Successfully...");
            navigate('/site')
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
                            <BackIcon pathUrl={'/site'} />
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
                                    Site Edit Form
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
                                    {/* Input for site name */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Site Name"
                                        value={site}
                                        onChange={(e) => setSite(e.target.value)}
                                    />
                                    {/* Input for short */}
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Short"
                                        value={short}
                                        onChange={(e) => setShort(e.target.value)}
                                    />

                                    {/* Dropdown for selecting */}
                                    <Select
                                        options={getBranch}
                                        value={selectedBranch} // Selected value
                                        onChange={setSelectedBranch} // Update selected branch
                                        placeholder="Select Branch ID"
                                    />
                                    <Select
                                        options={getZone}
                                        value={selectedZone}
                                        onChange={setSelectedZone}
                                        placeholder="Select Zone ID"
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
