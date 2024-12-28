
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import PaginationControls from './PaginationControls'
import { Add } from './Add_Edit_View';

const ReusableDataTable = ({ apiUrl, columns }) => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [totalPages, setTotalPages] = useState(1);

    const getToken = () => Cookies.get('token');

    // Fetch data from API
    const fetchData = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiUrl}?page=${page}&limit=${pageSize}`, {}, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const data = response.data?.data || [];
            const meta = response.data?.meta || {};
            const lastPage = meta.last_page || 1;
            const currentPage = meta.current_page || 1;

            setTotalPages(lastPage);
            setCurrentPage(currentPage);
            setRows(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetchData when currentPage, apiUrl, or pageSize changes
    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, apiUrl, pageSize]);

    // Handle page size change
    const handlePageSizeChange = (event) => {
        const newPageSize = parseInt(event.target.value, 10);
        setPageSize(newPageSize); // Update page size
        setCurrentPage(1); // Reset to first page
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-between mx-auto mb-4">
                {/* Page Size Dropdown */}
                <div>
                    <label htmlFor="pageSize" className="mr-2">Page Size:</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="px-2 py-1 border border-gray-300 rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <Add />
            </div>
            {/* data grid */}
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    // columns={columns}
                    columns={[...columns,]}
                    loading={loading}
                    pagination={false}
                    hideFooter
                    disableSelectionOnClick
                    getRowHeight={() => 70} // Increase row height to fit content
                    getRowClassName={(params) =>
                        `row-${params.row.id % 2 === 0 ? 'even' : 'odd'}`
                    }
                    sx={{
                        // Styles for even and odd rows
                        '& .row-even': {
                            backgroundColor: '#f9f9f9', // Light grey for even rows
                        },
                        '& .row-odd': {
                            backgroundColor: '#ffffff', // White for odd rows
                        },

                        //& refers to the parent element where this style is being applied
                        // .MuiDataGrid-columnHeader : wa mui class
                        '& .MuiDataGrid-columnHeader': {
                            fontWeight: '',
                            fontSize: '19px',
                            color: 'black'
                        },
                        '& .MuiDataGrid-cell': {
                            display: 'flex',        // Make the cell a flex container
                            justifyContent: 'start',  // Center horizontally
                            alignItems: 'center',      // Center vertically
                            fontSize: '16px',
                            color: '#776b7f'
                        },


                    }}
                />

            </div>
            {/* Pagination Controls */}
            <PaginationControls

                currentPage={currentPage}
                totalPages={totalPages}
                pageS={pageSize}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
};

export default ReusableDataTable;

