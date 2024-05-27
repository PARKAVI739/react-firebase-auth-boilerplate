import React, { useState } from 'react';
import { doPasswordChange, doSignOut } from '../../../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, reauthenticateWithPopup, GoogleAuthProvider, EmailAuthProvider, updatePassword } from "firebase/auth";

const ChangePassword = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChanging, setIsChanging] = useState(false);

    const promptForCredentials = () => {
        const email = prompt("Enter your email:");
        const password = prompt("Enter your password:");
        return EmailAuthProvider.credential(email, password);
    };

    const reauthenticateUser = async () => {
        try {
            const user = auth.currentUser;
            if (user.providerData[0].providerId === 'password') {
                const credential = promptForCredentials();
                await user.reauthenticateWithCredential(credential);
            } else if (user.providerData[0].providerId === 'google.com') {
                const provider = new GoogleAuthProvider();
                await reauthenticateWithPopup(user, provider);
            }
            return true;
        } catch (error) {
            console.error("Re-authentication error:", error);
            toast.error("Re-authentication failed. Please try again.");
            return false;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!isChanging) {
            setIsChanging(true);
            try {
                const user = auth.currentUser;
                await updatePassword(user, newPassword);
                toast.success('Password changed successfully. You will be logged out shortly.');
                setTimeout(async () => {
                    await doSignOut();
                    navigate('/login');
                }, 3000);
            } catch (error) {
                if (error.code === 'auth/requires-recent-login') {
                    const reauthenticated = await reauthenticateUser();
                    if (reauthenticated) {
                        try {
                            const user = auth.currentUser;
                            await updatePassword(user, newPassword);
                            toast.success('Password changed successfully. You will be logged out shortly.');
                            setTimeout(async () => {
                                await doSignOut();
                                navigate('/login');
                            }, 3000);
                        } catch (updateError) {
                            console.error('Password update error after re-authentication:', updateError);
                            toast.error('Failed to change password after re-authentication. Please try again.');
                        }
                    }
                } else {
                    console.error('Password update error:', error);
                    toast.error('Failed to change password. Please try again.');
                }
            } finally {
                setIsChanging(false);
            }
        }
    };

    return (
        <div>
            <ToastContainer />

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Change Password</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                New Password
                            </label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isChanging}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isChanging ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isChanging ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ChangePassword;
