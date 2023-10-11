import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPasswordAsync } from '../../Contexts/actionCreators/authActionCreator';
import { getUsers } from '../../Contexts/actionCreators/ userActionCreator';

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);
  
    const selectUsers = (state) => state.users.users;
    const userData = useSelector(selectUsers);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const currentUserData = userData.find(user => user.docId === currentUser?.uid);

    const handleLogin = async (e) => {
        e.preventDefault();
      
        if (!email || !password) {
          toast.error('Please fill in both email and password fields.', {
            position: 'top-center',
            autoClose: 2000,
          });
          return;
        }
      
        try {
          await dispatch(signInWithEmailAndPasswordAsync(email, password));
      
      
            navigate('/Dashboard');
       
        } catch (error) {
          console.error('Error signing in:', error);
        }
      };
      


    return (
        <div className="w-full max-w-md py-5">
            <p className="font-semibold text-lg text-gray-500 text-center mb-4">Please Log in to continue</p>
            <p className="font-semibold text-sm text-gray-600 text-center mb-4">LOGIN: email: johndoe@gmail.com, password: Password.123</p>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={() => (handleLogin)}
                    className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default SignInForm