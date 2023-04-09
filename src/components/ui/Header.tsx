import React from 'react';
import { useAppDispatch } from '../../hooks/hook';
import { setCategoryName } from '../../store/filterSlice';
import { AppBar, Box, Typography, Paper } from '@mui/material';

import Search from './Search';
import SelectItem from '../common/SelectItem';
import { SelectChangeEvent } from '@mui/material';

export type CategoryType = {
  value: string;
  title: string;
};
export type SortType = {
  value: string;
  title: string;
};

const Header = () => {
  const categories = [
    { value: 'all', title: 'All' },
    { value: 'art', title: 'Art' },
    { value: 'computers', title: 'Computers' },
  ];
  const [activeCategory, setActiveCategory] = React.useState(
    categories[0].value,
  );
  const dispatch = useAppDispatch();

  const handleChangeCategory = (evt: SelectChangeEvent) => {
    setActiveCategory(evt.target.value);
    dispatch(setCategoryName(evt.target.value));
  };

  return (
    <AppBar
      sx={{ backgroundImage: 'url("/books.jpeg")', p: '15px 15px 15px 15px' }}
      position="static"
    >
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h3" component="h1">
          Search for books
        </Typography>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Search />
        </Paper>
        <SelectItem
          data={categories}
          title="Категории"
          activeSelect={activeCategory}
          onChangeSelect={handleChangeCategory}
        />
      </Box>
    </AppBar>
  );
};

export default Header;
