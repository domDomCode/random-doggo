import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import './App.css';
import BreedList from './BreedList/index';

function App() {
  return (
    <>
      <CssBaseline />
      <Container className="App" maxWidth={'md'}>
        <BreedList />
      </Container>
    </>
  );
}

export default App;
