import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import Grid from '@mui/material/Unstable_Grid2';
import Book from './Book';

const BooksList = () => {
  const { items } = useAppSelector((state) => state.books);

  return (
    <Grid container spacing={4} justifyContent="center">
      {items.books.map((book, i) => {
        return (
          <Grid
            xs={12}
            md={6}
            maxWidth={400}
            key={book.id + '_' + i}
            minHeight={500}
          >
            <Link to={`/book/${book.id}`}>
              <Book
                title={book.title}
                description={book.description}
                imgSrc={book.previewImg}
                isFull={false}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BooksList;
