import React from 'react'
import Reusible_data_table from '../../reusible/Reusble_dataTable';
import { Button } from '@mui/material';

export default function Get_state() {

    const Columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        {
            field: 'countryId',
            headerName: 'Country ID',
            width: 200,
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
                        {params.row.country.id}

                    </Button>
                </>
            ),
        },
        {
            field: 'countryName',
            headerName: 'Country Name',
            width: 200,
            renderCell: (params) => (
                <>
                    <span>{params.row.country.name}</span>
                </>
            ),
        },
    ];

    return (
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid">
                <div class="row">
                    <h1 className="text-2xl font-medium text-center text-[#A41AF4]">State Data Table</h1>
                    {/* content page */}
                    <Reusible_data_table
                        apiUrl="api/state/get"
                        columns={Columns}
                        deleteApi={'state'}
                    />

                </div>
            </div>
        </main>
    )
}


