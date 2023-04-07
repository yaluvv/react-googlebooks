import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import {
  MenuItem,
  FormControl,
  Select,
  Typography,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { CategoryType, SortType } from '../ui/Header';

interface SelectItemProps {
  data: CategoryType[] | SortType[];
  title: string;
  activeSelect: string;
  onChangeSelect: (evt: SelectChangeEvent) => void;
}

export default function SelectItem({
  data,
  title,
  activeSelect,
  onChangeSelect,
}: SelectItemProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" component="span" marginRight="10px">
          {title}
        </Typography>
        <Select
          sx={{ backgroundColor: 'white', width: '100%' }}
          value={activeSelect}
          onChange={onChangeSelect}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {data.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
}
