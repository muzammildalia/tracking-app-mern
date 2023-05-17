import React from 'react'
import ActivityLog from '../components/ActivityLog';

import Banner from '../components/Banner';
import Footer from '../components/layouts/Footer';
import Layout from '../components/layouts/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
    const [auth, setAuth] = useAuth()
    return (
        <>
            <Banner />
            <ActivityLog />
            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}

            <Footer />
        </>
    )
}

export default HomePage