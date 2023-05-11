import { Box } from '@mui/material';
import Bubble from './Bubble/Bubble';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from 'react';

import { onValue, ref } from 'firebase/database';
import { database as db } from '../../../firebase';
import { useImmer } from 'use-immer';
import { useRef } from 'react';

export default function MainChatSection() {
    const dref = useRef<HTMLDivElement>(null);

    const init: Array<{ id: string; text: string }> = [];
    const [messageList, SetMessageList] = useImmer(init);

    const current = useSelector(
        (state: RootState) => state.UsrSlice.selectedUID
    );
    const uid = useSelector((state: RootState) => state.UsrSlice.UID);

    useEffect(() => {
        const messageRef = ref(
            db,
            '/' + uid + '/contact/' + current + '/messages'
        );
        const unsub = onValue(messageRef, snapshot => {
            SetMessageList(draft => {
                draft.length = 0;
            });
            snapshot.forEach(item => {
                SetMessageList(draft => {
                    draft.push(item.val());
                });
            });
        });
        return unsub;
    }, [current, SetMessageList, uid]);

    useEffect(() => {
        if (dref.current) {
            dref.current.scrollTop = dref.current.scrollHeight;
        }
    }, [messageList]);

    return (
        <Box
            ref={dref}
            sx={{
                bgcolor: 'secondary.main',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'secondary.contrastText',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: 'secondary.contrastText',
                width: '100%',
                height: '70%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
            }}
        >
            {messageList.map(item => {
                return (
                    <Bubble
                        key={uuidv4()}
                        isUsr={item.id === uid}
                        value={item.text}
                    ></Bubble>
                );
            })}
        </Box>
    );
}
