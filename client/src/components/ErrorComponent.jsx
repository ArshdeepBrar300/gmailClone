import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorComponent() {
    const error = useRouteError()

    return (
        <Box style={{ marginLeft: 250 }}>
            <Typography>There was some error</Typography>
        </Box>
    )
}

export default ErrorComponent