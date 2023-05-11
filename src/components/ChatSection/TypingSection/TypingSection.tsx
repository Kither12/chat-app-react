import { Box, TextField } from '@mui/material';
import { KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useState } from 'react';
import TypingIcon from './TypingIcon';
import { text } from '../../../database';

export default function TypingSection() {
    const [textValue, setTextValue] = useState('');

    const currentId = useSelector(
        (state: RootState) => state.UsrSlice.selectedUID
    );

    const uid = useSelector((state: RootState) => state.UsrSlice.UID);

    const SendText = () => {
        text(textValue, uid, currentId);
        setTextValue('');
    };

    const HandleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            SendText();
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <TextField
                placeholder="Type something..."
                multiline
                focused
                maxRows={2}
                variant="filled"
                onKeyDown={HandleKeyDown}
                InputProps={{
                    style: {
                        color: 'white',
                        paddingBottom: '25px',
                        backgroundColor: '#252331',
                    },
                }}
                sx={{
                    color: 'white',
                    width: '100%',
                }}
                InputLabelProps={{
                    style: {
                        color: 'white',
                    },
                }}
                onChange={e => setTextValue(e.target.value)}
                value={textValue}
            />
            <TypingIcon sendText={SendText}></TypingIcon>
        </Box>
    );
}
