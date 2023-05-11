import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { closeModal } from './UsrModalSlice';
import { useState } from 'react';
import { KeyboardEvent } from 'react';
import { addUsr, getUsrName } from '../../database';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { checkUsrExits } from '../../database';
import { addUsr as addUsrSlice } from '../UsrSlice';

export default function AddUsrModal() {
    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const uid = useSelector((state: RootState) => state.UsrSlice.UID);

    const usrList = useSelector((state: RootState) => state.UsrSlice.usrList);

    const handleCancel = () => {
        dispatch(closeModal());
    };
    const handleConfirm = async () => {
        const regex = /[.#$[\]]/;

        if (regex.test(input)) {
            setError(true);
            return;
        }
        if (usrList.filter(item => item.uid === input).length > 0) {
            setError(true);
            return;
        }

        if (uid === input) {
            setError(true);
            return;
        }

        const valid = await checkUsrExits(input);
        if (!valid) {
            setError(true);
            return;
        } else {
            await addUsr(uid, input);
            const name = await getUsrName(input);
            dispatch(addUsrSlice({ uid: input, name }));
            dispatch(closeModal());
        }
    };
    const HandleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleConfirm();
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setError(false);
    };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    bgcolor: 'rgba(0, 0, 0, 0.2)',
                    zIndex: 'modal',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onKeyDown={HandleKeyDown}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '500px',
                        height: '300px',
                        bgcolor: grey[900],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '25px',
                            color: 'white',
                        }}
                    >
                        Enter UID
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Enter UID"
                        variant="outlined"
                        focused
                        color={error ? 'error' : 'warning'}
                        onChange={handleInputChange}
                        value={input}
                        sx={{
                            marginTop: '40px',
                            color: 'white',
                            width: '250px',
                        }}
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'orange',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            marginTop: '36px',
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleCancel}
                            sx={{
                                marginRight: '24px',
                                bgcolor: blue[700],
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleConfirm}
                            sx={{
                                marginLeft: '24px',
                                bgcolor: blue[700],
                            }}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}
