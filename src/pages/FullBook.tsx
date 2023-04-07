import React from 'react';
import Book from '../components/ui/Book';
import { useParams, useNavigate } from 'react-router-dom';
import { removeItems } from '../store/bookSlice';
import { setValue } from '../store/filterSlice';
import { BookType } from '../types/bookType';
import httpService from '../services/https.service';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks/hook';

const FullBook = () => {
  const initial: BookType = {
    id: '',
    title: '',
    authors: [],
    previewImg: '',
    description: '',
  };
  const [data, setData] = React.useState(initial);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await httpService.get(`volumes/${id}`);

      setData(data);
    };
    getData();
  }, []);

  const handleClickHome = () => {
    navigate('/');
    dispatch(removeItems());
    dispatch(setValue(''));
  };
  if (!Object.keys(data.id).length) {
    return <Typography>Loading..</Typography>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt="40px"
    >
      <Book
        title={data.title}
        description={data.description}
        imgSrc={data.previewImg}
        isFull={true}
      />
      <Button onClick={handleClickHome} sx={{ mt: 3 }} variant="contained">
        На главное меню
      </Button>
    </Box>
  );
};

export default FullBook;
