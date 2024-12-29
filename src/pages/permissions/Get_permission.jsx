import React from "react";
import ReusableDataTable from "../../reusible/Reusble_dataTable";

const Get_permission = () => {
    const columns = ['id', 'value', 'label'];

    return (
        <div>
            <ReusableDataTable
                url="api/permissions/load"
                columns={columns}
                deleteApi={'permissions'}
            />
        </div>
    );
};

export default Get_permission;
