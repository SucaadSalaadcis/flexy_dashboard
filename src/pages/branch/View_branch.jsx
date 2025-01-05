import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, FormControl, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';


import toast from 'react-hot-toast';


import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

import { PacmanLoader } from 'react-spinners';

export default function View_branch() {

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

    const { branchId } = useParams();

    const [loading, setLoading] = useState(false);


    const handleSingleData = async () => {
        setLoading(true);
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
            setLoading(false);
            // Extract data
            const branches = response.data?.data;
            console.log(branches);
            // Find the country by ID
            const branch = branches?.find(item => item.id === parseInt(branchId));

            if (branch) {
                setBranch(branch.name || '');
                setid(branch.id || '');
                setShort(branch.short);
                setLocation(branch.location);
                setMail(branch.mail);
                setNumber(branch.number);
                setTerm(branch.term);
                setRemark(branch.remark);
                setBiller(branch.biller);
                setLand(branch.land);
            } else {
                toast.error('Zone not found.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching branch data:', error);
            toast.error('An error occurred while fetching branch data.');
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
                            <BackIcon pathUrl={'/branch'} />
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

                                {/* Content page */}
                                <Typography
                                    sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', fontSize: '22px' }}
                                >
                                    Branch View Form
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
                                            {/* Input for id */}
                                            <label className='ml-1 text-2xl' htmlFor="" >ID :</label>
                                            <TextField
                                                required
                                                id="id"
                                                value={id}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for branch name */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Branch Name :</label>
                                            <TextField
                                                required
                                                id="branch-name"
                                                value={branch}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for short  */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Short :</label>
                                            <TextField
                                                required
                                                id="short"
                                                value={short}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for location  */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Location :</label>
                                            <TextField
                                                required
                                                id="location"
                                                value={location}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for mail  */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Email :</label>
                                            <TextField
                                                required
                                                id="email"
                                                value={mail}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for number */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Number :</label>
                                            <TextField
                                                required
                                                id="number"
                                                value={number}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for term */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Term :</label>
                                            <TextField
                                                required
                                                id="term"
                                                value={term}
                                                sx={textFieldStyle}
                                                disabled
                                            />

                                            {/* Input for remark  */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Remark :</label>
                                            <TextField
                                                required
                                                id="remark"
                                                value={remark}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for biller  */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Biller :</label>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                value={biller}
                                                sx={textFieldStyle}
                                                disabled
                                            />
                                            {/* Input for land  */}
                                            <label className='ml-1 text-2xl' htmlFor="" >Land :</label>
                                            <TextField
                                                required
                                                id="land"
                                                value={land}
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
    )
}
