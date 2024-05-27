import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div className='text-2xl font-bold pt-14'>
            Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
            <div className='mt-4'>
                <Link to="/change-password" className="text-sm text-blue-600 underline">
                    Change Password
                </Link>
            </div>
        </div>
    )
}

export default Home
