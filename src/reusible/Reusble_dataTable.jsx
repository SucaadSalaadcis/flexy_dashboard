import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Cookies from "js-cookie";
import PaginationControls from "./PaginationControls";
import { Add, Edit, View } from "./Add_Edit_View";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import axiosPublicURL from "../views/hooks/AxiosHook";
import { FaSearch, FaTimes } from "react-icons/fa";

const ReusableDataTable = ({ apiUrl, columns, deleteApi }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [filteredRows, setFilteredRows] = useState([]); // Filtered rows for search

    const getToken = () => Cookies.get("token");

    // Fetch data from API
    const fetchData = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const response = await axiosPublicURL().post(
                `${apiUrl}?page=${page}&per_page=${pageSize}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const data = response.data?.data || [];
            const meta = response.data?.meta || {};
            const lastPage = Math.ceil(meta.total / pageSize);
            // const currentPage = meta.page || 1; // Correct page number in the response
            const total = meta.total || data.length;
            // const lastPage = Math.ceil(total / pageSize);

            setTotalPages(lastPage);
            setCurrentPage(currentPage);
            setRows(data);
            setFilteredRows(data); // Initialize filtered rows
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

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

    // Handle search query change
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            /*   rows.filter((row) => ...): Loops through each row in the rows array and keeps only the rows that match the condition inside the filter() function.
      Object.values(row): Converts the row object into an array of its values (e.g., for { id: 1, name: 'John' }, it becomes [1, 'John']).
      .some((value) => ...): Checks if any value in the row matches the search query.
      value.toString().toLowerCase().includes(query):
      .includes(query): Checks if the value contains the search query. */

            const filtered = rows.filter((row) =>
                Object.values(row).some(
                    (value) =>
                        value &&
                        value.toString().toLowerCase().includes(query)
                )
            );
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows); // Reset to original rows if search query is empty
        }
    };

    // delete data
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublicURL()
                    .post(
                        `api/${deleteApi}/delete/`,
                        { id }, // Send the id in the body
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        }
                    )
                    .then(() => {
                        fetchData();
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting the record:", error);
                        Swal.fire(
                            "Error!",
                            error.response?.data?.message || "Failed to delete the record.",
                            "error"
                        );
                    });
            }
        });
    };

    // Add a custom action column
    const actionColumn = {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
            <>
                <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(params.row.id)}
                >
                    <DeleteIcon style={{ color: "#E53270" }} />
                </IconButton>
                {/* edit component */}
                <Edit EditParam={params.row.id} />

                {/* edit view */}
                <View veiwParam={params.row.id} />
            </>
        ),
    };

    // Clear the search query
    const handleClearSearch = () => {
        setSearchQuery(""); // Clear the search query
        setFilteredRows(rows); // Reset to original rows when cleared
    };


    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-between mx-auto mb-4">

                {/* Page Size Dropdown */}
                <div>
                    <label htmlFor="pageSize" className="mr-2">
                        Page Size:
                    </label>
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

                {/* Search Bar */}
                <div className="relative">
                    <input

                        id="search"
                        autoComplete="off"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder={'Search...'}
                        className={` transition-all duration-300 ease-in-out focus:w-64 focus:outline-none focus:ring-2 w-32 focus:ring-blue-500 px-3 py-2 pr-8 border border-gray-300 rounded`}
                    />
                    <div className="absolute inset-y-0 flex items-center right-2">
                        {searchQuery ? (
                            <FaTimes
                                onClick={handleClearSearch}
                                className="text-gray-500 cursor-pointer"
                            />
                        ) : (
                            <FaSearch className="text-gray-500" />
                        )}
                    </div>
                </div>

            </div>
            <div className="mb-3">
                <Add />
            </div>
            {/* Data Grid */}
            <div style={{ width: "100%" }}>
                <DataGrid
                    rows={filteredRows} // Use filtered rows for display
                    columns={[...columns, actionColumn]}
                    loading={loading}
                    pagination={false}
                    hideFooter
                    disableSelectionOnClick
                    getRowHeight={() => 70} // Increase row height to fit content
                    getRowClassName={(params) =>
                        `row-${params.row.id % 2 === 0 ? "even" : "odd"}`
                    }
                    sx={{
                        // Styles for even and odd rows
                        "& .row-even": {
                            backgroundColor: "#f9f9f9", // Light grey for even rows
                        },
                        "& .row-odd": {
                            backgroundColor: "#ffffff", // White for odd rows
                        },
                        "& .MuiDataGrid-columnHeader": {
                            fontSize: "19px",
                            color: "black",
                        },
                        "& .MuiDataGrid-cell": {
                            fontSize: "16px",
                            color: "#776b7f",
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
