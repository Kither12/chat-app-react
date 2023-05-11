import { Box, Avatar, Typography } from '@mui/material';
import { avataaarsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMemo } from 'react';
import { blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectedUsr } from '../../UsrSlice';

export default function UsrTag(props: {
    data: { usrName: string; userID: string; selected: boolean };
}) {
    const avatar = useMemo(() => {
        return createAvatar(avataaarsNeutral, {
            size: 512,
            seed: props.data.userID,
        }).toDataUriSync();
    }, [props.data.userID]);
    console.log(props.data.userID);
    const dispatch = useDispatch();

    const HandleClick = () => {
        dispatch(selectedUsr(props.data.userID));
    };

    const normalSx = {
        marginLeft: '24px',
        marginRight: '24px',
        paddingLeft: '24px',
        bgcolor: 'secondary.main',
        height: '96px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        marginTop: '12px',
        marginBottom: '12px',
        ':hover': {
            bgcolor: blue[900],
        },
    };

    if (props.data.selected) {
        normalSx.bgcolor = blue[900];
    }
    return (
        <Box onClick={HandleClick} sx={normalSx}>
            <Avatar
                src={avatar}
                sx={{
                    width: 64,
                    height: 64,
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
                {props.data.usrName}
            </Typography>
        </Box>
    );
}
