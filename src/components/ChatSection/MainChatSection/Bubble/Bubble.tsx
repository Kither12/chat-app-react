import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
    isUsr: boolean;
    value: string;
};

export default function Bubble(props: Props) {
    return (
        <Typography
            style={{ whiteSpace: 'pre-line' }}
            sx={{
                display: 'inline-block',
                width: 'fit-content',
                padding: '8px',
                marginTop: '4px',
                marginBottom: '4px',
                bgcolor: props.isUsr ? 'usrBubble.main' : 'oppBubble.main',
                borderRadius: '8px',
                color: grey[300],
                alignSelf: props.isUsr ? 'flex-end' : 'flex_start',
                marginRight: '10px',
                marginLeft: '10px',
                textAlign: props.isUsr ? 'end' : 'start',
            }}
        >
            {props.value}
        </Typography>
    );
}
