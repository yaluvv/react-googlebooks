import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { fetchBooks, fetchBooksMore, Status } from '../store/bookSlice';
import BooksList from '../components/ui/BooksList';
import Header from '../components/ui/Header';

const Main = () => {
  const dispatch = useAppDispatch();
  const { searchValue, categoryName } = useAppSelector((state) => state.filter);
  const { status, items } = useAppSelector((state) => state.books);
  const searchValueIsEmpty = searchValue.trim() !== '';
  const totalItems = items?.totalItems;
  const startIndex = React.useRef(0);

  const getBooks = () => {
    const req = {
      value: searchValue,
      categoryName,
      startIndex: startIndex.current,
    };
    dispatch(fetchBooks(req));
    window.scrollTo(0, 0);
  };

  const loadMoreItems = () => {
    startIndex.current += 30;
    const req = {
      value: searchValue,
      categoryName,
      startIndex: startIndex.current,
    };
    dispatch(fetchBooksMore(req));
  };

  React.useEffect(() => {
    if (searchValueIsEmpty) {
      getBooks();
    }
  }, [searchValue, categoryName]);

  return (
    <>
      <Header />
      <Box p={10} marginTop={20} component="main">
        <Box component="section" display="flex" flexDirection="column">
          {status === Status.ERROR ||
            (status === Status.SUCCESS && (
              <Typography
                textAlign="center"
                mb="40px"
                variant="h5"
                component="h5"
              >
                {`Find ${totalItems} books`}
              </Typography>
            ))}

          {searchValue.length < 1 && (
            <Typography
              textAlign="center"
              mb="40px"
              variant="h5"
              component="h5"
            >
              Для того, чтобы пользоваться сервисом, нужно написать что-то в
              поиске!
            </Typography>
          )}

          {status === Status.LOADING && searchValueIsEmpty && (
            <Typography
              textAlign="center"
              mb="40px"
              variant="h5"
              component="h5"
            >
              Loading...
            </Typography>
          )}

          {status === Status.ERROR && searchValueIsEmpty && (
            <Typography
              textAlign="center"
              mb="40px"
              variant="h5"
              component="h5"
            >
              Произошла ошибка с сервером. Попробуйте позже.
            </Typography>
          )}
          <BooksList />
          {status === Status.SUCCESS && (
            <Button
              onClick={loadMoreItems}
              sx={{ alignSelf: 'center', mt: 5 }}
              variant="contained"
            >
              Load more
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Main;
