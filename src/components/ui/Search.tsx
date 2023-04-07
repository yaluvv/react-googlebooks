import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setValue } from '../../store/filterSlice';
import { removeItems } from '../../store/bookSlice';
import debounce from 'lodash.debounce';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search = () => {
  const [search, setSearchValue] = React.useState('');
  const { items } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  const clearSearchValue = () => {
    setSearchValue('');
    dispatch(setValue(''));
    dispatch(removeItems());
  };

  React.useEffect(() => {
    if (!search.length && items.books.length) {
      dispatch(removeItems());
    }
  }, [search]);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setValue(str));
    }, 1000),
    [],
  );

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    updateSearchValue(value.trim());
  };
  return (
    <>
      <InputBase
        value={search}
        onChange={handleChangeValue}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Books"
        inputProps={{ 'aria-label': 'search google books' }}
      />
      {search.length < 1 ? (
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      ) : (
        <IconButton
          type="button"
          onClick={clearSearchValue}
          sx={{ p: '10px' }}
          aria-label="clear"
        >
          <ClearIcon />
        </IconButton>
      )}
    </>
  );
};

export default Search;
