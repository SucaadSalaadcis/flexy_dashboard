
//
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import PaginationControls from "./PaginationControls";
import { Add, Edit, View } from "./Add_Edit_View";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosPublicURL from "../views/hooks/AxiosHook";

const ReusableDataTable = ({ apiUrl, columns, deleteApi }) => {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

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
            const total = meta.total || data.length;
            const lastPage = Math.ceil(total / pageSize);

            setRows(data);
            setFilteredRows(data);
            setTotalPages(lastPage);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);


    // Handle search query change
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            const filtered = rows.filter((row) =>
                /*   rows.filter((row) => ...): Loops through each row in the rows array and keeps only the rows that match the condition inside the filter() function.
    Object.values(row): Converts the row object into an array of its values (e.g., for { id: 1, name: 'John' }, it becomes [1, 'John']).
    .some((value) => ...): Checks if any value in the row matches the search query.
    value.toString().toLowerCase().includes(query):
    .includes(query): Checks if the value contains the search query. */

                Object.values(row).some(
                    (value) =>
                        value &&
                        value.toString().toLowerCase().includes(query)
                )
            );
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows);
        }
    };


    // Handle page size change
    const handlePageSizeChange = (event) => {
        const newPageSize = parseInt(event.target.value, 10);
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to the first page
    };


    // Handle delete action
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
                        { id },
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        }
                    )
                    .then(() => {
                        fetchData(currentPage, pageSize); // Refresh data after deletion
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
                <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon style={{ color: "#E53270" }} />
                </IconButton>
                <Edit EditParam={params.row.id} />
                <View viewParam={params.row.id} />
            </>
        ),
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
                <div>
                    <label htmlFor="search" className="mr-2">
                        Search:
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="px-2 py-1 border border-gray-300 rounded"
                    />
                </div>

            </div>
            <div className="mb-3">
                <Add />
            </div>
            <div style={{ width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={[...columns, actionColumn]}
                    loading={loading}
                    pagination={false}
                    hideFooter
                    disableSelectionOnClick
                    getRowHeight={() => 70}
                    sx={{
                        "& .MuiDataGrid-columnHeader": {
                            fontWeight: "bold",
                            fontSize: "16px",
                        },
                        "& .MuiDataGrid-cell": {
                            fontSize: "14px",
                            color: "#555",
                        },
                    }}
                />
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ReusableDataTable;

