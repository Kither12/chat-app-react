import { Box, IconButton } from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { blue } from '@mui/material/colors';
type Props = {
    sendText: () => void;
};

export default function TypingIcon(props: Props) {
    const HandleSend = () => {
        props.sendText();
    };
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
                <AttachFileIcon
                    fontSize="large"
                    sx={{
                        color: blue[700],
                    }}
                ></AttachFileIcon>
            </IconButton>
            <IconButton size="large">
                <EmojiEmotionsIcon
                    fontSize="large"
                    sx={{
                        color: blue[700],
                    }}
                ></EmojiEmotionsIcon>
            </IconButton>
            <IconButton size="large" onClick={HandleSend}>
                <SendIcon
                    fontSize="large"
                    sx={{
                        color: blue[700],
                    }}
                ></SendIcon>
            </IconButton>
        </Box>
    );
}
