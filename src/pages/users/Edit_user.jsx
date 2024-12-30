import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import Select from 'react-select';

import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

import BackIcon from '../../reusible/BackIcon';

import axiosPublicURL from '../../views/hooks/AxiosHook'

export default function Edit_user() {

  const getToken = () => {
    return Cookies.get('token');
  };

  const [id, setid] = useState('');
  const [fullname, setFullname] = useState('');
  const [user_email, setUser_email] = useState('');
  const [user_password, setUser_password] = useState('');

  const [getBranch, setGetBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [getZone, setGetZone] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [roles, setRoles] = useState('')



  const navigate = useNavigate();


  // get user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublicURL().post(
          'api/users/get',
          {},
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const data = response.data?.data;

        // get branch data
        const branchResponse = await axiosPublicURL().post('api/branch/get', {}, {
          headers: { 'Authorization': `Bearer ${getToken()}` },
        });
        const branchData = branchResponse.data.data;
        // console.log(branchData);

        // Correctly map the data to the format required by react-select
        const branch = branchData.map((item) => ({
          value: item.id,
          label: item.id,
        }));
        setGetBranch(branch);
        // console.log(branch);

        // get zone data 
        const ZoneResponse = await axiosPublicURL().post('api/zone/get', {}, {
          headers: { 'Authorization': `Bearer ${getToken()}` },
        });
        const zoneData = ZoneResponse.data.data;
        // console.log(zoneData);

        const zone = zoneData.map((item) => ({
          value: item.id,
          label: item.id,
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
    axiosPublicURL().post(`api/users/update`, {
      id,
      fullname,
      user_email,
      user_password,
      branch: selectedBranch.value,
      zone: selectedZone.value,
      roles,
    }, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(() => {
      toast.success("Updated Successfully...");
      navigate('/user')
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
              <BackIcon pathUrl={'/user'} />
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
                  User Edit Form
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
                  {/* Input for user name */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  {/* Input for email */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    value={user_email}
                    onChange={(e) => setUser_email(e.target.value)}
                  />
                  {/* Input for pass */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    value={user_password}
                    onChange={(e) => setUser_password(e.target.value)}
                  />
                  {/* Input for role 1/2 */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Role 1: admin 2: supper_admin"
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
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