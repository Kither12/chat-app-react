import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { avataaarsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMemo } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Profile() {
    const uid = useSelector((state: RootState) => state.UsrSlice.UID);
    const name = useSelector((state: RootState) => state.UsrSlice.name);

    const handleCopyToClipBoard = () => {
        navigator.clipboard.writeText(uid);
    };

    const avatar = useMemo(() => {
        return createAvatar(avataaarsNeutral, {
            size: 512,
            seed: uid,
        }).toDataUriSync();
    }, [uid]);
    return (
        <Box
            sx={{
                display: 'flex',
                paddingTop: '12px',
                paddingRight: '36px',
            }}
        >
            <Box>
                <Avatar
                    src={avatar}
                    sx={{
                        width: 64,
                        height: 64,
                        marginRight: '24px',
                    }}
                />
            </Box>
            <Box>
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                    }}
                >
                    {name}
                </Typography>
                <Button
                    onClick={handleCopyToClipBoard}
                    variant="contained"
                    endIcon={<ContentCopyIcon />}
                >
                    UID
                </Button>
            </Box>
        </Box>
    );
}
