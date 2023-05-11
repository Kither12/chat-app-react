import { Box } from '@mui/material';
import MainChatSection from './MainChatSection/MainChatSection';
import ChatSectionHeader from './ChatSectionHeader/ChatSectionHeader';
import TypingSection from './TypingSection/TypingSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
export default function ChatSection() {
    const currentUsrList = useSelector(
        (state: RootState) => state.UsrSlice.usrList
    );
    return (
        <Box
            sx={{
                width: '100%',
                marginLeft: '12px',
                marginRight: '36px',
            }}
        >
            {currentUsrList.length > 0 && (
                <>
                    <ChatSectionHeader></ChatSectionHeader>
                    <MainChatSection></MainChatSection>
                    <TypingSection></TypingSection>
                </>
            )}
        </Box>
    );
}
