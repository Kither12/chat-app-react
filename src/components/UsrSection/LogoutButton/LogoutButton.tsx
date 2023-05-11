import { Button } from '@mui/material';
import { blue, indigo } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';

export default function LogoutButton() {
    const navigate = useNavigate();
    const HandleLogout = async () => {
        await signOut(auth);
        navigate('/auth');
    };

    return (
        <Button
            variant="contained"
            onClick={HandleLogout}
            sx={{
                marginTop: '24px',
                marginLeft: '60px',
                width: '252px',
                height: '64px',
                bgcolor: blue[700],
                ':hover': {
                    bgcolor: indigo[800],
                },
            }}
        >
            LOG OUT
        </Button>
    );
}
