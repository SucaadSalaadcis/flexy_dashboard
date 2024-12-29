import React from 'react'
import Reusible_data_table from '../../reusible/Reusble_dataTable';
import { Button } from '@mui/material';

export default function Get_branch() {

    const Columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'short',
            headerName: 'Short',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            color: 'white',
                            // backgroundColor: '#E53270',
                            borderRadius: '20px',
                            padding: '4px 12px', // Adjust padding for uniform size
                            textTransform: 'none',
                            minWidth: '120px', // Ensure consistent button width
                        }}
                    >
                        {params.row.short}

                    </Button>
                </>
            ),
        },


        { field: 'location', headerName: 'Location', width: 150 },
        {
            field: 'land',
            headerName: 'Land',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            color: 'white',
                            // backgroundColor: '#E53270',
                            borderRadius: '20px',
                            padding: '4px 12px', // Adjust padding for uniform size
                            textTransform: 'none',
                            minWidth: '120px', // Ensure consistent button width
                        }}
                    >
                        {params.row.land}

                    </Button>
                </>
            ),
        },
        { field: 'biller', headerName: 'Biller', width: 150 },
        { field: 'number', headerName: 'Number', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            color: 'white',
                            // backgroundColor: '#E53270',
                            borderRadius: '20px',
                            padding: '4px 12px', // Adjust padding for uniform size
                            textTransform: 'none',
                            minWidth: '120px', // Ensure consistent button width
                        }}
                    >
                        {params.row.status}

                    </Button>
                </>
            ),
        },

    ];

    return (
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid">
                <div class="row">
                    <h1 className="text-2xl font-medium text-center text-[#A41AF4]">Branch Data Table</h1>
                    {/* content page */}
                    <Reusible_data_table
                        apiUrl="api/branch/get"
                        columns={Columns}
                        deleteApi={'branch'}
                    />

                </div>
            </div>
        </main>
    )
}


