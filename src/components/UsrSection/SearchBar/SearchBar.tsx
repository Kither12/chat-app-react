import { styled } from '@mui/material/styles';
import { InputBase, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { updateSearchKey } from './SearchBarSlice';
import { useDispatch } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 100,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: 0,
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    width: '100%',
}));

export default function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);

    const dispatch = useDispatch();

    const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchKey(e.target.value));
    };

    return (
        <Toolbar>
            <Search>
                <SearchIconWrapper
                    sx={{
                        color: isFocused
                            ? 'primary.contrastText'
                            : 'secondary.contrastText',
                    }}
                >
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    sx={{
                        color: isFocused
                            ? 'primary.contrastText'
                            : 'secondary.contrastText',
                    }}
                    onChange={HandleSearch}
                />
            </Search>
        </Toolbar>
    );
}
