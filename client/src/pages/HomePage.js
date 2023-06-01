import React from 'react'
import ActivityLog from '../components/ActivityLog';

import Banner from '../components/Banner';
import Footer from '../components/layouts/Footer';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
    // const [auth, setAuth] = useAuth()

    return (
        <>
            <Banner />
            <ActivityLog />
            {/* <pre>{JSON.stringify(auth, null, 5)}</pre> */}

            <Footer />
        </>
    )
}

export default HomePage