import React from 'react'
import Reusible_data_table from '../../reusible/Reusble_dataTable';
import { Button } from '@mui/material';

export default function Get_zone() {

    const Columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'zone', headerName: 'Zone', width: 200 },
        { field: 'short', headerName: 'short', width: 150 },
        {
            field: 'branchId',
            headerName: 'Branch ID',
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
                        {params.row.branch.id}

                    </Button>
                </>
            ),
        },
        {
            field: 'branchName',
            headerName: 'Branch Name',
            width: 200,
            renderCell: (params) => (
                <>
                    {params.row.branch.name}
                </>
            ),
        },


        {
            field: 'status',
            headerName: 'Status',
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
                    <h1 className="text-2xl font-medium text-center text-[#A41AF4]">Zone Data Table</h1>
                    {/* content page */}
                    <Reusible_data_table
                        apiUrl="api/zone/get"
                        columns={Columns}
                        deleteApi={'zone'}
                    />
                </div>
            </div>
        </main>
    )
}


