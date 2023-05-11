import SearchBar from './SearchBar/SearchBar';
import UsrTag from './UsrTag/UsrTag';
import { Box } from '@mui/material';
import LogoutButton from './LogoutButton/LogoutButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMemo } from 'react';

export default function UsrSection() {
    const usrList = useSelector((state: RootState) => state.UsrSlice.usrList);
    const searchKey = useSelector((state: RootState) => state.SearchSection);
    const selectedUID = useSelector(
        (state: RootState) => state.UsrSlice.selectedUID
    );

    const usrListJSX = useMemo(
        () =>
            usrList
                .filter(item => item.name.includes(searchKey))
                .map(item => (
                    <UsrTag
                        key={item.uid}
                        data={{
                            usrName: item.name,
                            userID: item.uid,
                            selected: selectedUID === item.uid,
                        }}
                    ></UsrTag>
                )),
        [usrList, searchKey, selectedUID]
    );
    return (
        <Box
            sx={{
                width: '50%',
            }}
        >
            <SearchBar></SearchBar>
            <Box
                sx={{
                    overflow: 'auto',
                    maxHeight: '68%',
                    height: '68%',
                }}
            >
                {usrListJSX}
            </Box>
            <LogoutButton></LogoutButton>
        </Box>
    );
}
