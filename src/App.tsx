import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Container } from '@mui/material';

import Main from './pages/Main';
import FullBook from './pages/FullBook';

function App() {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book/:id" element={<FullBook />} />
      </Routes>
    </Container>
  );
}

export default App;
