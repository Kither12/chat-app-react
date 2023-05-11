import { avataaarsNeutral } from '@dicebear/collection';

import { Avatar, Typography, Box } from '@mui/material';
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import HeaderIcon from './HeaderIcon';

export default function ChatSectionHeader() {
    const usrID = useSelector((state: RootState) => state.UsrSlice.selectedUID);
    const usrName = useSelector(
        (state: RootState) => state.UsrSlice.selectedName
    );

    const avatar = useMemo(() => {
        return createAvatar(avataaarsNeutral, {
            size: 512,
            seed: usrID,
        }).toDataUriSync();
    }, [usrID]);

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                }}
            >
                <Avatar
                    src={avatar}
                    sx={{
                        marginLeft: '24px',
                        width: 58,
                        height: 58,
                        marginRight: '24px',
                    }}
                />
                <Typography
                    sx={{
                        color: 'primary.contrastText',
                        fontWeight: 'bold',
                        fontSize: '18px',
                    }}
                >
                    {usrName}
                </Typography>
            </Box>
            <HeaderIcon></HeaderIcon>
        </Box>
    );
}
