import React from 'react'
import Reusible_data_table from '../../reusible/Reusble_dataTable';
import { Button } from '@mui/material';

export default function Get_site() {

    const Columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'site', headerName: 'Site', width: 150 },
        { field: 'short', headerName: 'Short', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
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
                    <span>{params.row.branch.name}</span>
                </>
            ),
        },
        {
            field: 'zoneId',
            headerName: 'Zone ID',
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
                        {params.row.zone.id}

                    </Button>
                </>
            ),
        },
        {
            field: 'zoneName',
            headerName: 'Zone Name',
            width: 200,
            renderCell: (params) => (
                <>
                    <span>{params.row.zone.name}</span>
                </>
            ),
        },

    ];

    return (
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid">
                <div class="row">
                    <h1 className="text-2xl font-medium text-center text-[#A41AF4]">Site Data Table</h1>
                    {/* content page */}
                    <Reusible_data_table
                        apiUrl="api/site/get"
                        columns={Columns}
                        deleteApi={'site'}
                    />

                </div>
            </div>
        </main>
    )
}


