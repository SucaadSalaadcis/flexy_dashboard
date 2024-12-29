import React from 'react'
import Reusible_data_table from '../../reusible/Reusble_dataTable';
import { Button } from '@mui/material';

export default function Get_country() {

    const Columns = [
        { field: 'id', headerName: 'ID', width: 330 },
        { field: 'country_name', headerName: 'Country Name', width: 330 },
        {
            field: 'status',
            headerName: 'Status',
            width: 330,
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
                    <h1 className="text-2xl font-medium text-center text-[#A41AF4]">Country Data Table</h1>
                    {/* content page */}
                    <Reusible_data_table
                        apiUrl="api/country/get"
                        columns={Columns}
                        deleteApi={'country'}
                    />
                </div>
            </div>
        </main>
    )
}


