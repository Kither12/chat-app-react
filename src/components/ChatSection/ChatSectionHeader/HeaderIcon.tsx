import { IconButton, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { blue } from '@mui/material/colors';

export default function HeaderIcon() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '200px',
                bgcolor: 'secondary.main',
            }}
        >
            <IconButton size="large">
                <PhoneIcon
                    fontSize="large"
                    sx={{
                        color: blue[700],
                    }}
                />
            </IconButton>
            <IconButton size="large">
                <VideocamIcon
                    fontSize="large"
                    sx={{
                        color: blue[700],
                    }}
                />
            </IconButton>
            <IconButton size="large">
                <MoreVertIcon
                    fontSize="large"
                    sx={{
                        color: blue[700],
                    }}
                />
            </IconButton>
        </Box>
    );
}
