import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { doPasswordReset } from '../../../firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isSending, setIsSending] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSending) {
            setIsSending(true)
            try {
                await doPasswordReset(email)
                toast.success('Password reset email sent successfully')
                setIsSending(false)
            } catch (error) {
                toast.error('Failed to send password reset email')
                setIsSending(false)
            }
        }
    }

    return (
        <div>
            <ToastContainer />

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Reset Password</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSending ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSending ? 'Sending...' : 'Send Reset Email'}
                        </button>
                    </form>
                    <p className="text-center text-sm">
                        Remembered your password? <Link to={'/login'} className="hover:underline font-bold">Login</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default ForgotPassword
