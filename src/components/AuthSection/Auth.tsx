import { Box } from '@mui/material';
import Signup from './Signup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { changeUsr } from '../UsrSlice';
import { auth } from '../../firebase';

export default function Auth() {
    const HandleLoginChange = () => {
        setAuthJSX(<Login signUpChange={HandleSignUpChange}></Login>);
    };
    const HandleSignUpChange = () => {
        setAuthJSX(<Signup signInChange={HandleLoginChange}></Signup>);
    };
    const [authJSX, setAuthJSX] = useState(
        <Login signUpChange={HandleSignUpChange}></Login>
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            dispatch(changeUsr(user?.uid));
            if (user !== null) {
                navigate('/');
            }
        });

        return unsubscribe;
    }, [dispatch, navigate]);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            {authJSX}
        </Box>
    );
}
