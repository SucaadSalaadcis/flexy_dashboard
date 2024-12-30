
///// short way 

import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';


const pathMap = [

    { path: '/country', endpoint: 'country_post', editEndPoint: 'edit_country', viewEndpoint: 'agent_view' },
    { path: '/state', endpoint: 'state_post', editEndPoint: 'edit_state', viewEndpoint: 'customer_view' },
    { path: '/city', endpoint: 'city_post', editEndPoint: 'edit_city', viewEndpoint: 'product_view' },
    { path: '/branch', endpoint: 'branch_post', editEndPoint: 'edit_branch', viewEndpoint: 'role_view' },
    { path: '/zone', endpoint: 'zone_post', editEndPoint: 'edit_zone', viewEndpoint: 'users_view' },
    { path: '/site', endpoint: 'site_post', editEndPoint: 'edit_site', viewEndpoint: 'order_view' },
    { path: '/user', endpoint: 'user_post', editEndPoint: 'edit_user', viewEndpoint: 'order_view' },
];



// edit functionallity
export function Edit({ EditParam }) {

    const location = useLocation();

    const match = pathMap.find(item => item.path === location.pathname);
    // console.log(match)
    if (!match) return null;

    // Construct 
    const url = `/${match.editEndPoint}/${EditParam}`;

    return (
        <Link to={url}>
            <EditIcon style={{ color: '#a41af4' }} />
        </Link>
    )
}


// veiw functionallity
export function View({ veiwParam }) {

    const location = useLocation();

    const match = pathMap.find(item => item.path === location.pathname);

    if (!match) return null;

    const url = `/${match.viewEndpoint}/${veiwParam}`;

    return (
        <Link to={url}>
            <VisibilityIcon style={{ color: "green", marginLeft: '8px' }} />
        </Link>
    )
}

import AddCircleIcon from '@mui/icons-material/AddCircle';
// add functionallity
export function Add() {

    const location = useLocation();

    const match = pathMap.find(item => item.path === location.pathname);
    // console.log(match)
    if (!match) return null;

    // Construct 
    const url = `/${match.endpoint}`;

    return (

        <Link to={url}>
            <Button variant='contained' sx={{ padding: '10px' }}>
                <AddCircleIcon sx={{ fontSize: '2rem' }} />
            </Button>
        </Link>

    )
}









