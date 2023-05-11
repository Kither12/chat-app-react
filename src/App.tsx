import Header from './components/Header/Header';

import { Container, Box, Backdrop, CircularProgress } from '@mui/material';
import UsrSection from './components/UsrSection/UsrSection';
import ChatSection from './components/ChatSection/ChatSection';
import AddUsrModal from './components/AddUsrModal/AddUsrModal';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { auth } from './firebase';
import { changeUsr } from './components/UsrSlice';
import { loadUsr } from './components/UsrSlice';
import { getUsrList, getUsrName } from './database';
import { setName } from './components/UsrSlice';

import { onValue, ref } from 'firebase/database';
import { database as db } from './firebase';
import { useState } from 'react';

function App() {
    const [loading, setLoading] = useState(true);

    const isUsrModalOpen = useSelector(
        (state: RootState) => state.UsrModal.isOn
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const uid = useSelector((state: RootState) => state.UsrSlice.UID);

    useEffect(() => {
        const refUsrList = ref(db, '/' + uid + '/contact');
        const unsubscribeRef = onValue(refUsrList, async () => {
            const usrList = await getUsrList(uid);
            dispatch(loadUsr(usrList));
        });

        const unsubscribe = auth.onAuthStateChanged(async user => {
            dispatch(changeUsr(user?.uid));
            if (user === null) {
                navigate('/auth');
            } else {
                const usrList = await getUsrList(user.uid);
                const usrName = await getUsrName(user.uid);
                dispatch(loadUsr(usrList));
                dispatch(setName(usrName));
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
            unsubscribeRef();
        };
    }, [uid, dispatch, navigate]);
    const handleClose = () => {};
    return (
        <Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {isUsrModalOpen && <AddUsrModal></AddUsrModal>}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    height: '60rem',
                    marginTop: '5vh',
                    borderRadius: '36px',
                }}
            >
                <Header></Header>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        bottom: '0',
                    }}
                >
                    <UsrSection></UsrSection>
                    <ChatSection></ChatSection>
                </Box>
            </Box>
        </Container>
    );
}

export default App;
