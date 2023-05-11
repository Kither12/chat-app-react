import { Box, Button, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { openModal } from '../AddUsrModal/UsrModalSlice';
import { useDispatch } from 'react-redux';
import Profile from './Profile';

export default function Header() {
    const dispatch = useDispatch();

    const handleAddUsr = () => {
        dispatch(openModal());
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    display: 'flex',
                    gap: 4,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'medium',
                        color: 'primary.contrastText',
                    }}
                >
                    Chat
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAddUsr}
                    sx={{
                        color: blue[500],
                        fontWeight: 'medium',
                        borderColor: blue[600],
                        borderRadius: 3,
                        ':hover': {
                            bgcolor: blue[600],
                            color: grey[50],
                            borderColor: blue[600],
                        },
                    }}
                >
                    NEW MESSAGE
                </Button>
            </Box>
            <Profile></Profile>
        </Box>
    );
}
