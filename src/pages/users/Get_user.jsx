import React from 'react'
import Reusible_data_table from '../../reusible/Reusble_dataTable';

export default function Get_user() {

    const Columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullname', headerName: 'Fullname', width: 200 },
        { field: 'user_email', headerName: 'Email', width: 200 },

    ];

    return (
        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid">
                <div class="row">
                    <h1 className="text-2xl font-medium text-center text-[#A41AF4]">User Data Table</h1>
                    {/* content page */}
                    <Reusible_data_table
                        apiUrl="api/users/get"
                        columns={Columns}
                        deleteApi={ 'users'}
                    />
                </div>
            </div>
        </main>
    )
}


