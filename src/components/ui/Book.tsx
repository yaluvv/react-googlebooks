import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface iBookProps {
  isFull: boolean;
  title: string;
  description: string;
  imgSrc?: string;
}

const Book = ({ title, description, imgSrc, isFull = false }: iBookProps) => {
  const transformDescription = () => {
    return description.length > 500 ? description.slice(0, 300) : description;
  };
  return (
    <Card
      sx={{
        maxWidth: 400,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {imgSrc ? (
        <CardMedia
          sx={{ height: '400px' }}
          image={imgSrc}
          title="green iguana"
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={250}
        >
          <Typography variant="h4" component="p">
            Нет фото
          </Typography>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 3 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography flexGrow="2" variant="body2" color="text.secondary">
          {transformDescription()}
        </Typography>
      </CardContent>
      {!isFull && (
        <CardActions sx={{ flexGrow: 0 }}>
          <Button size="small">Learn More</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default Book;
