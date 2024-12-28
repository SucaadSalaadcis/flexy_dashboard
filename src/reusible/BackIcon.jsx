import { Button, IconButton } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function BackIcon({pathUrl}) {
  return (
    <div>
      <Link to={pathUrl}>
        <Button aria-label="back" variant='contained' sx={{ marginBottom: '10px', }}>
          <ArrowBackIcon style={{ color: "white" }} />
          Back
        </Button>
      </Link>
    </div>
  )
}
