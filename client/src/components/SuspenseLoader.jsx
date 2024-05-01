import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    opacity: '0.8',
    width: '100%'
})

function SuspenseLoader() {
    return (
        <Component>
            <CircularProgress />
           
        </Component>

    )
}

export default SuspenseLoader