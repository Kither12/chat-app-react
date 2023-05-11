import { Paper, Button, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputBase, Toolbar } from '@mui/material';
import { useState } from 'react';
import { blue, grey } from '@mui/material/colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';
import { registerUsr } from '../../database';

const Input = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 100,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: 0,
    width: '100%',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    width: '100%',
}));

export default function Signup(props: { signInChange: () => void }) {
    const [isFocused, setIsFocused] = useState(false);
    const [usrName, setUsrName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const isValid = emailRegex.test(email);
    const navigate = useNavigate();

    const HandleUsrName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 16) return;
        setUsrName(e.target.value);
    };
    const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const HanldePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const HandleSignup = () => {
        if (!isValid) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                registerUsr(userCredential.user.uid, usrName);
                navigate('/');
            })
            .catch(error => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                setEmail('');
                setPassword('');
            });
    };
    const HandleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            HandleSignup();
        }
    };

    return (
        <Paper
            onKeyDown={HandleKeyDown}
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '100px',
                paddingRight: '100px',
                paddingTop: '30px',
                paddingBottom: '100px',
                borderColor: grey[400],
                borderRadius: '12px',
                borderWidth: '6px',
                borderStyle: 'solid',
            }}
        >
            <Typography
                fontSize={40}
                sx={{
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                }}
            >
                SIGN UP
            </Typography>
            <Typography
                sx={{
                    color: 'secondary.contrastText',
                }}
            >
                Please enter your email and password!
            </Typography>

            <Toolbar>
                <Input>
                    <StyledInputBase
                        placeholder="User name"
                        inputProps={{ 'aria-label': 'search' }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        sx={{
                            color: isFocused
                                ? 'primary.contrastText'
                                : 'secondary.contrastText',
                        }}
                        onChange={HandleUsrName}
                        value={usrName}
                    />
                </Input>
            </Toolbar>

            <Toolbar>
                <Input>
                    <StyledInputBase
                        placeholder="Email"
                        inputProps={{ 'aria-label': 'search' }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        sx={{
                            color:
                                !isValid && email.length > 0
                                    ? 'red'
                                    : isFocused
                                    ? 'primary.contrastText'
                                    : 'secondary.contrastText',
                        }}
                        onChange={HandleEmail}
                        value={email}
                    />
                </Input>
            </Toolbar>
            <Toolbar>
                <Input>
                    <StyledInputBase
                        placeholder="Password"
                        inputProps={{ 'aria-label': 'search' }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        type="password"
                        sx={{
                            color: isFocused
                                ? 'primary.contrastText'
                                : 'secondary.contrastText',
                        }}
                        onChange={HanldePassword}
                        value={password}
                    />
                </Input>
            </Toolbar>
            <Box
                sx={{
                    display: 'flex',
                    marginTop: '24px',
                }}
            >
                <Button
                    variant="contained"
                    onClick={HandleSignup}
                    sx={{
                        marginLeft: '12px',
                    }}
                >
                    Confirm
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    marginTop: '20px',
                }}
            >
                <Typography
                    sx={{
                        paddingRight: '8px',
                        color: 'white',
                    }}
                >
                    Already have account?{' '}
                </Typography>
                <Link
                    onClick={props.signInChange}
                    sx={{
                        color: blue[800],
                    }}
                >
                    Sign in
                </Link>
            </Box>
        </Paper>
    );
}
