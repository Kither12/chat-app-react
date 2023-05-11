import { Paper, Button, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputBase, Toolbar } from '@mui/material';
import { useState } from 'react';
import { grey, blue } from '@mui/material/colors';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

export default function Login(props: { signUpChange: () => void }) {
    const [isFocused, setIsFocused] = useState(false);
    const [usrName, setUsrName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const HandleUsrName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsrName(e.target.value);
    };
    const HanldePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const HandleSignin = () => {
        signInWithEmailAndPassword(auth, usrName, password)
            .then(userCredential => {
                navigate('/');
            })
            .catch(error => {
                // const errorCode = error.code;
                //const errorMessage = error.message;
                setUsrName('');
            });
    };
    const HandleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            HandleSignin();
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
                SIGN IN
            </Typography>
            <Typography
                sx={{
                    color: 'secondary.contrastText',
                }}
            >
                Please Enter your login and password!
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
                    onClick={HandleSignin}
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
                    Don't have account?{' '}
                </Typography>
                <Link
                    onClick={props.signUpChange}
                    sx={{
                        color: blue[800],
                    }}
                >
                    Sign up
                </Link>
            </Box>
        </Paper>
    );
}
