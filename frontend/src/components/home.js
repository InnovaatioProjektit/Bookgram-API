import React, {useEffect, useState} from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import books from "../api/books";
import BookCard from "./bookCard";

import ReactDOM from 'react-dom'

import Toast from './Toast'


function Home(props) {
  const {state} = props;
  const [message, setMessage] = useState("")
  const [volume, setVolume] = useState([])  // fill volume with book data from Google Books

  const { id } = state.useAuth()

  useEffect(() => {
    (async function fetchBooks(){
      const { data } = await books()
      if(data){
        setVolume(data.items)
      }
    }())
  }, [id])

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="sm">
            <Toast message="hello" horizontal="left" vertical="top" severity="success" />
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Books
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              <b>{state.title}</b> is a book club. Here you can find your favorite books and 
              authors, add your favorites in collections and review your latest 
              books.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
            </Stack>
    </Container>
    <Container sx={{ py: 8 }} maxWidth="md">
    <Grid container spacing={4}>

    {volume.map((card) => (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <BookCard uid={id} data={card} />
      </Grid>
    ))}

    </Grid>
    </Container>

    </ThemeProvider>
  );
}

export default Home;

  