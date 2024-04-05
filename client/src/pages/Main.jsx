import React, { useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import SuspenseLoader from '../components/SuspenseLoader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function Main() {
    const [openDrawer, setOpenDrawer] = useState(true);
    const toggleDrawer = () => {
        setOpenDrawer(prev => !prev)
    }
    return (
        <div>
            <Header toggleDrawer={toggleDrawer} />
            <SideBar openDrawer={openDrawer} />
            <Suspense fallback={<SuspenseLoader />}>
                <Outlet context={{ openDrawer }} />
            </Suspense>
            {/* <Emails openDrawer={openDrawer} /> */}
        </div>
    )
}

export default Main